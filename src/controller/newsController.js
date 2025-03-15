const axios = require("axios");
const NewsModel = require("../models/NewsModel");

const NEWS_API_URL = process.env.NEWS_API_URL;
const SEARCH_KEYWORDS = ["bus", "transport", "public transport", "traffic", "road"];

exports.fetchAndStoreNews = async (req, res) => {
    try {
        const response = await axios.get(NEWS_API_URL);
        const articles = response.data.results;

        if (!articles) {
            return res.status(404).json({ message: "No news articles found" });
        }

        // Filter only relevant bus transport news
        const filteredNews = articles.filter(article => 
            SEARCH_KEYWORDS.some(keyword =>
                article.title?.toLowerCase().includes(keyword) ||
                article.description?.toLowerCase().includes(keyword)
            )
        );

        if (filteredNews.length === 0) {
            return res.status(200).json({ message: "No relevant transport news found" });
        }

        // Store news in MongoDB (Prevent duplicates)
        for (const news of filteredNews) {
            const exists = await NewsModel.findOne({ link: news.link });
            if (!exists) {
                await NewsModel.create({
                    title: news.title,
                    description: news.description || "No description available",
                    link: news.link,
                    publishedDate: news.pubDate || new Date(),
                    source: news.source_id || "Unknown",
                });
            }
        }

        res.status(201).json({ message: "News updated successfully", news: filteredNews });
    } catch (error) {
        res.status(500).json({ message: "Error fetching news", error: error.message });
    }
};

// Get all stored transport news
exports.getStoredNews = async (req, res) => {
    try {
        const news = await NewsModel.find().sort({ publishedDate: -1 });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving news", error: error.message });
    }
};
