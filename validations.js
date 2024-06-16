import {body} from "express-validator"

export const loginValidator = [
    body('email', "Неверный формат почты").isEmail(),
    body('fullName', "Имя пользователя от 2 символов").isLength({min: 2}),
]

export const registerValidator = [
    body('email', "Неверный формат почты").isEmail(),
    body('fullName', "Имя пользователя от 2 символов").isLength({min: 2}),
    body('password', "Пароль от 6 символов").isLength({min: 6}),
    body('avatarUrl', "Неверный формат ссылки").optional().isURL(),
]

export const createPostValidator = [
    body('title', "Неверный формат почты").isLength({min: 2}).isString(),
    body('text', "Имя пользователя от 2 символов").isLength({min: 2}).isString(),
    body('tags', "Пароль от 6 символов").optional().isString(),
    body('imageUrl', "Неверный формат ссылки").optional().isURL(),
]