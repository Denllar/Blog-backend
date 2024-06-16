import PostModal from "../models/Post"

export const createPost = async (req, res) => {
    try {
        const doc = new PostModal({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId
        })

        const post = await doc.save();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось создать  статью"
        })
    }
}