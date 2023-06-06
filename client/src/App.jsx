import { useEffect } from "react";
import Footer from "./components/Footer";
import TodoApp from "./components/TodoApp";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "./store/todoSlice";
import Spinner from "./components/Spinner";

export default function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.todoReducer);
  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);
  return (
    <>
      {loading && <Spinner />}
      {!loading && (
        <>
          <TodoApp />
          <Footer />
        </>
      )}
    </>
  );
}
