import React from "react";
import { Container } from "react-bootstrap";
import UserList from "./components/UserList";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Container>
      <h1 className="my-4 text-center">User Management Dashboard </h1>
      <UserList  />
    </Container>
  );
};

export default App;