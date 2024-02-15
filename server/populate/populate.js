/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const brands = require("./brands.json");
const EmployeeModel = require("../db/employee.model");
const FavoriteBrandModel = require("../db/favoriteBrand.model.js");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateFavBrands = async () => {
  await FavoriteBrandModel.deleteMany({});

  const favorites = brands.map((brand) => ({
    name: brand,
  }));

  await FavoriteBrandModel.create(...favorites);
  console.log("favorites created");
};

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const brandDocs = await FavoriteBrandModel.find({});

  const employees = names.map((name) => {
    const randomBrand = pick(brandDocs);
    return {
      name,
      level: pick(levels),
      position: pick(positions),
      favoriteBrand: randomBrand._id,
      experience: parseInt(Math.random()*10)
    };
  });

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};


const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateFavBrands();
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
