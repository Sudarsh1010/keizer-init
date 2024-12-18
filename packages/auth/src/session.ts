import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { db, sessionTable, userTable } from "@repo/database";
import { UUID } from "crypto";
import { eq } from "@repo/database";
import { SESSION_EXPIRE_TIME, SESSION_EXPIRING_SOON } from "./constants.js";

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(
  token: string,
  userId: UUID,
): Promise<string> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  await db.insert(sessionTable).values({
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_EXPIRE_TIME),
  });
  return sessionId;
}

export async function validateSessionToken(token: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const result = await db
    .select({ user: userTable, session: sessionTable })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId))
    .limit(1);

  if (!result[0]) return { session: null, user: null };

  const { user, session } = result[0];

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessionTable).where(eq(sessionTable.id, session.id));
    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - SESSION_EXPIRING_SOON) {
    session.expiresAt = new Date(Date.now() + SESSION_EXPIRE_TIME);
    await db
      .update(sessionTable)
      .set({ expiresAt: session.expiresAt })
      .where(eq(sessionTable.id, session.id));
  }

  return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}
