import CommentModel from "../models/Comment.js"
import PostModel from "../models/Post.js"


export const createComment = async (req, res) => {
    try {
        const doc = new CommentModel({
            text: req.body.text,
            user: req.userId,
            postId: req.body.id
        })

        const comment = await doc.save();


        PostModel.findOneAndUpdate(
            {
                _id: req.body.id
            },
            {
                $inc: { commentsCount: 1 }
            },
            {
                returnDocument: "After"
            }
        )
            .populate('user')
            .then(doc => res.json({
                doc,
                comment
            }))
            .catch(err => res.status(500).json({
                message: "Ошибка"
            }))

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось написать комментарий"
        })
    }
}

export const getComment = async (req, res) => {
    try {
        const comments = await CommentModel.find({ postId: req.params.id }).populate({
            path: 'user',
            select: ['fullName', 'avatarUrl']
        })


        res.json(comments)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить комментарии"
        })
    }
}


export const removeComment = async (req, res) => {
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

export const updateComment = async (req, res) => {
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

