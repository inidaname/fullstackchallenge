const express = require("express");
const router = express.Router();

const tenants = require("../controllers/tenantsController");
const properties = require("../controllers/propertiesController");
const interest = require("../controllers/interestController");

router.get("/api/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my Property list"
  });
});

// Tenant controller
router.post("/api/tenant", tenants.createTenant);

router.post("/api/login", tenants.login)
router.post("/api/register", tenants.createTenant)
router.get("/api/tenant/all", tenants.getAllTenants);
router.get("/api/tenant/residence", tenants.getAllResident);
router.get("/api/tenant/vacate", tenants.getNonResident);
router.get("/api/tenant/:id", tenants.getTenantById);
router.put("/api/tenant/:id", tenants.updateTenant);
router.delete("/api/tenant/:id", tenants.deleteTenant);

// Property controllers
router.post("/api/property", properties.createProperty);
router.get("/api/property", properties.getAllProperties);
router.get("/api/property/occupied", properties.getAllOccupied);
router.get("/api/property/vacant", properties.getAllVacants);
router.get("/api/property/:id", properties.getPropertyById);
router.put("/api/property/:id", properties.updateProperty);
router.delete("/api/property/:id", properties.deleteProperty);

// Interest controllers
router.post("/api/interest", interest.createInterest);
router.get("/api/interest/:property/:tenant", interest.getInterest);
router.get("/api/interest/property/:id", interest.getInterestByProperty);
router.get("/api/interest/tenant/:id", interest.getInterestByProperty);
router.delete("/api/interest/:id", interest.deleteInterest);


module.exports = router;
