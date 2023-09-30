import { pool } from '../config/database.js'
import '../config/dotenv.js'
import giftData from '../data/gifts.js'

const createGiftsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS songs;

        CREATE TABLE IF NOT EXISTS songs (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            artist TEXT NOT NULL,
            year TEXT NOT NULL,
            genre TEXT NOT NULL,
            url TEXT NOT NULL,
            cover TEXT NOT NULL
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 Songs table created successfully')
    } catch (err) {
        console.error('⚠️ error creating songs table', err)
    }
}

const seedGiftsTable = async () => {
    await createGiftsTable()

    giftData.forEach((gift) => {
        const insertQuery = {
            text: 'INSERT INTO songs (title, artist, year, genre, url, cover ) VALUES ($1, $2, $3, $4, $5, $6)'
        }

        const values = [
            gift.title,
            gift.artist,
            gift.year,
            gift.genre,
            gift.url,
            gift.cover,
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting gift', err)
                return
            }

            console.log(`✅ ${gift.title} added successfully`)
        })
    })
}

seedGiftsTable()