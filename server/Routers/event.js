const express = require("express");
const router = express.Router();

const {protect,admin} = require('../Middleware/auth')
const { upload } = require('../Utils/cloudinary');

const  { getAllEvents,
    getEventbyId,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../Controllers/event.controller')

router.get('/',getAllEvents);


router.get("/:id",getEventbyId);

router.post("/",protect,admin,upload.single('image'),createEvent);

router.put('/:id',protect,admin,upload.single('image'),updateEvent);

router.delete("/:id",protect,admin,deleteEvent);


module.exports  = router;