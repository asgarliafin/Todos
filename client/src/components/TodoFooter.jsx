import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCompletedTodoAction, getTabAction } from "../store/todoSlice";
export default function TodoFooter() {
  const dispatch = useDispatch();
  const [tabs] = useState(["All", "Active", "Completed"]);
  const { todos, activeTab } = useSelector((state) => state.todoReducer);
  const unCompletedTodo = todos?.filter((q) => !q?.completed);
  const clearCompletedTodo = () => {
    const completedTodos = todos.filter((q) => q?.completed);
    completedTodos.length > 0
      ? dispatch(deleteCompletedTodoAction(completedTodos))
      : alert("you must complete at least one todo ; )");
  };
  const getTab = (tab) => {
    dispatch(getTabAction(tab));
  };
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{unCompletedTodo.length}</strong> items left
      </span>
      <ul className="filters">
        {tabs.map((tab, key) => (
          <li key={key}>
            <a
              className={activeTab === tab.toLowerCase() ? "selected" : ""}
              onClick={() => getTab(tab)}
            >
              {tab}
            </a>
          </li>
        ))}
      </ul>
      <button className="clear-completed" onClick={clearCompletedTodo}>
        Clear completed
      </button>
    </footer>
  );
}
