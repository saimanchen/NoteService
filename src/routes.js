import * as controllers from './controllers.js'
import * as schemas from './schemas.js'

export async function NoteRoutes(server, options) {
  // ENDPOINT: /notes
  server.route({
    method: "GET",
    url: "/notes",
    schema: schemas.GetNotesSchema,
    handler: controllers.GetNotesController
  })

  server.route({
    method: "DELETE",
    url: "/notes",
    schema: schemas.DeleteAllNotesSchema,
    handler: controllers.DeleteAllNotesController
  })


  // ENDPOINT: /note
  server.route({
    method: "POST",
    url: "/note",
    schema: schemas.AddNoteSchema,
    handler: controllers.AddNoteController
  })

  server.route({
    method: "DELETE",
    url: "/note",
    schema: schemas.DeleteNoteSchema,
    handler: controllers.DeleteNoteController
  })
}