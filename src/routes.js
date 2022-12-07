import * as controllers from './controllers.js'
import * as schemas from './schemas.js'

export async function NoteRoutes(server, options) {
  
  server.route({
    method: "POST",
    url: "/notes",
    schema: schemas.AddNoteSchema,
    handler: controllers.AddNoteController
  })
}