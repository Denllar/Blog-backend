import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import UserModel from "../models/User.js"
import { validationResult } from "express-validator"

export const login = async (req, res)=>{
    try {
        const isValidEmail = await UserModel.findOne({email: req.body.email});
        if (!isValidEmail){
            return res.status(404).json({
                message: "Пользователь не найден",
            })
        }

        const isFindPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isFindPassword){
            return res.status(400).json({
                message: "Неверный логин или пароль",
            })
        }

        const {passwordHash, ...userData} = user._doc;
        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d'
            }
        )

        res.json({
            token,
            ...userData,
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось авторизоваться"
        })
    }
}

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);


        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        })

        const user = await doc.save()

        const {passwordHash, ...userData} = user._doc;
        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d'
            }
        )

        res.json({
            token,
            ...userData,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось зарегистрироваться"
        })
    }
}

export const getMe = async (req, res)=>{
    try {
        const user = await UserModel.findById(req.userId);
        if (!user){
            return res.status(404).json({
                message: "Нет такого пользователя"
            })
        }
        const {passwordHash, ...userData} = user._doc;
        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d'
            }
        )

        res.json({
            token,
            ...userData,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Нет доступа"
        })
    }
}