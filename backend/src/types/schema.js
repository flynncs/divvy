const { z } = require("zod");

// Schema for validating the raw analysis data from Azure
const analysisReceiptSchema = z.object({
  name: z.string().default("Unknown Merchant"),
  date: z.date().default(() => new Date()),
  totalAmount: z.number().default(0.0),
  items: z
    .array(
      z.object({
        name: z.string().default("Unknown Item"),
        amount: z.number().default(0.0),
      })
    )
    .default([]),
});

// Schema for validating receipt data before database insertion
const createReceiptSchema = z.object({
  name: z.string().min(1, "Receipt name is required"),
  date: z.coerce.date(),
  totalAmount: z.number().nonnegative(),
  groupId: z.number().int().positive().nullable().optional(),
  createdBy: z.number().int().positive(),
  downloadUrl: z.string().url().nullable().optional(),
  previewUrl: z.string().url().nullable().optional(),
  analysis: z.object({}).passthrough().nullable().optional(),
});

// Schema for validating item data before database insertion
const createItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  amount: z.number(),
  date: z.coerce.date(),
  groupId: z.number().int().positive().nullable().optional(),
  createdBy: z.number().int().positive(),
  receiptId: z.number().int().positive(),
});

// Schema for validating an array of items
const createItemsSchema = z.array(createItemSchema);

module.exports = {
  analysisReceiptSchema,
  createReceiptSchema,
  createItemSchema,
  createItemsSchema,
};
