import { connect, set } from 'mongoose'

set('strictQuery', true);

export const dbConnect = async () => {
    try {
        connect(process.env.MONGODB_URL)
        console.log("Database connected successfully")
    }
    catch (error) {
        console.log(error)
    }
}