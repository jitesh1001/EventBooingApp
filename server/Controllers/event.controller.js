const Event = require("../Models/Event.model")

const getAllEvents  = async (req,res) => {
    try{
        const filters = {};
        if(req.query.category){
            filters.category  = req.query.category;
        }


        if(req.query.location){
            filters.location = req.query.location;
        }

        const events = await Event.find(filters);
        res.json(events);

    }catch(err){
          res.status(500).json({
            error : err.message
          })
    }
}


const getEventbyId = async (req,res) => {
    try{
        const event = await Event.findById(req.params.id)
        if(!event){
            return res.status(404).json({
                message : "Event no found"
            })
        }

        res.json(event)
    }catch(err){
        return res.status(500).json({
            error : "Error"
        })
    }
}


const createEvent = async(req,res) => {
    const {title, description, date, location,category, totalSeats, availableSeats,ticketPrice} = req.body
    const imageUrl = req.file?.path
    try{

        const event = await Event.create({
            title, 
            description, 
            date, 
            location,
            category, 
            totalSeats, 
            availableSeats,
            ticketPrice, 
            imageUrl : imageUrl, 
            createdBy : req.user._id
        });
        res.status(201).json(event)
    }catch(err){
        res.status(500).json({
            error : err.message
        })
    }
    
}


const updateEvent = async(req,res) => {
    try{
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new : true
            }
        )


        if(!event){
            return res.status(404).json({
                error : "event not found"
            })
        }

        res.json(event);
    }catch(err){
        return res.status(500).json({
            error : err.message
        })
    }
}


const deleteEvent = async(req,res) => {
    try{

        const event = await Event.findByIdAndDelete(req.params.id)
        if(!event){
            res.status(404).json({
                message : " event not found"
            })
        }

        res.json({
              message :  "event deleted successfully"
        })

    }catch(err){
        return res.status(500).json({
            error : err.message
        })
    }
}


module.exports = { getAllEvents,
    getEventbyId,
    createEvent,
    updateEvent,
    deleteEvent
}
