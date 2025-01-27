# User Management Dashboard

## Objective
The goal of this project is to develop a simple web application where users can view, add, edit, and delete user details using a mock backend API.

---

## Features

### User Interface
- Display a list of users with the following details:
  - ID
  - First Name
  - Last Name
  - Email
  - Department
- Buttons or links to:
  - **Add** a new user
  - **Edit** existing user details
  - **Delete** a user
- A form to:
  - Input details for adding a new user
  - Edit details of an existing user

### Backend Interaction
- Utilizes (https://user-management-dashboard-backend.onrender.com) testing purposes.
- Endpoints:
  - `GET /users` - Fetch all user data
  - `POST /users` - Add a new user (mocked)
  - `PUT /users/:id` - Update an existing user's details (mocked)
  - `DELETE /users/:id` - Delete a user (mocked)

### Functionality
1. **View Users**: Display all users by fetching data from the `/users` endpoint.
2. **Add User**: Allow adding a new user through a form. The data is sent to the `/users` endpoint via a POST request (mocked response).
3. **Edit User**: Edit an existing user's details by fetching their current data, updating it, and sending it back to the `/users/:id` endpoint via a PUT request (mocked response).
4. **Delete User**: Remove a user by sending a DELETE request to `/users/:id`.

### Error Handling
- Displays an error message to users if API requests fail (e.g., network issues, invalid data).

---

## Bonus Features (Optional)
- **Pagination**: Displays users in paginated views for better usability.
- **Client-Side Validation**: Validates user inputs in the form for completeness and correctness.
- **Responsive Design**: Ensures the interface adapts seamlessly to various screen sizes.

---

## Setup and Installation

### Prerequisites
- Node.js and npm/yarn installed
- Git installed

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd user-management-dashboard
