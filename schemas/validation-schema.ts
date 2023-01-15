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
  email: stringRequired("Email", 6, 50),
  password: stringRequired("Password", 6, 150),
});
export const signUpValidationSchema = yup.object({
  email: stringRequired("Email", 6, 50),
  username: stringRequired("Username", 6, 50),
  password: stringRequired("Password", 6, 150),
});

export const postValidationSchema = yup.object({
  title: stringRequired("Title", 6, 50),
  description: stringRequired("Description", 6, 500),
});

export async function validation<T = Record<string, any>>(scheme: yup.SchemaOf<T>, data: Record<string, any> | null) {
  try {
    await scheme.validate(data, { abortEarly: false });
    return { isValid: true };
  } catch (e) {
    return { isValid: false };
  }
}
