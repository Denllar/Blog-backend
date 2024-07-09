import express from "express"
import multer from "multer"
import mongoose from "mongoose"
import cors from "cors"
import fs from 'fs';

import { loginValidator, registerValidator, createPostValidator, createCommentValidator } from "./validations.js"
import checkAuth from "./utils/checkAuth.js"
import handleValidationErrors from "./utils/handleValidationErrors.js"

import * as UserControllers from "./controllers/UserControllers.js"
import * as PostControllers from "./controllers/PostControllers.js"
import * as CommentControllers from "./controllers/CommentControllers.js"

mongoose.connect('mongodb+srv://admin:f1J3ArhW@fullstackproject.auf0x6r.mongodb.net/blog?retryWrites=true&w=majority&appName=FullStackProject')
    .then(() => console.log("DB ok"))
    .catch(() => console.log("DB error"))

const app = express();
app.use(express.json());
app.use(cors())

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});



app.post('/auth/login', loginValidator, handleValidationErrors, UserControllers.login)
app.post('/auth/register', registerValidator, handleValidationErrors, UserControllers.register)
app.get('/auth/me', checkAuth, UserControllers.getMe)

app.get('/tags', PostControllers.getLastTags)

app.post('/posts', PostControllers.getAllPosts)
app.get('/posts/:id', PostControllers.getOnePost)
app.post('/posts/create', checkAuth, createPostValidator, handleValidationErrors, PostControllers.createPost)
app.patch('/posts/:id/edit', checkAuth, createPostValidator, handleValidationErrors, PostControllers.updatePost)
app.delete('/posts/:id', checkAuth, PostControllers.removePost)


app.post('/comments', checkAuth, createCommentValidator, CommentControllers.createComment)
app.get('/comments/:id', checkAuth, CommentControllers.getComment)
app.patch('/comments/:id/edit', checkAuth, createCommentValidator, CommentControllers.updateComment)
app.delete('/comments/:id', checkAuth, CommentControllers.removeComment)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    return console.log("Success!");
})