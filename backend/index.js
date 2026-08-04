const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const authRoutes = require("./authroutes/auth");
const protect = require('./middleware/protect')
const rateLimit = require('express-rate-limit');

const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

app.set('trust proxy', 1);

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser())

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;


//cloudinary initialisation
// Require the cloudinary library
const cloudinary = require('cloudinary').v2;
const Multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
async function handleUpload(file, options = {}) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    ...options
  });
  return res;
}

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

function getPublicIdFromUrl(url) {
    try {
        const afterUpload = url.split("/upload/")[1];        // v1234567/menuitems/photo.jpg
        const withoutVersion = afterUpload.replace(/^v\d+\//, ""); // menuitems/photo.jpg
        return withoutVersion.replace(/\.[^/.]+$/, "");       // menuitems/photo
    } catch {
        return null;
    }
}

const publicLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
});

const formLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many submissions. Please try again later." }
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
});

const adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

const uploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
});

// public read-only routes
app.use("/menu", publicLimiter);
app.use("/locations", publicLimiter);
app.use("/gallery", publicLimiter);
app.use("/coming-soon", publicLimiter);
app.use("/testimonials", publicLimiter);

// uploads / cloudinary-touching admin routes
app.use("/upload", uploadLimiter);
app.use("/replace", uploadLimiter);
app.use("/create", uploadLimiter);
app.use("/edit", uploadLimiter);
app.use("/delete", uploadLimiter);

// authentication — tune max/window based on what's actually inside authRoutes
// (e.g. if it includes silent token-refresh, scope this to /api/auth/login instead)
app.use("/api/auth", authLimiter);
app.use('/api/auth', authRoutes);

