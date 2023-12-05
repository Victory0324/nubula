type LoginValues = {
  email?: string;
  password?: string;
};

type ConfirmSignupValues = {
  email: string;
  code: string;
};

type RegisterValues = {
  email: string;
  password: string;
  displayName: string;
  dob?: string;
};

type ConfirmForgotPasswordValues = {
  email: string;
  code: string;
  newPassword: string;
};

type ForgotPasswordValues = {
  email?: string;
};
