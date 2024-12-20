import { db, eq, userTable } from "@repo/database";

export const getUserByEmail = async (email: string) => {
  const users = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email))
    .limit(1);
  return users[0];
};
