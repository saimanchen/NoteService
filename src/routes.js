import * as controllers from './controllers.js'
import * as schemas from './schemas.js'

export async function NoteRoutes(server, options) {
  // endpoint: /notes
  server.route({
    method: "GET",
    url: "/notes",
    schema: schemas.GetNotesSchema,
    handler: controllers.GetNotesController
  })

  server.route({
    method: "POST",
    url: "/notes",
    schema: schemas.DeleteAllNotesSchema,
    handler: controllers.DeleteAllNotesController
  })

  // endpoint: /note
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