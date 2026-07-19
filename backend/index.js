const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

//ROUTES

//create menu item

app.post('/menu', async(req, res) => {

    try {

        console.log(req.body);
    }

    catch(err) {
        console.error(err.message);
    }
})


app.listen(5000, () => {
    console.log("Server started on port 5000.")
})