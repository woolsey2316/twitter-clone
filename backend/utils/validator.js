const validator = require("validator");

module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username cannot be empty";
  }
  if (email.trim() === "") {
    errors.email = "email cannot be empty";
  }

  return {
    errors,
    valid: Object.keys(erros).length < 1,
  };
};

module.exports.validateLoginInput = (input, password) => {
  const errors = {};
  if (input.trim() === "") {
    errors.password = "field cannot be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}