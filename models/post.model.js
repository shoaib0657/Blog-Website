import { Schema, model } from 'mongoose'

export const postSchema = new Schema({
    title: String,
    content: String
});

export const PostModel = model("Post", postSchema)