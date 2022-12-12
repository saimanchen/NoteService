import mongoose from "mongoose"
import fp from "fastify-plugin"
import Note from "../model/Note.js"
import environment from './environment.js'

async function database(server, options) {
  try {
    mongoose.connect(environment.DB_URL)

    mongoose.connection
    .on("connected", () => server.log.info({ actor: "MongoDB" }, "Connected!"))
    .on("disconnected", () => server.log.info({ actor: "MongoDB" }, "Disconnected!"))
    .on("error", (error) => server.log.info({ actor: MongoDB }, `Error occurred: ${error}`))

    const models = { Note }

    server.addHook("onRequest", async (req, res) => {
      req.db = { models }
    })

  } catch (error) {
    server.log.error(error)
  }
}

export default fp(database)