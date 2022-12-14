import database from "./utils/db.js"
import environment from './utils/environment.js'
import fastify from 'fastify'
import { Routes } from "./routes.js"
import Auth from "./utils/auth.js"

const server = fastify({ logger: true })

const start = async () => {
  try {
    await server
    .register(database)
    .register(Auth)
    .register(Routes)
    .listen({ port: environment.PORT, host: '0.0.0.0' })

    console.log("The server is running!")
  } catch (error) {
    server.log.error(error)
    process.exit(1)
  }
}

start()