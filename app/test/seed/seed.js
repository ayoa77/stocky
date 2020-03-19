
const { User } = require("./../../models/userModel");


const users = [
  {
    email: "myemail@gmail.com",
    password: "123PASSWORD",
  },
  {
    email: "youremail@gmail.com",
    password: "456PASSWORD",
  }
];

const seedDummyUsers = done => {
  User.deleteMany({})
    .then(() => {
      let userOne = new User(users[0]).save();
      let userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = {
  users,
  seedDummyUsers
};
