const { Receipt } = require("../models");

const createReceipt = async (receiptData) => {
  try {
    const receipt = await Receipt.create({
      name: receiptData.name,
      totalAmount: receiptData.total,
      date: receiptData.date,
      url: receiptData.url,
      createdBy: receiptData.createdBy,
      groupId: receiptData.groupId,
      analysis: receiptData.analysis,
    });

    return receipt;
  } catch (error) {
    console.error("Error creating receipt:", error);
    throw error;
  }
};

module.exports = {
  createReceipt,
};
