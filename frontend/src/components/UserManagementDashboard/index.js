// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import {Table} from 'react-bootstrap';

// //import UserList from "../UserList";

// import './index.css'

// const UserManagementDashboard = () => {
    
//   const [users, setUsers] = useState([]);
//   const [editingUser, setEditingUser] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   const API_BASE_URL = "https://jsonplaceholder.typicode.com";

//   const loadUsers = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/users`);
//       setUsers(response.data);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const handleAddUser = async () => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/users`, userData);
//       console.log(response.data);
//       loadUsers();
//       setShowForm(false);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   const handleUpdateUser = async (user) => {
//     try {
//       const response = await axios.put(`${API_BASE_URL}/users/${editingUser.id}`, user);
//       setUsers((prev) =>
//         prev.map((u) => (u.id === editingUser.id ? response.data : u))
//       );
//       setEditingUser(null);
//       setShowForm(false);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   const handleDeleteUser = async (id) => {
//     try {
//     await axios.delete(`${API_BASE_URL}/users/${id}`);
//       setUsers((prev) => prev.filter((user) => user.id !== id));
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   const handleEdit = (user) => {
//     setEditingUser(user);
//     setShowForm(true);
//     handleUpdateUser()
//   };


  
  
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setUserData((prev) => ({ ...prev, [name]: value }));
//     };
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       setUsers(userData);
//       handleAddUser();
      
//     };


  

//   return (
//     <div className="bg-container">
//       <h1 style={{'textAlign': 'center'}}>User Management Dashboard</h1>
//       {showForm ? (
//         <form className="form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="firstName"
//           placeholder="First Name"
//           value={userData.firstName}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="lastName"
//           placeholder="Last Name"
//           value={userData.lastName}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={userData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="department"
//           placeholder="Department"
//           value={userData.department}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Submit</button>
//         <button type="button" onClick={() => setShowForm(false)}>
//           Cancel
//         </button>
//       </form>
//       ) : (
//         <div style={{"border": "2px solid red"}}>
//           <button onClick={() => setShowForm(true)}>Add User</button>
//           <div className="user-list">
//             <Table>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>First Name</th>
//                   <th>Last Name</th>
//                   <th>Email</th>
//                   <th>Department</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                   <tr key={user.id}>
//                     <td>{user.id}</td>
//                     <td>{user.firstName}</td>
//                     <td>{user.lastName}</td>
//                     <td>{user.email}</td>
//                     <td>{user.department}</td>
//                     <td>
//                       <button onClick={handleEdit(user)}>Edit</button>
//                       <button onClick={handleDeleteUser(user.id)}>Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserManagementDashboard;
















// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // //import { Button, Card, CardContent, Input, Label, Modal, ModalContent } from '@/components/ui';

// // const API_URL = 'https://jsonplaceholder.typicode.com/users';

// // const UserManagementDashboard = () => {
// //   const [users, setUsers] = useState([]);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [formValues, setFormValues] = useState({
// //     firstName: '',
// //     lastName: '',
// //     email: '',
// //     department: '',
// //   });
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   const fetchUsers = async () => {
// //     try {
// //       const response = await axios.get(API_URL);
// //       setUsers(response.data);
// //     } catch (err) {
// //       setError('Failed to fetch users.');
// //     }
// //   };

// //   const handleAddOrEditUser = async () => {
// //     try {
// //       if (selectedUser) {
// //         await axios.put(`${API_URL}/${selectedUser.id}`, formValues);
// //       } else {
// //         await axios.post(API_URL, formValues);
// //       }
// //       setIsModalOpen(false);
// //       setFormValues({ firstName: '', lastName: '', email: '', department: '' });
// //       fetchUsers();
// //     } catch (err) {
// //       setError('Failed to save user.');
// //     }
// //   };

// //   const handleDeleteUser = async (id) => {
// //     try {
// //       await axios.delete(`${API_URL}/${id}`);
// //       fetchUsers();
// //     } catch (err) {
// //       setError('Failed to delete user.');
// //     }
// //   };

// //   const openModal = (user = null) => {
// //     setSelectedUser(user);
// //     setFormValues(
// //       user
// //         ? { ...user }
// //         : { firstName: '', lastName: '', email: '', department: '' }
// //     );
// //     setIsModalOpen(true);
// //   };

// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //     setError('');
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
// //   };

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-xl font-bold mb-4">User Management Dashboard</h1>
// //       {error && <div className="text-red-500 mb-4">{error}</div>}
// //       <button type='button' onClick={() => openModal()}>Add User</button>
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
// //         {users.map((user) => (
// //           <ul key={user.id}>
// //             <li>
// //               <p><strong>ID:</strong> {user.id}</p>
// //               <p><strong>First Name:</strong> {user.firstName || 'N/A'}</p>
// //               <p><strong>Last Name:</strong> {user.lastName || 'N/A'}</p>
// //               <p><strong>Email:</strong> {user.email || 'N/A'}</p>
// //               <p><strong>Department:</strong> {user.department || 'N/A'}</p>
// //               <div className="flex justify-between mt-4">
// //                 <button type='button' onClick={() => openModal(user)}>Edit</button>
// //                 <button type='button' onClick={() => handleDeleteUser(user.id)} variant="destructive">Delete</button>
// //               </div>
// //             </li>
// //           </ul>
// //         ))}
// //       </div>

// //       {isModalOpen && (
// //         <div onClose={closeModal}>
// //           <div>
// //             <h2 className="text-lg font-bold mb-4">
// //               {selectedUser ? 'Edit User' : 'Add User'}
// //             </h2>
// //             <form>
// //               <label>First Name</label>
// //               <input
// //                 type="text"
// //                 name="firstName"
// //                 value={formValues.firstName}
// //                 onChange={handleInputChange}
// //                 className="mb-4"
// //               />
// //               <label>Last Name</label>
// //               <input
// //                 type="text"
// //                 name="lastName"
// //                 value={formValues.lastName}
// //                 onChange={handleInputChange}
// //                 className="mb-4"
// //               />
// //               <label>Email</label>
// //               <input
// //                 type="text"
// //                 name="email"
// //                 value={formValues.email}
// //                 onChange={handleInputChange}
// //                 className="mb-4"
// //               />
// //               <label>Department</label>
// //               <input
// //                 type="text"
// //                 name="department"
// //                 value={formValues.department}
// //                 onChange={handleInputChange}
// //                 className="mb-4"
// //               />
// //               <div className="flex justify-end">
// //                 <button type='button' onClick={handleAddOrEditUser}>{selectedUser ? 'Save Changes' : 'Add User'}</button>
// //                 <button type='button' onClick={closeModal} variant="secondary" className="ml-2">Cancel</button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default UserManagementDashboard;
