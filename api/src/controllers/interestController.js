const Interest = require("../models/interest");

exports.createInterest = (req, res) => {
  const interest = new Interest({
    tenant: req.body.tenant,
    property: req.body.property
  });

  interest
    .save()
    .exec()
    .then(interest => {
      res.status(201).json({
        body: interest,
        message: "Your interest has been registered",
      });
    })
    .catch(err => {
      res.status(500).json({
        error: {
          message: err
        }
      });
    });
};

exports.getInterestByProperty = (req, res) => {
  Interest
    .find({})
    .where("property", req.params.propertyId)
    .populate("tenant", "-password")
    .exec()
    .then(results => {
      if (results) {
        res.status(200).json({
          property: results
        });
      } else {
        res.status(401).send({
          message: "This property has indicated interests"
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

exports.getInterestByTenant = (req, res) => {
  Interest
    .find({})
    .where("tenant", req.params.propertyId)
    .populate("properties")
    .exec()
    .then(results => {
      if (results) {
        res.status(200).json({
          property: results
        });
      } else {
        res.status(401).send({
          message: "This property has indicated interests"
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

exports.deleteInterest = (req, res) => {
  Interest
    .findByIdAndDelete(req.params.id)
    .exec()
    .then(result => {
      if (result) {
        res.status(200).json({
          message: "You have removed the interest for this property"
        });
      } else {
        res.status(404).json({
          message: "Failed to locate the interest"
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
