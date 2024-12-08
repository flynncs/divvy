const extractReceiptName = (analysis) => {
  const transactionDate = analysis.fields.TransactionDate.valueDate;
  const merchantName = analysis.fields.MerchantName.content;

  return `${transactionDate}-${merchantName}`;
};

const extractReceiptTotal = (analysis) => {
  return analysis.fields.Total.valueCurrency.amount;
};

const extractReceiptDate = (analysis) => {
  const transactionDate = analysis.fields.TransactionDate.valueDate;
  return new Date(transactionDate);
};

module.exports = {
  extractReceiptName,
  extractReceiptTotal,
  extractReceiptDate,
};
