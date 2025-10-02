import { query, mutation } from './_generated/server'
import { v } from 'convex/values'

function monthKeyFromTimestamp(nowMs: number): string {
  const now = new Date(nowMs)
  const year = now.getUTCFullYear()
  const month = String(now.getUTCMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

const MONTHLY_FREE_CREDITS = 20

export const getRemaining = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')
    const nowMs = Date.now()
    const monthKey = monthKeyFromTimestamp(nowMs)
    const existing = await ctx.db
      .query('credits')
      .withIndex('by_user_month', (q) =>
        q.eq('userId', identity.subject).eq('monthKey', monthKey)
      )
      .first()

    if (!existing) {
      return MONTHLY_FREE_CREDITS
    }
    return existing.remaining
  },
})

export const ensureMonthRow = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')
    const nowMs = Date.now()
    const monthKey = monthKeyFromTimestamp(nowMs)
    const existing = await ctx.db
      .query('credits')
      .withIndex('by_user_month', (q) =>
        q.eq('userId', identity.subject).eq('monthKey', monthKey)
      )
      .first()

    if (existing) return existing._id
    return await ctx.db.insert('credits', {
      userId: identity.subject,
      monthKey,
      remaining: MONTHLY_FREE_CREDITS,
      createdAt: nowMs,
      updatedAt: nowMs,
    })
  },
})

export const decrement = mutation({
  args: { amount: v.number() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')
    const nowMs = Date.now()
    const monthKey = monthKeyFromTimestamp(nowMs)
    let row = await ctx.db
      .query('credits')
      .withIndex('by_user_month', (q) =>
        q.eq('userId', identity.subject).eq('monthKey', monthKey)
      )
      .first()

    if (!row) {
      const id = await ctx.db.insert('credits', {
        userId: identity.subject,
        monthKey,
        remaining: MONTHLY_FREE_CREDITS,
        createdAt: nowMs,
        updatedAt: nowMs,
      })
      row = (await ctx.db.get(id)) as any
    }

    const currentRemaining: number = row?.remaining ?? MONTHLY_FREE_CREDITS

    if (currentRemaining < args.amount) {
      throw new Error('Insufficient credits')
    }

    await ctx.db.patch(row!._id, {
      remaining: currentRemaining - args.amount,
      updatedAt: nowMs,
    })

    return { remaining: currentRemaining - args.amount }
  },
})

export const resetForCurrentMonth = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')
    const nowMs = Date.now()
    const monthKey = monthKeyFromTimestamp(nowMs)
    const existing = await ctx.db
      .query('credits')
      .withIndex('by_user_month', (q) =>
        q.eq('userId', identity.subject).eq('monthKey', monthKey)
      )
      .first()
    if (!existing) {
      await ctx.db.insert('credits', {
        userId: identity.subject,
        monthKey,
        remaining: MONTHLY_FREE_CREDITS,
        createdAt: nowMs,
        updatedAt: nowMs,
      })
    } else {
      await ctx.db.patch(existing._id, {
        remaining: MONTHLY_FREE_CREDITS,
        updatedAt: nowMs,
      })
    }
  },
})


