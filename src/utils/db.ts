import mongoose, { Model } from "mongoose"
import fp from "fastify-plugin"
import Note from "../model/Note"
import User from "../model/User"
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify"
import { INote, IUser } from "../interfaces"
import environment from "./environment"

export interface Models {
  User: Model<IUser>
  Note: Model<INote>
}

export interface Db {
  models: Models
}

async function database(server: FastifyInstance, options: FastifyPluginOptions) {
  try {
    mongoose.connect(environment.DB_URL)

    mongoose.connection
    .on("connected", () => server.log.info({ actor: "MongoDB" }, "Connected!"))
    .on("disconnected", () => server.log.info({ actor: "MongoDB" }, "Disconnected!"))
    .on("error", (error) => server.log.info({ actor: "MongoDB" }, `Error occurred: ${error}`))

    const models = { Note, User }

    server.addHook("onRequest", async (req: FastifyRequest, res: FastifyReply) => {
      req.db = { models }
    })

  } catch (error) {
    server.log.error(error)
  }
}

export default fp(database)