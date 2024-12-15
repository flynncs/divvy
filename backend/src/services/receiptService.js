const { Receipt, Item } = require("../models");
const { createReceiptSchema, createItemsSchema } = require("../types/schema");
const { createInternalError } = require("../utils/handleError");

const createReceipt = async (receiptData) => {
  try {
    const validatedData = createReceiptSchema.safeParse({
      ...receiptData,
      name: receiptData.name?.trim(),
    });

    if (!validatedData.success) {
      console.error("Validation errors:", validatedData.error);
      throw new Error(
        validatedData.error.errors.map((e) => e.message).join(", ")
      );
    }

    const receipt = await Receipt.create(validatedData.data);

    // Handle items creation
    if (Array.isArray(receiptData.items) && receiptData.items.length > 0) {
      const itemsData = receiptData.items.map((item) => ({
        ...item,
        date: receipt.date,
        receiptId: receipt.id,
        groupId: receipt.groupId,
        createdBy: receipt.createdBy,
      }));

      const validatedItems = createItemsSchema.safeParse(itemsData);
      if (!validatedItems.success) {
        console.error("Validation errors:", validatedItems.error);
        throw new Error(
          `Items validation failed: ${validatedItems.error.errors
            .map((e) => e.message)
            .join(", ")}. Items: ${JSON.stringify(itemsData)}`
        );
      }

      const items = await Item.bulkCreate(validatedItems);
      await receipt.addItems(items);
    }

    // Return complete receipt
    return await Receipt.findByPk(receipt.id, {
      include: ["items"],
    });
  } catch (error) {
    console.error("Error creating receipt:", {
      error: error.message,
      data: receiptData,
    });
    throw createInternalError(`Failed to create receipt: ${error.message}`);
  }
};

module.exports = {
  createReceipt,
};
