const { User, Group } = require("../models");

const getUserIdByName = async (name) => {
  const user = await User.findOne({ where: { name } });
  return user.id;
};

const getGroupIdByName = async (name) => {
  const group = await Group.findOne({ where: { name } });
  return group.id;
};

module.exports = {
  getUserIdByName,
  getGroupIdByName,
};
