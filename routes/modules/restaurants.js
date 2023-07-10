const express = require("express");
const router = express.Router();

const Restaurant = require("../../models/restaurant");

//add new restaurant
router.get("/add", (req, res) => {
  return res.render("addRestaurant");
});

router.post("/add", (req, res) => {
  const userId = req.user._id;
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;
  return Restaurant.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
    userId,
  })
    .then(() => res.redirect("/"))
    .catch(error => console.log(error));
});

//update restaurant
router.get("/:id/edit", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render("edit", { restaurant }))
    .catch(error => console.log(error));
});

router.put("/:id/edit", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  const newRestaurant = req.body;

  return Restaurant.findOneAndUpdate({ _id, userId }, newRestaurant)
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error));
});

//show restaurant
router.get("/:id", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;

  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(err => console.log(err));
});

//delete restaurant
router.delete("/:id/delete", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch(error => console.log(error));
});

module.exports = router;
