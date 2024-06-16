import express from "express"
import mongoose from "mongoose"
import { loginValidator, registerValidator, createPostValidator } from "./validations.js"
import checkAuth from "./utils/checkAuth.js"

import * as UserControllers from "./controllers/UserControllers.js"
import * as PostControllers from "./controllers/PostControllers.js"


mongoose.connect('mongodb+srv://admin:f1J3ArhW@fullstackproject.auf0x6r.mongodb.net/blog?retryWrites=true&w=majority&appName=FullStackProject')
    .then(() => console.log("DB ok"))
    .catch(() => console.log("DB error"))

const app = express();
app.use(express.json());

app.post('/auth/login', loginValidator, UserControllers.login)
app.post('/auth/register', registerValidator, UserControllers.register)
app.get('/auth/me', checkAuth, UserControllers.getMe)

// app.get('/posts', PostControllers.getAll)
// app.get('/posts/:id', PostControllers.getOne)
app.post('/posts', PostControllers.create)
// app.patch('/posts/:id', PostControllers.update)
// app.delete('/posts/:id', PostControllers.remove)


app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    return console.log("Success!");
})




