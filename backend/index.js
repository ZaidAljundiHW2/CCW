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

//Get legal information
app.get('/admin/CMS/general-details/legal', async(req,res) => {

    try {
        
        const getLegal = await pool.query("SELECT * FROM generaldetails WHERE type = 'Legal'");
        res.json(getLegal.rows);

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

//Add menu item
app.post('/admin/CMS/menu/menu-item', async(req, res) => {

    try {
        
        const itemname = req.body.itemname;
        const hasdesc = req.body.hasdesc;
        const itemdescription = req.body.itemdescription;
        const price = req.body.price;
        const categoryid = req.body.categoryid;
        const foodimg = req.body.foodimage;

        const addItem = await pool.query("INSERT INTO menu (itemname, hasdesc, itemdescription, foodimage, price, categoryid) VALUES ($1, $2, $3, $4, $5, $6)", [
            itemname, hasdesc, itemdescription, foodimg, price, categoryid
        ]);

        res.json("success");


    } catch (error) {
        console.error(error);
    }
}) 

//Delete menu item
app.delete('/admin/CMS/menu/menu-item/:id', async(req, res) => {

    try {

        const id = req.params.id;
        const deleteItem = await pool.query("DELETE FROM menu WHERE fooditemid = $1", [id]);

        res.json("Success");
        
    } catch (error) {

        console.error(error);
        
    }
})

//Get about content
app.get('/admin/CMS/about', async(req,res) => {

    try {

        const getSections = await pool.query("SELECT * FROM about");

        res.json(getSections.rows);
        
    } catch (error) {
        console.error(error);
    }
})

//Update about content
app.put('/admin/CMS/about/:id', async(req,res) => {

    try {

        const id = req.params.id;
        const content = req.body.content;

        const updateContent = await pool.query("UPDATE about SET aboutcontent = $2 WHERE aboutid = $1",
            [id, content]
        );

        res.json("success");
        
    } catch (error) {
        console.error(error);
    }
})

//Get story
app.get('/admin/CMS/about/story', async(req,res) => {

    try {

        const getStory = await pool.query("SELECT * FROM about WHERE aboutsection = 'Our Story'");

        res.json(getStory.rows[0]);
        
    } catch (error) {
        console.error(error);
    }
})

//Get mission
app.get('/admin/CMS/about/mission', async(req,res) => {

    try {

        const getMission = await pool.query("SELECT * FROM about WHERE aboutsection = 'Our Mission'");

        res.json(getMission.rows[0]);
        
    } catch (error) {
        console.error(error);
    }
})

//Add contact query
app.post('/admin/CMS/contact', async(req,res) => {

    try {
        
        const name = req.body.name;
        const email = req.body.email;
        const phonenumber = req.body.phonenumber;
        const subject = req.body.subject;
        const message = req.body.message;
        const status = req.body.status;
        const datetime = req.body.datetime;

        const addContact = await pool.query("INSERT INTO contact (name, email, phonenumber, subject, message, status, datetime) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [name, email, phonenumber, subject, message, status, datetime]
        );

        res.json("success");

    } catch (error) {
        console.error(error);
    }
})

//Get new contact queries
app.get('/admin/CMS/contact/new', async(req, res) => {

    try {
        
        const getNewQueries = await pool.query("SELECT * FROM contact WHERE status='new'");

        res.json(getNewQueries.rows);

    } catch (error) {
        console.error(error);
    }
})

//Get completed contact queries
app.get('/admin/CMS/contact/complete', async(req, res) => {

    try {
        
        const getNewQueries = await pool.query("SELECT * FROM contact WHERE status='complete'");

        res.json(getNewQueries.rows);

    } catch (error) {
        console.error(error);
    }
})

//Mark new contact queries as complete
app.put('/admin/CMS/contact/new/:id', async(req, res) => {

    try {
        
        const id = req.params.id;

        const updateStatus = await pool.query("UPDATE contact SET status='complete' WHERE contactid=$1",
            [id]
        );

        res.json("success");

    } catch (error) {
        console.error(error);
    }
})

//Mark complete contact queries as new
app.put('/admin/CMS/contact/complete/:id', async(req, res) => {

    try {
        
        const id = req.params.id;

        const updateStatus = await pool.query("UPDATE contact SET status='new' WHERE contactid=$1",
            [id]
        );

        res.json("success");

    } catch (error) {
        console.error(error);
    }
})

//Delete contact query
app.delete('/admin/CMS/contact/:id', async(req,res) => {

    try {

        const id = req.params.id;

        const deleteQuery = await pool.query("DELETE FROM contact WHERE contactid = $1",
            [id]
        );

        res.json("success");
        
    } catch (error) {
        console.error(error);
    }
})

//Add booking reservation
app.post('/admin/booking', async(req,res) => {

    try {

        const name = req.body.name;
        const email = req.body.email;
        const number = req.body.phonenumber;
        const date = req.body.date;
        const numguests = req.body.numguests;
        const special = req.body.specialrequests;
        const reservationtime = req.body.reservationtime;
        const locationid = req.body.locationid;

        const datetime = req.body.datetime;

        const status = req.body.status;

        const addRes = await pool.query("INSERT INTO bookings (name, email, phonenumber, reservationdate, numguests, specialrequests, reservationtime, locationid, datetime, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",[
            name, email, number, date, numguests, special, reservationtime, locationid, datetime, status
        ]);

        res.json("success");
        
    } catch (error) {
        console.error
    }
})

//Get locations
app.get('/locations', async(req,res) => {

    try {
        
        const getLocations = await pool.query("SELECT * FROM locations");
        
        res.json(getLocations.rows);

    } catch (error) {
        console.error(error);
    }
})

//Get new booking reservations
app.get('/admin/CMS/bookings/new', async(req,res) => {

    try {
        
        const getNewRes = await pool.query("SELECT * FROM bookings WHERE status='new'");
        res.json(getNewRes.rows);

    } catch (error) {
        console.error(error);
    }
})

//Get completed booking reservations
app.get('/admin/CMS/bookings/complete', async(req,res) => {

    try {
        
        const getNewRes = await pool.query("SELECT * FROM bookings WHERE status='complete'");
        res.json(getNewRes.rows);

    } catch (error) {
        console.error(error);
    }
})

//Mark new reservations as complete
app.put('/admin/CMS/bookings/new/:id', async(req, res) => {

    try {
        
        const id = req.params.id;

        const updateStatus = await pool.query("UPDATE bookings SET status='complete' WHERE locationid=$1",
            [id]
        );

        res.json("success");

    } catch (error) {
        console.error(error);
    }
})

//Mark complete reservations as new
app.put('/admin/CMS/bookings/complete/:id', async(req, res) => {

    try {
        
        const id = req.params.id;

        const updateStatus = await pool.query("UPDATE bookings SET status='new' WHERE locationid=$1",
            [id]
        );

        res.json("success");

    } catch (error) {
        console.error(error);
    }
})

//Update reservation
app.put('/admin/CMS/bookings/:id', async(req,res) => {

    try {

        const id = req.params.id;

        const name = req.body.name;
        const email = req.body.email;
        const phonenumber = req.body.phonenumber;
        const reservationdate = req.body.reservationdate;
        const numguests = req.body.numguests;
        const specialrequests = req.body.specialrequests;
        const status = req.body.status;
        const locationid = req.body.locationid;
        const datetime = req.body.datetime;
        const reservationtime = req.body.reservationtime;

        const updateReservation = await pool.query("UPDATE bookings SET name=$1, email=$2, phonenumber=$3, reservationdate=$4, numguests=$5, specialrequests=$6, status=$7, locationid=$8, datetime=$9, reservationtime=$10 WHERE bookingid=$11", [
            name, email, phonenumber, reservationdate, numguests, specialrequests, status, locationid, datetime, reservationtime, id
        ])

        res.json("success");
        
    } catch (error) {
        console.error(error);
    }
})

app.delete('/admin/CMS/bookings/:id', async(req,res) => {

    try {
        
        const id = req.params.id;

        const deleteItem = await pool.query("DELETE FROM bookings WHERE bookingid=$1", [id]);

        res.json("success");

    } catch (error) {
        console.error(error);
    }
})

app.listen(5000, () => {
    console.log("Server started on port 5000.")
})

