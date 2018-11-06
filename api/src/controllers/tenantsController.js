const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Tenants = require("../models/tenantsReg");
const {
  sendEmail
} = require("../lib/helpers");



exports.validateRegister = (req, res, next) => {
  const {
    fullName,
    phoneNumber,
    email,
    password
  } = req.body;
  //  check if feilds are not empty
  req.checkBody("phoneNumber", "Phone is required").notEmpty();
  req.checkBody("password", "Password is required").notEmpty();
  req.checkBody("email", "Email is not valid").isEmail();
  req.checkBody("fullName", "Name is required").notEmpty();

  //use express validator to sanitize all input from body
  req.sanitize(req.body);
  //check for error
  let err = req.validationErrors();
  // if any error return
  if (err) return res.status(500).json(err);

  next(); // there were no errors!
};

exports.createTenant = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      Tenants.findOne({
          $or: [{
              email: req.body.email
            },
            {
              phoneNumber: req.body.phoneNumber
            }
          ]
        })
        .exec()
        .then(user => {
          if (user) {
            return res.status(401).json({
              message: "Tenant Already exit"
            });
          } else {
            const tenant = new Tenants({
              fullName: req.body.fullName,
              phoneNumber: req.body.phoneNumber,
              email: req.body.email,
              password: hash
            });

            tenant
              .save()
              .then(result => {
                const {
                  fullName,
                  email
                } = result;
                sendEmail(fullName, email);
              })
              .then(result => {
                const token = jwt.sign({
                    phone: result.phoneNumber,
                    userId: result._id
                  },
                  process.env.JWT_KEY, {
                    expiresIn: "1W"
                  }
                );
                return res.status(200).json({
                  message: "Member Registered successfully",
                  token: token,
                  body: result
                });
              })
              .catch(err => {
                res.status(500).json({
                  error: err.message
                });
              });
          }
        });
    }
  });
};

exports.login = (req, res) => {
  Tenants.findOne({
      $or: [{
          phoneNumber: req.body.phoneNumber
        },
        {
          email: req.body.email
        }
      ]
    })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Member does not exit"
        });
      }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign({
              phone: user.phoneNumber,
              userId: user._id
            },
            process.env.JWT_KEY, {
              expiresIn: "1W"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            body: user
          });
        }

      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.getAllTenants = (req, res) => {
  Tenants.find({})
    .select("-password")
    .then(tenants => {
      if (tenants) {
        res.status(200).json(tenants);
      } else {
        res.status(400).json({
          msg: "No tenants found"
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

exports.getAllResident = (req, res) => {
  Tenants
    .find({})
    .where("status", true)
    .select("-password")
    .then(result => {
      if (result) {
        res.status(200).json({
          residents: result
        });
      } else {
        res.status(401).json({
          message: "No Active Residents"
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

exports.getNonResident = (req, res) => {
  Tenants
    .find({})
    .where("status", false)
    .select("-password")
    .then(result => {
      if (result) {
        res.status(200).json({
          residents: result
        });
      } else {
        res.status(401).json({
          message: "No inactive Residents"
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


exports.getTenantById = (req, res) => {
  let query = req.params.id;
  Tenants.findById(query)
    .then(tenant => {
      if (tenant) {
        res.status(200).json(tenant);
      } else {
        res.status(404).json({
          message: "Invalid Tenant"
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

exports.updateTenant = (req, res) => {
  let tenantId = req.params.id;
  Tenants
    .findByIdAndUpdate(
      tenantId, {
        $set: {
          status: true,
          dateModified: Date.now
        }
      }, {
        new: true,
        contex: "query"
      })
    .then(tenant => {
      if (tenant) {
        res.status(200).json({
          body: tenant,
          message: "Updated successfully",
        });
      } else {
        res.status(404).json({
          message: "Tenant does not exist"
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

exports.deleteTenant = (req, res) => {
  Tenants
    .findByIdAndDelete(req.params.id)
    .then(result => {
      if (result) {
        res.status(200).json({
          message: "Tenant deleted successfully"
        });
      } else {
        res.status(404).json({
          message: "The tenant does not exist"
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
