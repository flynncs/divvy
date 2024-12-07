const { User } = require("../models");

const generateUserNameFromEmail = (email) => {
  return email.split("@")[0];
};

const findOrCreateUser = async (decodedToken) => {
  try {
    const [user, created] = await User.findOrCreate({
      where: { firebaseId: decodedToken.uid },
      defaults: {
        name:
          decodedToken?.name ?? generateUserNameFromEmail(decodedToken.email),
        email: decodedToken.email,
        profilePictureUrl: decodedToken?.picture ?? "",
        firebaseId: decodedToken.uid,
      },
    });

    if (created) {
      console.log(`User ${user.name} created`);
    } else {
      console.log(`User ${user.name} found`);
    }

    return user;
  } catch (error) {
    throw new Error("Unable to find or create user");
  }
};

module.exports = { findOrCreateUser };
