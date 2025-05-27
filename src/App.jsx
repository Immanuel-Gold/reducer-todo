import { useReducer } from "react";
import "./App.css";

function App() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      const { type, payload } = action;
      switch (type) {
        case "handle-todo": {
          return { ...state, todo: payload };
        }

        case "new-todo": {
          return {
            ...state,
            myTodos: [
              ...state.myTodos,
              {
                id: state.myTodos.length === 0 ? (state.id = 0) : state.id++,
                todo: state.todo,

                complete: false,
              },
            ],
          };
        }
        case "complete-todo": {
          return {
            ...state,
            myTodos: state.myTodos.map((todo) => {
              if (payload === todo.id) {
                return { ...todo, complete: !todo.complete };
              } else {
                return todo;
              }
            }),
          };
        }
        case "remove-todo": {
          return {
            ...state,
            myTodos: state.myTodos.filter((todo) => todo.id !== payload),
          };
        }

        default: {
          return state;
        }
      }
    },

    {
      id: 0,
      todo: "",
      myTodos: [],
    }
  );
  return (
    <main className="h-fit w-full">
      <section className="h-fit p-[22px] flex gap-[22px]">
        <input
          className="border-[1.2px] border-black rounded-md px-2"
          type="text"
          onChange={(e) =>
            dispatch({
              type: "handle-todo",
              payload: e.target.value,
            })
          }
          placeholder="Type Todo Here..."
        />

        <button
          onClick={() =>
            dispatch({
              type: "new-todo",
            })
          }
          className="self-end p-[8px 12px] bg-[#222] text-white p-2 rounded-md cursor-pointer"
        >
          Add
        </button>
      </section>

      <section className="h-fit w-[90%] mt-[32px] p-[22px] flex flex-col gap-[32px]">
        <h3 className="underline font-bold text-[1.6rem]">Todos</h3>
        {state.myTodos.map((todo) => (
          <section
            className="h-fit w-full p-2 flex gap-2 justify-between border-[1.2px] border-black rounded-md"
            key={todo.id}
          >
            <h3
              style={{
                textDecoration: todo.complete ? "line-through" : "none",
                color: todo.complete ? "grey" : "black",
              }}
              className="flex flex-col gap-2"
            >
              {todo?.todo}
            </h3>

            <div className="flex gap-4 text-white [&>button]:p-2 [&>button]:rounded-md [&>button]:cursor-pointer">
              <button
                className="bg-[#222]"
                onClick={() =>
                  dispatch({ type: "complete-todo", payload: todo.id })
                }
              >
                Done
              </button>
              <button
                className="bg-red-400"
                onClick={() =>
                  dispatch({ type: "remove-todo", payload: todo.id })
                }
              >
                Delete
              </button>
            </div>
          </section>
        ))}
      </section>
    </main>
  );
}

export default App;