// general admin CMS routes (CRUD on menu, locations, about, bookings mgmt, etc.)
app.use("/admin/CMS", adminLimiter);



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
app.put('/admin/CMS/general-details/:id', protect, async (req, res) => {

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
app.put('/admin/CMS/menu/menu-categories/:id', protect, async (req, res) => {

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
app.delete('/admin/CMS/menu/menu-categories/:id', protect, async (req, res) => {

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
app.delete('/admin/CMS/menu/menu-categories/toggle/byo', protect, async (req, res) => {

    try {

        const deleteBYO = await pool.query("DELETE FROM menucategories WHERE category='Build Your Own'");

        res.json("Success");
        
    } catch (error) {
        console.error(error);
    }
})

//Delete category items
app.delete('/admin/CMS/menu/menu-categoryitems/:id', protect, async (req, res) => {

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
app.post('/admin/CMS/menu/menu-categories', protect, async (req, res) => {

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
app.post('/admin/CMS/menu/menu-categories/toggle/byo', protect, async(req, res) => {

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
app.put('/admin/CMS/menu/menu-item/:id', protect, async(req, res) => {

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
app.post('/admin/CMS/menu/menu-item', protect, async(req, res) => {

    try {
        
        const itemname = req.body.itemname;
        const hasdesc = req.body.hasdesc;
        const itemdescription = req.body.itemdescription;
        const price = req.body.price;
        const categoryid = req.body.categoryid;
        const foodimg = req.body.foodimage;

        const addItem = await pool.query("INSERT INTO menu (itemname, hasdesc, itemdescription, foodimage, price, categoryid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING fooditemid", [
            itemname, hasdesc, itemdescription, foodimg, price, categoryid
        ]);

        const fooditemid = addItem.rows[0].fooditemid;

        res.json({
            fooditemid:fooditemid,
            success:true
        })

    } catch (error) {
        console.error(error);
    }
}) 

//Delete menu item
app.delete('/admin/CMS/menu/menu-item/:id', protect, async(req, res) => {

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
app.put('/admin/CMS/about/:id', protect, async(req,res) => {

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
app.post('/admin/CMS/contact', formLimiter, async(req,res) => {

    try {

        const honeypot = req.body.honeypot;
        const timetaken = Number(req.body.timetaken);

        if (honeypot && honeypot.trim().length > 0) {
            console.log("Bot detected: honeypot filled");
            return res.status(400).json({ success: false, message: "Submission failed" });
        }

        if (!isNaN(timetaken) && timetaken < 2000) {
            console.log("Bot detected: submitted too fast", timetaken);
            return res.status(400).json({ success: false, message: "Submission failed" });
        }
        
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
app.get('/admin/CMS/contact/new', protect, async(req, res) => {

    try {
        
        const getNewQueries = await pool.query("SELECT * FROM contact WHERE status='new'");

        res.json(getNewQueries.rows);

    } catch (error) {
        console.error(error);
    }
})

//Get completed contact queries
app.get('/admin/CMS/contact/complete', protect, async(req, res) => {

    try {
        
        const getNewQueries = await pool.query("SELECT * FROM contact WHERE status='complete'");

        res.json(getNewQueries.rows);

    } catch (error) {
        console.error(error);
    }
})

//Mark new contact queries as complete
app.put('/admin/CMS/contact/new/:id', protect, async(req, res) => {

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
app.put('/admin/CMS/contact/complete/:id', protect, async(req, res) => {

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
app.delete('/admin/CMS/contact/:id', protect, async(req,res) => {

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
app.post('/admin/booking', formLimiter, async(req,res) => {

    try {

        const honeypot = req.body.honeypot;
        const timetaken = Number(req.body.timetaken);

        if (honeypot && honeypot.trim().length > 0) {
            console.log("Bot detected: honeypot filled");
            return res.status(400).json({ success: false, message: "Submission failed" });
        }

        
        if (!isNaN(timetaken) && timetaken < 2000) {
            console.log("Bot detected: submitted too fast", timetaken);
            return res.status(400).json({ success: false, message: "Submission failed" });
        }

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
app.get('/admin/CMS/bookings/new', protect, async(req,res) => {

    try {
        
        const getNewRes = await pool.query("SELECT * FROM bookings WHERE status='new'");
        res.json(getNewRes.rows);

    } catch (error) {
        console.error(error);
    }
})

//Get completed booking reservations
app.get('/admin/CMS/bookings/complete', protect, async(req,res) => {

    try {
        
        const getNewRes = await pool.query("SELECT * FROM bookings WHERE status='complete'");
        res.json(getNewRes.rows);

    } catch (error) {
        console.error(error);
    }
})

//Mark new reservations as complete
app.put('/admin/CMS/bookings/new/:id', protect, async(req, res) => {

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
app.put('/admin/CMS/bookings/complete/:id', protect,async(req, res) => {

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
app.put('/admin/CMS/bookings/:id', protect,async(req,res) => {

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

//Delete booking
app.delete('/admin/CMS/bookings/:id', protect, async(req,res) => {

    try {
        
        const id = req.params.id;

        const deleteItem = await pool.query("DELETE FROM bookings WHERE bookingid=$1", [id]);

        res.json("success");

    } catch (error) {
        console.error(error);
    }
})

//Add franchise query
app.post('/franchise', formLimiter, async(req,res) => {

    try {

        const honeypot = req.body.honeypot;
        const timetaken = Number(req.body.timetaken);

        if (honeypot && honeypot.trim().length > 0) {
            console.log("Bot detected: honeypot filled");
            return res.status(400).json({ success: false, message: "Submission failed" });
        }
        
        if (!isNaN(timetaken) && timetaken < 2000) {
            console.log("Bot detected: submitted too fast", timetaken);
            return res.status(400).json({ success: false, message: "Submission failed" });
        }

        const name = req.body.name;
        const email = req.body.email;
        const city = req.body.city;
        const phonenumber = req.body.phonenumber;
        const investmentinterest = req.body.investmentinterest;
        const message = req.body.message;
        const datetime = req.body.datetime;
        const status = req.body.status;

        const addFranchise = await pool.query("INSERT INTO franchise (name, email, city, phonenumber, investmentinterest, message, datetime, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)", [
            name, email, city, phonenumber, investmentinterest, message, datetime, status
        ]);

        res.json("success");
        
    } catch (error) {
        console.error(error);
    }
})

//Get new franchise requests
app.get('/admin/CMS/franchise/new', protect, async(req,res) => {

    try {

        const getNewFranchiseRequests = await pool.query("SELECT * FROM franchise WHERE status='new'");

        res.json(getNewFranchiseRequests.rows);
        
    } catch (error) {
        console.error(error);
    }
})

//Get complete franchise requests
app.get('/admin/CMS/franchise/complete', protect, async(req,res) => {

    try {

        const getNewFranchiseRequests = await pool.query("SELECT * FROM franchise WHERE status='complete'");

        res.json(getNewFranchiseRequests.rows);
        
    } catch (error) {
        console.error(error);
    }
})

//Mark new franchise requests as complete
app.put('/admin/CMS/franchise/new/:id', protect, async(req,res) => {
    
    try {

        const id = req.params.id;

        const markComplete = await pool.query("UPDATE franchise SET status='complete' WHERE franchiseid = $1", [
            id
        ])

        res.json("success");
        
    } catch (error) {
        console.error(error);
    }
})

//Mark complete franchise requests as new
app.put('/admin/CMS/franchise/complete/:id', protect, async(req,res) => {
    
    try {

        const id = req.params.id;

        const markNew = await pool.query("UPDATE franchise SET status='new' WHERE franchiseid = $1", [
            id
        ])

        res.json("success");
        
    } catch (error) {
        console.error(error);
    }
})

//Delete franchise request
app.delete('/admin/CMS/franchise/:id', protect, async(req,res) => {

    try {

        const id = req.params.id;

        const deleteItem = await pool.query("DELETE FROM franchise WHERE franchiseid = $1", [
            id
        ])

        res.json("Success");
        
    } catch (error) {
        console.error(error);
    }
})

//upload an image for a new menu item
app.post("/upload/menu/item/new/:id", protect,upload.single("my_file"), async (req, res) => {
  try {

    const cat = req.body.category;
    const itemid = req.params.id;
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI, {
        folder: `menuitems/${cat}`,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    });

    const url = cldRes.secure_url;

    const uploadImage = await pool.query(
        "UPDATE menu SET foodimage=$1 WHERE fooditemid=$2",
        [url, itemid]
    );

    res.json(cldRes);

  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});

//replace image of existing menu item
app.post("/upload/menu/item/:id", protect, upload.single("my_file"), async (req, res) => {
  try {
    const itemid = req.params.id;
    const oldUrl = req.body.curr_image;

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI, {
        folder: "menuitems",
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    });
    const url = cldRes.secure_url;

    await pool.query(
        "UPDATE menu SET foodimage=$1 WHERE fooditemid=$2",
        [url, itemid]
    );

    if (oldUrl && oldUrl !== url && !oldUrl.includes("placeholder")) {
        const publicId = getPublicIdFromUrl(oldUrl);
        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }
    }

    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({ message: error.message });
  }
});

//delete menu item image
app.delete('/delete/menu/item', protect, async(req,res) => {

    try {

        const imageURL = req.body.curr_image;

        const publicId = getPublicIdFromUrl(imageURL);

        if (publicId && !imageURL.includes("placeholder")) {
            await cloudinary.uploader.destroy(publicId);
        }

        res.json()
        
    } catch (error) {
        console.error(error);
    }
})

//create category folder
app.post('/create/menu/category/folder/:cat', protect, async(req,res) => {

    try {
        
        const cat = req.params.cat;

        const response = await cloudinary.api.create_folder(`/menuitems/${cat}`);

        res.json("success");

    } catch (error) {
        console.error(error);
    }
})

//edit category folder name
app.put('/edit/menu/category/folder/:cat', protect, async(req,res) => {
    try {
        const oldCat = req.params.cat;
        const newCat = req.body.newcat;

        const result = await cloudinary.api.rename_folder(`menuitems/${oldCat}`, `menuitems/${newCat}`);

        res.json('success');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });  // always send something
    }
})

//delete category folder
app.delete('/edit/menu/category/folder/:cat',protect, async(req,res) => {

    try {

        const cat = req.params.cat;
        
        await cloudinary.api.delete_resources_by_prefix(`/menuitems/${cat}`);
        await cloudinary.api.delete_folder(`/menuitems/${cat}`);

        res.json('success')

    } catch (error) {
        console.error(error);
    }
})

//get gallery images
app.get('/gallery', async(req,res) => {

    try {

        const getGallery = await pool.query("SELECT * FROM galleryimages");

        res.json(getGallery.rows);
        
    } catch (error) {
        console.error(error);
    }
})

//add and upload gallery image
app.post('/upload/gallery/image', protect,upload.single("my_file"), async(req,res) => {

    try {

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI, {
            folder: `gallery`,
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        });

        const url = cldRes.secure_url;

        const uploadImage = await pool.query(
            "INSERT INTO galleryimages (URL) VALUES ($1)",
            [url]
        );

        res.json(cldRes);
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }


})

//delete gallery image
app.delete('/delete/gallery/image/:id',protect, async(req,res) => {

    try {

        const imageURL = req.body.image;
        const imageid = req.params.id;
        const publicId = getPublicIdFromUrl(imageURL);

        if (publicId && !imageURL.includes("placeholder")) {
            await cloudinary.uploader.destroy(publicId);
        }

        const deleteImage = await pool.query("DELETE FROM galleryimages WHERE imageid=$1", [
            imageid
        ]);



        res.json("success");
        
    } catch (error) {
        console.error(error);
    }
})

//upload coming soon image
app.post('/upload/comingsoon/image/:id',protect, upload.single("my_file"), async (req,res) => {

    
    try {

        const id = req.params.id;

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI, {
            folder: `comingsoon`,
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        });

        const url = cldRes.secure_url;

        const uploadImage = await pool.query(
            "UPDATE comingsoon SET imageURL = $1 WHERE csid= $2",
            [url, id]
        );

        res.json(cldRes);
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }


})

//add coming soon item
app.post('/admin/CMS/locations/coming-soon',protect, async(req,res) => {

    try {

        const location = req.body.location;
        const imageURL = req.body.imageURL;

        const addCS = await pool.query("INSERT INTO comingsoon (location, imageURL) VALUES ($1, $2) RETURNING csid", [
            location, imageURL
        ]);

        const csid = addCS.rows[0].csid;

        res.json({
            csid:csid,
            success:true
        });
        
    } catch (error) {
        console.error(error);
    }
})

//Get coming soon locations
app.get('/coming-soon', async(req,res) => {

    try {
        
        const getCS = await pool.query("SELECT * FROM comingsoon");

        res.json(getCS.rows);

    } catch (error) {
        console.error(error);
    }
})

//Replace coming soon location name
app.put('/admin/CMS/locations/coming-soon/:id',protect, async(req,res) => {

    try {
        
        const csid = req.params.id;

        const name = req.body.location;

        const updateItem = await pool.query("UPDATE comingsoon SET location = $1 WHERE csid = $2", [
            name, csid
        ])

    } catch (error) {
        console.error(error);
    }
})

//Update coming soon location image
app.post('/replace/comingsoon/image/:id', protect, upload.single("my_file"), async (req,res) => {

    
    try {

        const id = req.params.id;

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI, {
            folder: `comingsoon`,
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        });

        const url = cldRes.secure_url;

        const uploadImage = await pool.query(
            "UPDATE comingsoon SET imageURL = $1 WHERE csid= $2",
            [url, id]
        );

        const oldUrl = req.body.curr_image;

        if (oldUrl && oldUrl !== url) {
            const publicId = getPublicIdFromUrl(oldUrl);
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
        }

        res.json(cldRes);
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }


})

//delete coming soon location image
app.delete('/delete/comingsoon/image/:id', protect, async(req,res) => {

    try {

        const imageURL = req.body.image;
        const csid = req.params.id;
        const publicId = getPublicIdFromUrl(imageURL);

        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }

        const deleteImage = await pool.query("DELETE FROM comingsoon WHERE csid=$1", [
            csid
        ]);

        res.json("success");
        
    } catch (error) {
        console.error(error);
    }
})

//get locations
app.get('/locations', async(req,res) => {

    try {

        const getLocations = await pool.query("SELECT * FROM locations ORDER BY locationid ASC");

        res.json(getLocations.rows);
        
    } catch (error) {
        console.error(error);
    }
})

//update location
app.put('/admin/CMS/locations/update/:id',protect, async(req,res) => {

    try {


        const id = req.params.id;

        const locationname = req.body.locationname;
        const closeddays = req.body.closeddays;
        const opentime = req.body.opentime;
        const closetime = req.body.closetime;
        const directions = req.body.directions;
        const openingtext = req.body.openingtext;
        const image = req.body.image;
        const parking = req.body.parking;
        const is24hrs = req.body.is24hrs;
        const description = req.body.description;
        const address = req.body.address;
        const phonenumber = req.body.phonenumber;

        const updateItem = await pool.query("UPDATE locations SET locationname = $1, closeddays = $2, opentime = $3, closetime = $4, directions = $5, image = $6, openingtext = $7, parking = $8, is24hrs = $9, description = $10, address = $11, phonenumber = $12 WHERE locationid = $13", [
            locationname, closeddays, opentime, closetime, directions, image, openingtext, parking, is24hrs, description, address, phonenumber, id
        ])

        res.json("success");
        
    } catch (error) {
        
        console.error(error);
    }
})

//replace location image
app.put('/admin/CMS/locations/update-image/:id',protect, upload.single("my_file"), async(req,res) => {

    try {

        const id = req.params.id;

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI, {
            folder: `locations`,
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        });

        const url = cldRes.secure_url;

        const uploadImage = await pool.query(
            "UPDATE locations SET image = $1 WHERE locationid = $2",
            [url, id]
        );

        const oldUrl = req.body.curr_image;

        if (oldUrl && oldUrl !== url) {
            const publicId = getPublicIdFromUrl(oldUrl);
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
        }

        res.json(cldRes);
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
})

//add location
app.post('/admin/CMS/locations', protect,async(req,res) => {

    try {

        const locationname = req.body.locationname;
        const closeddays = req.body.closeddays;
        const opentime = req.body.opentime;
        const closetime = req.body.closetime;
        const directions = req.body.directions;
        const openingtext = req.body.openingtext;
        const parking = req.body.parking;
        const image = req.body.image;
        const is24hrs = req.body.is24hrs;
        const description = req.body.description;
        const address = req.body.address;
        const phonenumber = req.body.phonenumber;

        const addLocation = await pool.query("INSERT INTO locations (locationname, closeddays, opentime, closetime, directions, parking, image, openingtext, ismainbranch, is24hrs, description, address, phonenumber) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING locationid", [
            locationname, closeddays, opentime, closetime, directions, parking, image, openingtext, false, is24hrs, description, address, phonenumber
        ])

        res.json(addLocation.rows[0].locationid);
        
    } catch (error) {
        console.error(error);
        
    }
})

//upload location image
app.post('/admin/CMS/locations/upload-image/:id', protect,upload.single("my_file"), async(req,res) => {

    try {

        const id = req.params.id;

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI, {
            folder: `locations`,
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        });

        const url = cldRes.secure_url;

        const uploadImage = await pool.query(
            "UPDATE locations SET image = $1 WHERE locationid = $2",
            [url, id]
        );

        res.json(cldRes);

    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
})

//delete location and image
app.delete('/admin/CMS/locations/delete/:id',protect, async(req,res) => {

    try {

        const id = req.params.id;
        const image = req.body.image;

        const publicId = getPublicIdFromUrl(image);

        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }

        const deleteBookings = await pool.query("DELETE FROM bookings WHERE locationid = $1", [
            id
        ]);

        const deleteLocation = await pool.query("DELETE FROM locations WHERE locationid = $1", [
            id
        ]);


        res.json("success");
        
    } catch (error) {
        console.error(error);
    }
})

//get home story
app.get('/homestory', async(req,res) => {

    try {

        const getHomeStory = await pool.query("SELECT * FROM generaldetails WHERE type = 'Home About'");
        
        res.json(getHomeStory.rows[0]);
        
    } catch (error) {
        console.error(error);
    }
}) 

//update home story
app.put('/admin/CMS/general-details/homestory', async(req,res) => {
    try {

        const newVal = req.body.newval;

        const updateHomeStory = await pool.query("UPDATE generaldetails SET val = $1 WHERE label=$2", [
            newVal, 'Our Story'
        ]);

        res.json("success")
        
    } catch (error) {
        console.error(error);
    }
})

//get testimonials
app.get("/testimonials", async(req,res) => {

    try {

        const getTestimonials = await pool.query("SELECT * FROM testimonials");
        res.json(getTestimonials.rows)
        
    } catch (error) {
        console.error(error);
    }
})

//update testimonial
app.put('/admin/CMS/testimonials/update-testimonial/:id', protect, async(req,res) => {

    try {

        const id = req.params.id;
        const username = req.body.username;
        const rating = req.body.rating;
        const testimonial = req.body.testimonial;

        const updateTest = await pool.query("UPDATE testimonials SET username=$1, testimonial=$2, rating=$3 WHERE testimonialid=$4", [
            username, testimonial, rating, id
        ])

        res.json("success");
        
    } catch (error) {
        console.error(error);
    }
})

//replace or upload testimonial profile picture
app.put("/upload/testimonials/:id", protect, upload.single("my_file"), async (req, res) => {
  try {

    const itemid = req.params.id;
    const oldUrl = req.body.curr_image;

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI, {
        folder: "testimonials",
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    });
    const url = cldRes.secure_url;

    await pool.query(
        "UPDATE testimonials SET image=$1 WHERE testimonialid=$2",
        [url, itemid]
    );

    if (oldUrl && oldUrl !== url && !oldUrl.includes("placeholder")) {
        const publicId = getPublicIdFromUrl(oldUrl);
        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }
    }

    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({ message: error.message });
  }
});

//add testimonial
app.post('/admin/CMS/testimonials', protect, async(req,res) => {

    try {

        const username = req.body.username;
        const testimonial = req.body.testimonial;
        const image = req.body.image;
        const rating = req.body.rating;

        const addTest = await pool.query("INSERT INTO testimonials (username, testimonial, image, rating) VALUES ($1,$2,$3,$4) RETURNING testimonialid", [
            username, testimonial, image, rating
        ])

        const testimonialid = addTest.rows[0].testimonialid;

        res.json({
            testimonialid:testimonialid,
            success:true
        })
        
    } catch (error) {
        console.error(error);
    }
})

app.delete('/admin/CMS/testimonials/:id', protect, async(req,res) => {

    try {

        const imageURL = req.body.curr_image;

        const publicId = getPublicIdFromUrl(imageURL);

        if (publicId && !imageURL.includes("placeholder")) {
            await cloudinary.uploader.destroy(publicId);
        }

        const id = req.params.id;

        const deleteItem = await pool.query("DELETE FROM testimonials WHERE testimonialid=$1", [
            id
        ])

        res.json("success")
        
    } catch (error) {
        console.error(error);
    }
})



app.listen(5000);
// module.exports = app;