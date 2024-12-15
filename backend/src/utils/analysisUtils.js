const { analysisReceiptSchema } = require("../types/schema");

const extractReceiptData = (analysis) => {
  const { fields } = analysis;

  const receiptData = {
    name: fields?.MerchantName?.valueString || "Unknown Merchant",
    date: fields?.TransactionDate?.valueDate
      ? new Date(fields.TransactionDate.valueDate)
      : new Date(),
    totalAmount: parseFloat(fields?.Total?.valueCurrency?.amount) || 0.0,
    items: fields?.Items?.valueArray?.map((item) => ({
      name: item?.valueObject?.Description?.valueString || "Unknown Item",
      amount:
        parseFloat(item?.valueObject?.TotalPrice?.valueCurrency?.amount) || 0.0,
    })),
  };

  return analysisReceiptSchema.parse(receiptData);
};
module.exports = {
  extractReceiptData,
};
