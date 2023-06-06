import { useDispatch } from "react-redux";
import { postTodo } from "../store/todoSlice";
import { useFormik } from "formik";
import { todoSchema } from "../validatonTodo/validation";
export default function Header() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      todo: "",
    },
    validationSchema: todoSchema,
    onSubmit: (values) => {
      let obj = {
        todo: values.todo,
        completed: false,
      };
      dispatch(postTodo(obj));
    },
  });
  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={formik.handleSubmit} style={{ position: "relative" }}>
          <input
            className="new-todo"
            style={{
              border: formik.errors.todo ? "1px solid red" : "none",
            }}
            name="todo"
            placeholder="What needs to be done?"
            autoFocus
            value={formik.values.todo}
            onChange={formik.handleChange}
          />
          {formik.errors.todo && (
            <span className="error">{formik.errors.todo}</span>
          )}
        </form>
      </header>
    </>
  );
}
