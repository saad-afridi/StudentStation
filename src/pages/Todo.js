import React from "react";

// Todo Components
import TodoList from "../components/TodoList/TodoList";
import AddTodo from "../components/TodoList/AddTodo";
import PageTitle from "../components/PageTitle";

// Material UI Components
import { Container } from "@material-ui/core";

// Material UI Icons
import ListIcon from "@material-ui/icons/List";

export default function ToDoPage() {
  return (
    <Container className="TodoContainer">
      <PageTitle
        text={"What To Do?"}
        icon={<ListIcon style={{ transform: "scale(2.0)" }} />}
      />
      <AddTodo />
      <TodoList />
    </Container>
  );
}
