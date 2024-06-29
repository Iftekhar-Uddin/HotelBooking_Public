import express from "express";
import {updateUser, deleteUser, getUser, getAllUser} from "../controllers/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next)=>{
//     res.send("hello user, you are authenticated!")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next)=>{
//     res.send("hello user, you are loged in and you can also delete your account!")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=>{
//     res.send("hello user, you are loged in and you can delete all accounts!")
// })

// router.put("/:id", verifyUser, updateUser);

// router.delete("/:id", verifyUser, deleteUser);

// router.get("/:id", verifyUser, getUser);

// router.get("/", verifyAdmin, getAllUser);


router.put("/:id",  updateUser);

router.delete("/:id", deleteUser);

router.get("/:id", getUser);

router.get("/", getAllUser);

export default router;