import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        next(error)
    }
}


export const updateHotel = async (req, res, next) => {

    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updateHotel);
    } catch (error) {
        next(error)
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted Successfully");
    } catch (error) {
        next(error)
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel);
    } catch (error) {
        next(error)
    }
}

export const getAllHotel = async (req, res, next) => {
    try {
        const hotel =  await Hotel.find();
        return res.status(200).json(hotel)
    } catch (error) {
        next(err);
    }
}


export const hotel = async (req,res,next) =>  {
    try {
        const {limit, min, max, city, ...others} = req.query;
        const regex = new RegExp(city, 'i', 'g') 

        const hotels = await Hotel.find({...others, $and : [ {city : regex}, {cheapestPrice:{$gte: min, $lte: max}} ]  });
        return res.status(200).json(hotels);



    } catch (err) {
        next(err);
    }
}


export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city: city})
        }))
        res.status(200).json(list);
    } catch (error) {
        next(error)
    }
}


// export const findByRoom = async (req, res, next) => {
//     const room_id = req.query.id
//     try {
//         const hotel = await Hotel.find(Hotel.rooms.map((id)=> id === room_id));
//         res.status(200).json(hotel);
//     } catch (error) {
//         next(error)
//     }
// }


export const countByType = async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "cabin" });
  
      res.status(200).json([
        { type: "hotels", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount },
      ]);
    } catch (error) {
      next(error);
    }
};

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map(room => {
            return Room.findById(room)
        }));
        res.status(200).json(list);
    } catch (error) {
        next(error)
    }
};
