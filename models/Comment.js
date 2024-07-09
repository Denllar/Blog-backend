import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        unique: false
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model("Comment", CommentSchema);