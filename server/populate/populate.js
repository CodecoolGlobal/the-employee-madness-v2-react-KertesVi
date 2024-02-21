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

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const brandDocs = await FavoriteBrandModel.find({});
  
  const employees = names.map((name) => {
    const randomBrand = pick(brandDocs);
    const startDate = randomDate(new Date(2012, 0, 1), new Date());
    return {
      name,
      level: pick(levels),
      position: pick(positions),
      favoriteBrand: randomBrand._id,
      startDate: startDate.toISOString(),
      salary: getRandomInt(500, 1500),
      desiredSalary: getRandomInt(1000, 3000),
      equipments: [],
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
