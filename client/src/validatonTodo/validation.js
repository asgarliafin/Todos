import * as Yup from "yup";

// export const todoSchema = object({
//   todo: string().required("Todo Cannot Be Empty"),
// });

export const todoSchema = Yup.object().shape({
  todo: Yup.string().required("type something :)"),
});
