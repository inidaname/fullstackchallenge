const Properties = require("../models/properties");



exports.validateRegister = (req, res, next) => {
  //  check if feilds are not empty
  req.checkBody("propertyName", "Name is required").notEmpty();
  req.checkBody("propertyType", "Type is required").notEmpty();

  //use express validator to sanitize all input from body
  req.sanitize(req.body);
  //check for error
  let err = req.validationErrors();
  // if any error return
  if (err) return res.status(500).json(err);

  next(); // there were no errors!
};


exports.createProperty = (req, res) => {
  const property = new Properties({
    propertyName: req.body.propertyName,
    propertyType: req.body.propertyType,
    propertyStatus: req.body.propertyStatus
  });

  property
    .save()
    .then(result => {
      res.status(201).json({
        body: result,
        message: "Property created successfully",
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });

};

exports.getAllProperties = (req, res) => {
  Properties.find({})
    .then(properties => {
      if (properties) {
        res.status(200).json(properties);
      } else {
        res.status(400).json({
          msg: "No properties found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: {
          message: err
        }
      });
    });
};

exports.getAllOccupied = (req, res) => {
  Properties
    .find({})
    .where("status", true)
    .then(result => {
      if (result) {
        res.status(200).json({
          residents: result
        });
      } else {
        res.status(401).json({
          message: "No Occupied Property"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: {
          message: err
        }
      });
    });

};

exports.getAllVacants = (req, res) => {
  Properties
    .find({})
    .where("status", false)
    .then(result => {
      if (result) {
        res.status(200).json({
          properties: result
        });
      } else {
        res.status(401).json({
          message: "No Vacant property"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: {
          message: err
        }
      });
    });

};


exports.getPropertyById = (req, res) => {
  let query = req.params.id;
  Properties.findById(query)
    .then(property => {
      if (property) {
        res.status(200).json(property);
      } else {
        res.status(404).json({
          message: "Property does not exist"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: {
          message: err
        }
      });
    });
};

exports.updateProperty = (req, res) => {
  let propertyId = req.params.id;
  Properties
    .findByIdAndUpdate(
      propertyId, {
        $set: {
          status: true,
          dateModified: Date.now
        }
      }, {
        new: true,
        contex: "query"
      })
    .then(property => {
      if (property) {
        res.status(200).json({
          body: property,
          message: "Updated successfully",
        });
      } else {
        res.status(404).json({
          message: "Property does not exist"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: {
          message: err
        }
      });
    });
};

exports.deleteProperty = (req, res) => {
  Properties
    .findByIdAndDelete(req.params.id)
    .then(result => {
      if (result) {
        res.status(200).json({
          message: "Property deleted successfully"
        });
      } else {
        res.status(404).json({
          message: "The Property does not exist"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: {
          message: err
        }
      });
    });
}
