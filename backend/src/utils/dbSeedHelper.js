const { User, Group, Receipt } = require("../models");

const getUserIdByName = async (name) => {
  const user = await User.findOne({ where: { name } });
  return user.id;
};

const getGroupIdByName = async (name) => {
  const group = await Group.findOne({ where: { name } });
  return group.id;
};

const getReceiptIdByName = async (name) => {
  const receipt = await Receipt.findOne({ where: { name } });
  return receipt.id;
};

module.exports = {
  getUserIdByName,
  getGroupIdByName,
  getReceiptIdByName,
};
