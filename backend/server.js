const express = require('express');

const sqlite3 = require('sqlite3');
const {open} = require('sqlite');

const cors = require('cors');
const path = require('path');

const app = express()
app.use(express.json())

app.use(cors({
    origin: "https://user-management-dashboard-frontend.onrender.com", // Corrected origin without trailing slash
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true // Include credentials if required
}));

const dbPath = path.join(__dirname, "users.db")
let db = null

const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })

        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                firstname TEXT NOT NULL,
                lastname TEXT NOT NULL,
                email TEXT NOT NULL,
                department TEXT NOT NULL
        )`)
    
        app.listen(5000, () => {
            console.log("Server is running at port 5000...")
        })
        
    } catch (e) {
        console.log(`DB error: ${e.message}`)
        process.exit(1)
    }
}

initializeDBAndServer()

// adding new user
app.post('/users', async (req, res) => {
    try {
        const {firstname, lastname, email, department} = req.body
        const newQuery = `INSERT INTO 
        users (firstname, lastname, email, department)
        VALUES (?,?,?,?)`
        await db.run(newQuery, [firstname, lastname, email, department])
        res.send('New User Added Successfully')
    } catch (e) {
        res.status(500).send(`ErrorMsg: ${e.message}`)
    }
})

// users array
app.get("/users", async(req,res)=>{
    try {
        const getUsers = `SELECT * FROM users`
        const usersArray = await db.all(getUsers)
        res.send(usersArray)
    } catch (e) {
        res.status(500).send(`ErrorMsg: ${e.message}`)
    }
})

// user object
app.get("/users/:id", async(req,res)=>{
    try {
        const {id} = req.params
        const getUser = `SELECT * FROM users WHERE id = '${id}'`
        const userObj = await db.get(getUser)
        res.send(userObj)
    } catch (e) {
        res.status(500).send(`ErrorMsg: ${e.message}`)
    }
})


// update user 
app.put("/users/:id",  async(req,res)=>{
    try {
        const {id} = req.params
        const {firstname, lastname, email, department} = req.body
        const updateUser = `UPDATE users 
            SET firstname = ?,
                lastname = ?,
                email = ?,
                department = ?
            WHERE id = ?
        `
        await db.run(updateUser, [firstname, lastname, email, department, id])
        res.send("Updated User Details")
    
    } catch (e) {
        res.status(500).send(`ErrorMsg: ${e.message}`)
    }
})

// delete user
app.delete("/users/:id", async(req,res)=>{
    try {
        const {id} = req.params
        const deleteUser = `DELETE FROM users WHERE id = '${id}'`
        await db.run(deleteUser)
        res.send('Deleted User Details')
    } catch (e) {
        res.status(500).send(`ErrorMsg: ${e.message}`)
    }
})