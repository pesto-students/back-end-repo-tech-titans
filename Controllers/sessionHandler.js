const Customer = require("../models/customer");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Session = require("../models/Session");

//update mobile handler
async function updateMobileHandler(req, res) {
  let { mobile, userData } = req.body;

  console.log("MOBILE is", mobile);
  console.log("customer id is", userData.customerId);
  let newMobile = await Customer.update(
    { mobile: mobile },
    { where: { customerId: userData.customerId } }
  );
  return res.status(200).send({
    message: "Mobile number updated successfully",
  });
}

module.exports = { updateMobileHandler };