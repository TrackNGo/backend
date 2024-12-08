const mongoose = require('mongoose')

const databaseConnection = async () => {
    const DB_URL = process.env.DATABASE_URL

    if (!DB_URL) {
        console.error('Error: DATABASE_URL is not defined in environment variables')
        process.exit(1) // Exit process with failure code
    }

    try {
        const conn = await mongoose.connect(DB_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message)
        process.exit(1) // Exit process with failure code
    }
}

module.exports = {
    databaseConnection,
}
