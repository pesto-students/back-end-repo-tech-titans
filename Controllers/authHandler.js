const Customer = require("../models/customer");
const bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);
async function signupHandler(req, res) {
  let { firstName, lastName, email, password } = req.body;

  //check if user is already registered
  let isAvailable = await Customer.findOne({
    where: {
      email: email,
    },
  });
  if (isAvailable) {
    res.status(400).send({ message: "User already exist" });
  }
  try {
    //encrypt the password
    const passwordHash = bcrypt.hashSync(password, salt);
    let newUser = await Customer.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    res
      .status(200)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.log("Error in creating a customer", error);
    res.status(500).json({ message: "Error occurred", error: error.message });
  }
}
async function loginHandler(req, res) {
  const { email, password } = req.body;

  //check if user exist or not
  let isAvailable = await Customer.findOne({
    where: { email: email },
  });
  if (!isAvailable) {
    return res.status(400).send({ message: "User not registered" });
  }

  //check password

  let passwordMatch = bcrypt.compareSync(password, isAvailable.password);
  if (!passwordMatch) {
    return res.status(400).send({ message: "Incorrect password" });
  }
  return res.status(200).send({ message: "User logged in successfully" });
}
function resetPasswordHandler(req, res) {}

module.exports = { signupHandler, loginHandler, resetPasswordHandler };
