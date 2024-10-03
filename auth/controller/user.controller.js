const {
  checkEmail,
  createUser,
  validUser,
} = require("../services/user.service");

const createUserController = async (req, res, next) => {
  try {
    const userData = {
      usrName: req.body.usrName,
      usrEmail: req.body.usrEmail,
      usrPass: req.body.usrPass,
    };

    const usrExist = await checkEmail(userData.usrEmail);

    if (usrExist) {
      const usr = await createUser(userData);

      if (usr) return res.status(202).jsonp("You Are Registered Successfully!");
      else return res.status(410).jsonp("Registration Failed!");
    } else return res.status(410).jsonp("E-mail Address Already Exist!");
  } catch (e) {
    return res.status(409).jsonp(e.message);
  }
};

const validUserControl = async (req, res, next) => {
  try {
    const userData = {
      usrEmail: req.body.usrEmail,
      usrPass: req.body.usrPass,
    };

    const usr = await validUser(userData);

    if (!usr) {
      return res.status(401).jsonp("Invalid Email or Password");
    }

    return res
      .status(200)
      .jsonp({ message: "Login Successful!", usrName: usr });
  } catch (e) {
    return res.status(409).jsonp(e.message);
  }
};

module.exports = { createUserController, validUserControl };
