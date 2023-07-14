const bcrypt = require("bcryptjs");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const Restaurant = require("../restaurant");
const User = require("../user");
const db = require("../../config/mongoose");

const SEED_RESTAURANTS = require("./restaurant.json").results;
const SEED_USER = [
  {
    email: "user1@example.com",
    password: "12345678",
    restaurantId: [0, 1, 2],
  },
  {
    email: "user2@example.com",
    password: "12345678",
    restaurantId: [3, 4, 5],
  },
];

db.once("open", () => {
  const createRestaurant = (userId, restaurantIds) => {
    return Promise.all(
      restaurantIds.map(id =>
        Restaurant.create({
          ...SEED_RESTAURANTS[id],
          userId,
        })
      )
    );
  };

  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER[0].password, salt))
    .then(hash =>
      User.create({
        name: SEED_USER[0].name,
        email: SEED_USER[0].email,
        password: hash,
      })
    )
    .then(user => createRestaurant(user._id, [0, 1, 2]))

    .then(() => bcrypt.genSalt(10))
    .then(salt => bcrypt.hash(SEED_USER[1].password, salt))
    .then(hash =>
      User.create({
        name: SEED_USER[1].name,
        email: SEED_USER[1].email,
        password: hash,
      })
    )
    .then(user => createRestaurant(user._id, [3, 4, 5]))

    .then(() => {
      console.log("create seed done"), process.exit();
    });
});
