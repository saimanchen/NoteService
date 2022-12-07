import mongoose from "mongoose"
import fp from "fastify-plugin"
import Note from "../model/Note.js"

async function database(server, options) {
  try {
    mongoose.connection.on("connected", () => {
      server.log.info({ actor: "MongoDB" }, "Connected!")
    })
    
    mongoose.connection.on("disconnected", () => {
      server.log.info({ actor: "MongoDB" }, "Disconnected!")
    })

    await mongoose.connect("mongodb+srv://saimanchen:MvpHP21fMbsODhKf@cluster0.bzp3cg8.mongodb.net/?retryWrites=true&w=majority")

    const models = { Note }

    server.addHook("onRequest", async (req, res) => {
      req.db = { models }
    })

  } catch (error) {
    server.log.error(error)
  }
}

export default fp(database)