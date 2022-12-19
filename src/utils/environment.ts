import dotenv from 'dotenv'
import path from 'path'

const dirname = path.resolve()

dotenv.config({ path: path.resolve(dirname, '.env')})

if(!process.env.NODE_ENV) {
  throw 'No valid environment set!'
}

const NODE_ENV = process.env.NODE_ENV

const envPath = path.resolve(dirname,`.env.${NODE_ENV}`)

dotenv.config({ path: envPath })

if (!process.env.DB_URL) {
  throw "No DB URL was found!"
}

if (!process.env.JWT_SECRET) {
  throw "No JWT SECRET was found!"
}

if (!process.env.JWT_VALIDITY) {
  throw "No JWT VALIDITY was found!"
}

const PORT = Number(process.env.PORT)

const environment = {
  NODE_ENV,
  MESSAGE: process.env.MESSAGE || "No Message",
  PORT:PORT,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_VALIDITY: process.env.JWT_VALIDITY
}

export default environment