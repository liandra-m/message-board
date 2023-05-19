import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().required().max(255),
  email: yup.string().required().email("please, use a valid email").max(255),
  password: yup.string().required().max(255),
});
