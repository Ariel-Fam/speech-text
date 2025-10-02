import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  credits: defineTable({
    userId: v.string(),
    monthKey: v.string(),
    remaining: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user_month", ["userId", "monthKey"]),
});


