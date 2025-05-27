import React from "react";

function Random() {
  return (
    <section className="flex gap-4 text-white [&>button]:p-2 [&>button]:rounded-md [&>button]:cursor-pointer">
      <button
        className="bg-[#222]"
        onClick={() => dispatch({ type: "complete-todo", payload: todo.id })}
      >
        Done
      </button>
      <button
        className="bg-red-400"
        onClick={() => dispatch({ type: "remove-todo", payload: todo.id })}
      >
        Delete
      </button>
    </section>
  );
}

export default Random;
