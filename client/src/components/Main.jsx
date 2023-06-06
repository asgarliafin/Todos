import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, handleCheckTodo } from "../store/todoSlice";

export default function Main() {
  const dispatch = useDispatch();
  const { todos, activeTab } = useSelector((state) => state.todoReducer);

  const removeTodo = (id) => {
    dispatch(deleteTodo(id));
  };
  const handleChecked = (id) => {
    const findObj = todos.find((q) => q._id === id);
    console.log(findObj);
    const updatedObj = { ...findObj, completed: !findObj.completed };
    dispatch(handleCheckTodo({ id, updatedObj }));
  };
  const filteredTodos =
    activeTab === "completed"
      ? todos.filter((q) => q.completed)
      : activeTab === "active"
        ? todos.filter((q) => !q.completed)
        : todos;

  return (
    <>
      {todos.length > 0 ? (
        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all" onClick={toggleTodos}>
            Mark all as complete
          </label>
          <ul className="todo-list">
            {filteredTodos.length > 0 &&
              filteredTodos.map((item) => (
                <li
                  className={item.completed ? "completed" : ""}
                  key={item._id}
                >
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleChecked(item._id)}
                    />
                    <label>{item.todo}</label>
                    <button
                      className="destroy"
                      onClick={() => removeTodo(item._id)}
                    ></button>
                  </div>
                </li>
              ))}
          </ul>
        </section>
      ) : (
        <p style={{ padding: "0 30px", opacity: "0.4", fontSize: "20px" }}>
          Empty...
        </p>
      )}
    </>
  );
}
