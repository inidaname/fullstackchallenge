const express = require("express");
const router = express.Router();

const tenants = require("../controllers/tenantsController");
const properties = require("../controllers/propertiesController");
const interest = require("../controllers/interestController");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my Property list"
  });
});

// Tenant controller
router.post("/tenant", tenants.createTenant);

router.post("/login", tenants.login)
router.post("/register", tenants.createTenant)
router.get("/tenant/all", tenants.getAllTenants);
router.get("/tenant/residence", tenants.getAllResident);
router.get("/tenant/vacate", tenants.getNonResident);
router.get("/tenant/:id", tenants.getTenantById);
router.put("/tenant/:id", tenants.updateTenant);
router.delete("/tenant/:id", tenants.deleteTenant);

// Property controllers
router.post("/property", properties.createProperty);
router.get("/property", properties.getAllProperties);
router.get("/property/occupied", properties.getAllOccupied);
router.get("/property/vacant", properties.getAllVacants);
router.get("/property/:id", properties.getPropertyById);
router.put("/property/:id", properties.updateProperty);
router.delete("/property/:id", properties.deleteProperty);

// Interest controllers
router.post("/interest", interest.createInterest);
router.get("/interest/:property/:tenant", interest.getInterest);
router.get("/interest/property/:id", interest.getInterestByProperty);
router.get("/interest/tenant/:id", interest.getInterestByProperty);
router.delete("/interest/:id", interest.deleteInterest);


module.exports = router;
