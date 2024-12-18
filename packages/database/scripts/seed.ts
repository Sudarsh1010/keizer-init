import "dotenv/config";

import { db } from "@repo/database/database";
import { posts, users } from "@repo/database/schema";

const times = (v: number) =>
  Array(v)
    .fill(null)
    .map((_, i) => i + 1);

const main = async (): Promise<void> => {
  let n = 0;

  for (const i of times(10)) {
    await db.insert(users).values({ name: `Author ${i}` });
  }

  n = 0;
  for (const author of await db.select().from(users)) {
    for (const _i of times(5)) {
      console.log(_i);
      n += 1;

      await db.insert(posts).values({
        authorId: author.id,
        title: `Article Title ${n}`,
        content: `Article content ${n}`,
      });
    }
  }

  process.exit(0);
};

void main();
