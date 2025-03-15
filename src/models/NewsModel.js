import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: { 
        type: String, 
        required: true 
    },
    publishedDate: {
        type: Date, 
        required: true 
    },
    source: { 
        type: String, 
        required: true 
    },
});

const NewsModel = mongoose.model("News", newsSchema);
export default NewsModel;
