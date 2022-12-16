import database, { Db } from "./utils/db"
import environment from './utils/environment'
import fastify, { FastifyInstance } from 'fastify'
import { Routes } from "./routes"
import Auth from "./utils/auth"

declare module 'fastify' {
  interface FastifyRequest {
    db: Db
  }

  interface FastifyInstance {
    authenticate(req: FastifyRequest, res: FastifyReply): Promise<void>
  }
}

const server: FastifyInstance = fastify({ logger: true })

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