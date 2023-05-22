import * as yup from "yup";

export const messageSchema = yup.object().shape({
  title: yup.string().required().max(255),
  content: yup.string(),
});
