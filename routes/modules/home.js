const express = require("express");
const router = express.Router();

const Restaurant = require("../../models/restaurant");

router.get("/", (req, res) => {
  const userId = req.user._id;

  Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.log(error));
});

router.get("/sort/:sortBy", (req, res) => {
  const sortBy = req.params.sortBy;
  const userId = req.user._id;

  Restaurant.find({ userId })
    .lean()
    .sort({ [sortBy]: "asc" })
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.log(error));
});

router.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase();
  const userId = req.user._id;
  const errors = [];

  Restaurant.find({ userId })
    .lean()
    .then(restaurants => {
      const filterRestaurant = restaurants.filter(restaurant => {
        return (
          restaurant.name.toLowerCase().includes(keyword) ||
          restaurant.category.includes(keyword)
        );
      });

      if (!filterRestaurant.length) {
        errors.push({ message: `找不到 ${keyword} 餐廳。` });
        return res.render("index", { restaurants, keyword, errors });
      }

      res.render("index", { restaurants: filterRestaurant, keyword });
    })
    .catch(error => console.log(error));
});

module.exports = router;
