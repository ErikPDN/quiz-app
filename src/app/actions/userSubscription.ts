import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function createSubscription({ stripeCustomerId }: { stripeCustomerId: string }) {
  await db
    .update(users)
    .set({
      subscribe: true
    })
    .where(eq(users.stripeCustomerId, stripeCustomerId))
}

export async function cancelSubscription({ stripeCustomerId }: { stripeCustomerId: string }) {
  await db
    .update(users)
    .set({
      subscribe: false
    })
    .where(eq(users.stripeCustomerId, stripeCustomerId))
}

export async function getUserSubscription({
  userId
}: {
  userId: string
}) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId)
  })


  return user?.subscribe
}
