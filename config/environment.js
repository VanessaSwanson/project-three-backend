import dotenv from 'dotenv'
dotenv.config()

export const dbURI = process.env.DB_URI || 'mongodb+srv://nessa:1ottr6fWUOnE9VVz@cluster0.muz4z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
export const port = process.env.PORT || 4000
export const secret = process.env.SECRET || 'shhhh its a secret'