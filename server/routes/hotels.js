import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getAllHotel, hotel, getHotelRooms, updateHotel } from "../controllers/hotel.js";
// import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.post("/", verifyAdmin, createHotel);

// router.put("/:id", verifyAdmin, updateHotel);

// router.delete("/:id", verifyAdmin, deleteHotel);

router.post("/", createHotel);

router.put("/:id", updateHotel);

router.delete("/:id", deleteHotel);

router.get("/find/:id", getHotel);

router.get("/", getAllHotel);

router.get("/search", hotel);

router.get("/countByCity", countByCity);

// router.get("/findByRoom", findByRoom);

router.get("/countByType", countByType);

router.get("/room/:id", getHotelRooms);

export default router;










































// router.get("/", async (req, res, next)=>{

//     // const failed = true;

//     // if(failed) return next(createError(401, "You are not authenticated!"));

//     try {
//         const hotels = await Hotel.find()
//         res.status(200).json(hotels);
//     } catch (error) {
//         next(error);
//     }
// });