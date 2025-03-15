const axios = require("axios");
const NewsModel = require("../models/NewsModel");

const API_KEY = "pub_7471864d07fe62f409771941fa9a1c5e9cadd";
const BASE_URL = "https://newsdata.io/api/1/news";
const SEARCH_KEYWORDS = ["bus", "transport", "traffic", "road"];
const COUNTRY = "us"; // Sri Lanka
const LANGUAGE = "en"; // English

exports.fetchAndStoreNews = async (req, res) => {
    try {
        const keywordQuery = SEARCH_KEYWORDS.join("%20OR%20"); // Formats query for API
        const NEWS_API_URL = `${BASE_URL}?apikey=${API_KEY}&q=${keywordQuery}&country=${COUNTRY}&language=${LANGUAGE}`;

        const response = await axios.get(NEWS_API_URL);
        const articles = response.data.results;

        if (!articles || articles.length === 0) {
            return res.status(404).json({ message: "No relevant news articles found" });
        }

        // Store only unique news articles in MongoDB
        for (const article of articles) {
            const exists = await NewsModel.findOne({ link: article.link });
            if (!exists) {
                await NewsModel.create({
                    title: article.title,
                    description: article.description || "No description available",
                    link: article.link,
                    publishedDate: article.pubDate || new Date(),
                    source: article.source_id || "Unknown",
                });
            }
        }

        res.status(201).json({ message: "News updated successfully", news: articles });
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ message: "Error fetching news", error: error.message });
    }
};

// Get stored transport news
exports.getStoredNews = async (req, res) => {
    try {
        const news = await NewsModel.find().sort({ publishedDate: -1 });
        res.status(200).json(news);
    } catch (error) {
        console.error("Error retrieving news:", error);
        res.status(500).json({ message: "Error retrieving news", error: error.message });
    }
};






// const axios = require("axios");
// const NewsModel = require("../models/NewsModel");

// const RAPID_API_URL = "https://latest-sri-lankan-news.p.rapidapi.com/latest-news/bbcsinhala";
// const RAPID_API_KEY = "759387168amshe1e5720940da9e9p1b8f20jsnb2252f0b4cff"; // Replace with environment variable in production
// const SEARCH_KEYWORDS = ["bus", "transport", "traffic", "road"];

// exports.fetchAndStoreNews = async (req, res) => {
//     try {
//         const response = await axios.get(RAPID_API_URL, {
//             headers: {
//                 "x-rapidapi-key": RAPID_API_KEY,
//                 "x-rapidapi-host": "latest-sri-lankan-news.p.rapidapi.com"
//             }
//         });

//         const articles = response.data;

//         if (!articles || articles.length === 0) {
//             return res.status(404).json({ message: "No news articles found" });
//         }

//         // Filter only relevant transport-related news
//         const filteredNews = articles.filter(article =>
//             SEARCH_KEYWORDS.some(keyword =>
//                 article.title?.toLowerCase().includes(keyword) ||
//                 article.description?.toLowerCase().includes(keyword)
//             )
//         );

//         if (filteredNews.length === 0) {
//             return res.status(200).json({ message: "No relevant transport news found" });
//         }

//         // Store news in MongoDB (Avoid duplicates)
//         for (const news of filteredNews) {
//             const exists = await NewsModel.findOne({ link: news.link });
//             if (!exists) {
//                 await NewsModel.create({
//                     title: news.title,
//                     description: news.description || "No description available",
//                     link: news.link,
//                     publishedDate: news.published_at || new Date(),
//                     source: "BBC Sinhala",
//                 });
//             }
//         }

//         res.status(201).json({ message: "News updated successfully", news: filteredNews });
//     } catch (error) {
//         console.error("Error fetching news:", error);
//         res.status(500).json({ message: "Error fetching news", error: error.message });
//     }
// };

// // Retrieve stored news from MongoDB
// exports.getStoredNews = async (req, res) => {
//     try {
//         const news = await NewsModel.find().sort({ publishedDate: -1 });
//         res.status(200).json(news);
//     } catch (error) {
//         console.error("Error retrieving news:", error);
//         res.status(500).json({ message: "Error retrieving news", error: error.message });
//     }
// };



