const {
  createUserController,
  validUserControl,
} = require("../controller/user.controller");
const validateResource = require("../middleware/validateResource");
const { createUserSchema, validUserSchema } = require("../schemas/user.schema");

const userRoute = async (app) => {
  app.post(
    "/api/user",
    validateResource(createUserSchema),
    createUserController
  );

  app.post(
    "/api/user/login",
    validateResource(validUserSchema),
    validUserControl
  );
};

module.exports = userRoute;
