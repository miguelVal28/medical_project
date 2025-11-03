export function validateEmail(email: string) {
  const EMAIL_FORM = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validationState = {
    emailError: "",
    emailIsValid: true,
  };

  if (!email) {
    validationState.emailError = "Email is required";
    validationState.emailIsValid = false;
  }

  if (!EMAIL_FORM.test(email)) {
    validationState.emailError = "Email is invalid";
    validationState.emailIsValid = false;
  }

  return validationState;
}

export function validatePassword(password: string, minLength: number) {
  const validationState = {
    passwordError: "",
    passwordIsValid: true,
  };

  if (!password) {
    validationState.passwordError = "Password is required";
    validationState.passwordIsValid = false;
  }

  if (password.length < minLength) {
    validationState.passwordError = `Minimum password length is ${minLength}`;
    validationState.passwordIsValid = false;
  }

  return validationState;
}
