import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/err.js"
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            country: req.body.country,
            img: req.body.img,
            city: req.body.city,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
        })
        const user = await newUser.save();
        res.status(200).json(user).send("User has been created.")
    } catch (error) {
        next(error)
    }
};


export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if(!user)
        return next(createError(404, "User not found"));
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect)
        return next(createError(400, "Wrong password or username"));
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, "epukhanet", {expiresIn: "30m"});
        const {password, isAdmin, ...other} = user._doc;
        res.cookie("access_token", token, {sameSite: 'None', secure:  true , httpOnly: true}).status(200).json({ details: {...other}, isAdmin});
    } catch (error) {
        next(error)
    }
};