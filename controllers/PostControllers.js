import PostModel from "../models/Post.js"

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().exec();
        const tags = posts.map(obj => obj.tags).flat();
        const uniqueTags = tags.filter((el, ind) => ind === tags.indexOf(el))
        res.json(uniqueTags)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить теги"
        })
    }
}

export const createPost = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId
        })

        const post = await doc.save();
        res.json(post)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось создать  статью"
        })
    }
}

export const getAllPosts = async (req, res) => {
    try {

        const posts = await PostModel.find(req.body.tag && { tags: req.body.tag }).sort(req.body.toggle == 0 ? { createdAt: -1 } : { viewsCount: -1 }).populate({
            path: 'user',
            select: ['fullName', 'avatarUrl']
        })

        res.json(posts)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить статьи"
        })
    }
}

export const getOnePost = async (req, res) => {
    try {
        PostModel.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $inc: { viewsCount: 1 }
            },
            {
                returnDocument: "After"
            }
        )
            .populate('user')
            .then(doc => res.json(doc))
            .catch(err => res.status(500).json({
                message: "Статья не найдена"
            }))

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить статью"
        })
    }
}

export const removePost = async (req, res) => {
    try {
        PostModel.findOneAndDelete(
            {
                _id: req.params.id
            },
        )
            .then(doc => res.json(doc))
            .catch(err => res.status(500).json({
                message: "Статья не найдена"
            }))

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить статью"
        })
    }
}

export const updatePost = async (req, res) => {
    try {
        await PostModel.updateOne(
            {
                _id: req.params.id
            },
            {
                title: req.body.title,
                text: req.body.text,
                tags: req.body.tags,
                imageUrl: req.body.imageUrl,
                user: req.userId
            }
        )
        res.json({
            success: true
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось обновить статью"
        })
    }
}

