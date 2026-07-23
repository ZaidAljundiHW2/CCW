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

    try {

        const id = req.params.id;

        const val = req.body.val;

        const updateDetails = await pool.query("UPDATE generaldetails SET val = $1 WHERE label = $2",
            [val, id]
        );

        res.json("General detail item updated");
        
    } catch (error) {
        console.error(error);
    }
})

//Update menu category rank and name
app.put('/admin/CMS/menu/menu-categories/:id', async (req, res) => {

    try {

        const id = req.params.id;
        const newName = req.body.newName;
        const newRank = req.body.newRank;

        const updateCat = await pool.query("UPDATE menucategories SET category = $1, displayorder = $2 WHERE categoryid = $3",
            [newName, newRank, id]
        );
        
        res.json("Category updated");
        
    } catch (error) {
        console.error(error)
    }
    
})

//Delete menu category
app.delete('/admin/CMS/menu/menu-categories/:id', async (req, res) => {

    try {
        const catID = req.params.id;

        const deleteCat = await pool.query("DELETE FROM menucategories WHERE categoryid = $1",
            [catID]
        );

        res.json("success");
        
    } catch (error) {
        console.error(error)
    }
    


})

//Disable Build Your Own
app.delete('/admin/CMS/menu/menu-categories/toggle/byo', async (req, res) => {

    try {

        const deleteBYO = await pool.query("DELETE FROM menucategories WHERE category='Build Your Own'");

        res.json("Success");
        
    } catch (error) {
        console.error(error);
    }
})

//Delete category items
app.delete('/admin/CMS/menu/menu-categoryitems/:id', async (req, res) => {

    try {

        const catID = req.params.id;

        const deleteItems = await pool.query("DELETE FROM menu WHERE categoryid = $1",
            [catID]
        );

      

        res.json("success");
        
    } catch (error) {
        console.error(error);
        res.status(500).json(error.message);

    }
})

//Add category
app.post('/admin/CMS/menu/menu-categories', async (req, res) => {

    try {

        const category = req.body.category;
        const displayorder = req.body.displayorder;

        const addCat = await pool.query("INSERT INTO menucategories (category, displayorder) VALUES ($1, $2)",
            [category, displayorder]
        );

        res.json("success");

        
        
    } catch (error) {

        console.error(error);
        
    }
})



//Enable Build Your Own
app.post('/admin/CMS/menu/menu-categories/toggle/byo', async(req, res) => {

    try {

        const displayorder = req.body.displayorder;

        const addBYO = await pool.query("INSERT INTO menucategories (category, displayorder) VALUES ('Build Your Own', $1)",
            [displayorder]
        );

        res.json('Success');
        
    } catch (error) {
        console.error(error);   
    }
})

//Update menu item
app.put('/admin/CMS/menu/menu-item/:id', async(req, res) => {

    try {
        
        const fooditemid = req.params.id;

        const itemname = req.body.itemname;
        const hasdesc = req.body.hasdesc;
        const itemdescription = req.body.itemdescription;
        const price = req.body.price;
        const categoryid = req.body.categoryid;
        const foodimg = req.body.foodimage;

        const updateItem = await pool.query(" UPDATE menu SET itemname=$2, hasdesc=$3, itemdescription=$4, foodimage=$5, price=$6, categoryid=$7 WHERE fooditemid=$1",
            [fooditemid, itemname, hasdesc, itemdescription, foodimg, price, categoryid]
        );

        res.json("Success");


    } catch (error) {
        console.error(error);
    }
})


app.listen(5000, () => {
    console.log("Server started on port 5000.")
})

