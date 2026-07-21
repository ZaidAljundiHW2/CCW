const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

//ROUTES

//Get all menu items
app.get('/menu/menu-items', async (req, res) => {
    
    try {

        const menuItems = await pool.query("SELECT * FROM menu");
        res.json(menuItems.rows);
        
    } catch (err) {

        console.error(err);
        
    }
})

//Get all menu categories
app.get('/menu/menu-categories', async (req, res) => {

    try {

        const categories = await pool.query("SELECT * FROM menucategories ORDER BY DisplayOrder");
        res.json(categories.rows);
        
    } catch (error) {

        console.error(error)
        
    }
})

//Get social media links
app.get('/admin/CMS/general-details/social-media', async (req, res) => {

    try {

        const socialMedia = await pool.query("SELECT * FROM generaldetails WHERE type = 'Social Media'");
        res.json(socialMedia.rows);
        
    } catch (error) {

        console.error(error);
        
    }
})

//Get footer information
app.get('/admin/CMS/general-details/footer', async (req, res) => {

    try {

        const footerinfo = await pool.query("SELECT * FROM generaldetails WHERE type = 'Footer'");
        res.json(footerinfo.rows);
        
    } catch (error) {
        console.error(error)
    }
    

})

//Update general details item
app.put('/admin/CMS/general-details/:id', async (req, res) => {

    console.log("AAA");
    try {

        console.log("BBB");
        const id = req.params.id;

        console.log("CCC");
        const val = req.body.val;

        console.log("DDD");
        console.log(val);
        console.log(id);

        const updateDetails = await pool.query("UPDATE generaldetails SET val = $1 WHERE label = $2",
            [val, id]
        );

        console.log("EEE");
        res.json("General detail item updated");
        
    } catch (error) {
        console.error(error);
    }
})


app.listen(5000, () => {
    console.log("Server started on port 5000.")
})