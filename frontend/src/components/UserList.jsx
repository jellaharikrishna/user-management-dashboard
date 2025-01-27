import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import UserForm from "./UserForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const url = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(url);
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const addUser = async (userData) => {
        try {
          const response = await axios.post(url, userData);
          console.log("users", users);
          const {id, name}=  response.data
          const dataSplit = {
            id: id,
            name,
          }
          setUsers(prev => [...prev, dataSplit])
          //fetchUsers();
          setShowForm(false);
        } catch (error) {
          console.error(error.message);
        }
    };

  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`https://robot-space-todo-tasks.onrender.com/tasks/${id}`);
        fetchUsers();
      } catch (err) {
        console.error("Error deleting task:", err);
      }
    }
  };

  const openForm = (task = null) => {
    setSelectedTask(task);
    setShowForm(true);
  };

  const closeForm = () => {
    setSelectedTask(null);
    setShowForm(false);
    fetchUsers();
  };

  //const filteredTasks = !filterStatus ? tasks : tasks.filter((eachValue => eachValue.status === filterStatus))

  return (
    <div>
      <Button className="mb-3" onClick={() => openForm()}>Add User</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            {/* <th>Department</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name.split(" ")[0]}</td>
              <td>{user.name.split(" ")[1]}</td>
              <td>{user.email}</td>
              {/* <td>{user.department}</td> */}
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => openForm(user)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteTask(user._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showForm && (
        <UserForm
          addUser={addUser}
          show={showForm}
          onHide={closeForm}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default UserList;














// import React from "react";

// const UserList = ({ users, onEdit, onDelete }) => (
//   <div className="user-list">
//     <table>
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>First Name</th>
//           <th>Last Name</th>
//           <th>Email</th>
//           <th>Department</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map((user) => (
//           <tr key={user.id}>
//             <td>{user.id}</td>
//             <td>{user.firstName}</td>
//             <td>{user.lastName}</td>
//             <td>{user.email}</td>
//             <td>{user.department}</td>
//             <td>
//               <button onClick={() => onEdit(user)}>Edit</button>
//               <button onClick={() => onDelete(user.id)}>Delete</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );


// export default UserList