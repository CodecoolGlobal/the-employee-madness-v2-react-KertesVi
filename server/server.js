require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentSchema = require("./db/equipment.model");
const FavoriteBrandSchema = require("./db/favoriteBrand.model");

const { MONGO_URL, PORT = 8080 } = process.env;
const PAGE_SIZE = 10;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.get("/api/equipments/", async (req, res) => {
  const equipments = await EquipmentSchema.find().sort({ created: "desc" });
  return res.json(equipments);
});

app.get("/api/equipments/:id", async (req, res) => {
  const equipment = await EquipmentSchema.findById(req.params.id);
  return res.json(equipment);
});

app.post("/api/equipments/", async (req, res, next) => {
  const equipment = req.body;

  try {
    const saved = await EquipmentSchema.create(equipment);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/equipments/:id", async (req, res, next) => {
  try {
    const equipment = await EquipmentSchema.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(equipment);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/equipments/:id", async (req, res, next) => {
  try {
    const equipment = await EquipmentSchema.findById(req.params.id);
    const deleted = await equipment.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/employees", async (req, res) => {
  try {
    const employees = await EmployeeModel.find().sort({created: "desc"})

    if (req.query.sortedBy === "Level") {
      const levels = { Junior: 1, Medior: 2, Senior: 3, Expert: 4, Godlike: 5 };
      employees.sort((a, b) =>
        req.query.order == "asc"
          ? levels[a.level] - levels[b.level]
          : levels[b.level] - levels[a.level]
      );
      return res.json(employees);
    } else if (req.query.sortedBy === "Name") {
      employees.sort((a, b) =>
        req.query.order == "asc"
          ? a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          : b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      );
      return res.json(employees);
    } else if (req.query.sortedBy === "Position") {
      employees.sort((a, b) =>
        req.query.order == "asc"
          ? a.position.toLowerCase().localeCompare(b.position.toLowerCase())
          : b.position.toLowerCase().localeCompare(a.position.toLowerCase())
      );
      return res.json(employees);
    }

    return res.json(employees);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server Error" });
  }
});

app.get("/api/brands/", async (req, res) => {
  const brands = await FavoriteBrandSchema.find()
  return res.json(brands);
});

app.patch("/api/bonus/:employeeId", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findByIdAndUpdate(
      { _id : req.params.employeeId },
      { $push: {bonuses: {value: req.body.value}}},
      { new: true}
      )
      return res.json(employee)
  } catch (error) {
    return next(error)
  }
})

app.get("/api/missing", async (req, res) => {
  const presentDate = new Date();
  const presentDateString = presentDate.toISOString().split("T")[0];
  try {
    const missingEmployees = await EmployeeModel.find({
      present: { $not: { $eq: presentDateString } },
    });

    return res.json(missingEmployees);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/employees/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);
  return res.json(employee);
});

app.get("/api/search/:search", async (req, res) => {
  try {
    const employees = await EmployeeModel.find({
      name: { $regex: req.params.search, $options: "i" },
    });

    if (req.query.sortedBy === "Position") {
      employees.sort((a, b) =>
        req.query.order == "asc"
          ? a.position.toLowerCase().localeCompare(b.position.toLowerCase())
          : b.position.toLowerCase().localeCompare(a.position.toLowerCase())
      );
      return res.json(employees);
    } else if (req.query.sortedBy === "Level") {
      const levels = { Junior: 1, Medior: 2, Senior: 3, Expert: 4, Godlike: 5 };
      employees.sort((a, b) =>
        req.query.order == "asc"
          ? levels[a.level] - levels[b.level]
          : levels[b.level] - levels[a.level]
      );
      return res.json(employees);
    }
  } catch (error) {
    console.error("Error fetching employees: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
