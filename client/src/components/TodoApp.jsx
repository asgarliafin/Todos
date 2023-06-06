import Header from "./Header";
import Main from "./Main";
import TodoFooter from "./todoFooter";

export default function TodoApp() {
    return (
        <section className="todoapp">
            <Header />
            <Main />
            <TodoFooter />
        </section>
    )
}