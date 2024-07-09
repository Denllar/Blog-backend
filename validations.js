import {body} from "express-validator"

export const loginValidator = [
    body('email', "Неверный формат почты").isEmail(),
    body('password', "Пароль от 6 символов").isLength({min: 6}),
]

export const registerValidator = [
    body('email', "Неверный формат почты").isEmail(),
    body('fullName', "Имя пользователя от 2 символов").isLength({min: 2}),
    body('password', "Пароль от 6 символов").isLength({min: 6}),
    body('avatarUrl', "Неверный формат ссылки").optional().isString(),
]

export const createPostValidator = [
    body('title', "Неверное имя поста").isLength({min: 2}).isString(),
    body('text', "Неверный текст поста").isLength({min: 2}).isString(),
    body('tags', "Невереные теги поста").optional().isArray(),
    body('imageUrl', "Неверный формат ссылки").optional().isString(),
]

export const createCommentValidator = [
    body('text', "Неверный текст комментария").isString(),
]