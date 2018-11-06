const Interest = require("../models/interest");

exports.createInterest = (req, res) => {
  const interest = new Interest({
    tenant: req.body.tenant,
    property: req.body.property
  });

  interest
    .save()
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

exports.getInterest = (req, res) => {

  Interest
    .find({})
    .where("property", req.params.property)
    .where("tenant", req.params.tenant)
    .populate("tenant", "-password")
    .populate("property")
    .then(results => {
      if (results) {
        res.status(200).json({
          property: results
        });
      } else {
        res.status(404).send({
          message: "This property has no indicated interests"
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
    .where("tenant", req.params.tenantId)
    .populate("properties")
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
