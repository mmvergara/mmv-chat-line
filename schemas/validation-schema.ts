import * as yup from "yup";
const stringRequired = (fieldName: string, min: number, max: number) => {
  return yup
    .string()
    .min(min, `${fieldName} Minimum of ${min} characters`)
    .max(max, `${fieldName} Max of ${max} characters`)
    .trim()
    .required(fieldName + " field is required.");
};

export const signInValidationSchema = yup.object({
  email: yup.string().email("Must be a valid email address"),
  password: stringRequired("Password", 6, 150),
});

export const signUpValidationSchema = yup.object({
  email: yup.string().email("Must be a valid email address"),
  username: stringRequired("Username", 4, 50),
  password: stringRequired("Password", 6, 150),
});

