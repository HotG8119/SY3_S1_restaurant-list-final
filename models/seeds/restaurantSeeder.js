// // const mongoose = require("mongoose");
// const Restaurant = require("../restaurant");
// const restaurants = require("./restaurant.json").results;

// const db = require("../../config/mongoose");

// db.on("error", () => {
//   console.log("mongodb error!");
// });
// db.once("open", () => {
//   console.log("mongodb connected!");
//   restaurants.forEach(restaurant => {
//     Restaurant.create({
//       id: restaurant.id,
//       name: restaurant.name,
//       name_en: restaurant.name_en,
//       category: restaurant.category,
//       image: restaurant.image,
//       location: restaurant.location,
//       phone: restaurant.phone,
//       google_map: restaurant.google_map,
//       rating: restaurant.rating,
//       description: restaurant.description,
//     });
//   });
//   console.log("done");
// });

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
    restaurantId: [1, 2, 3],
  },
  {
    email: "user1@example.com",
    password: "12345678",
    restaurantId: [4, 5, 6],
  },
];

db.once("open", () => {
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
    .then(() => {
      console.log("done.");
      process.exit();
    });
});
