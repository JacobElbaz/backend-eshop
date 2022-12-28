module.exports.signUpErrors = (err) => {
  let errors = { username: "", email: "", password: "" };

  if (err.message.includes("username"))
    errors.username = "Incorrect username";

  if (err.message.includes("email")) errors.email = "Invalid email";

  if (err.message.includes("password"))
    errors.password = "Password must be at least 6 characters";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "This email is already registered";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: '', password: ''}

  if (err.message.includes("email")) 
    errors.email = "Email unknown";
  
  if (err.message.includes('password'))
    errors.password = "Password does not match"

  return errors;
}

module.exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize: ""};

  if (err.message.includes('invalid file'))
    errors.format = "imcompatible";

  if (err.message.includes('max size'))
    errors.maxSize = "Size over 500ko";

  return errors
}