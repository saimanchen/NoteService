import * as controllers from './controllers.js'
import * as schemas from './schemas.js'

export async function Routes(server, options) {

  // ENDPOINT: /register
  server.route({
    method: "POST",
    url: "/register",
    schema: schemas.RegisterSchema,
    handler: controllers.RegisterController
  })

  // ENDPOINT: /login
  server.route({
    method: "POST",
    url: "/login",
    schema: schemas.LoginSchema,
    handler: controllers.LoginController
  })

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
    url: "/notes",
    preHandler: [server.authenticate],
    schema: schemas.AddNoteSchema,
    handler: controllers.AddNoteController
  })

  server.route({
    method: "DELETE",
    url: "/notes/:id",
    schema: schemas.DeleteNoteSchema,
    handler: controllers.DeleteNoteController
  })

  // ENDPOINT: /category
  server.route({
    method: "GET",
    url: "/notes/:category",
    schema: schemas.GetNotesCategorySchema,
    handler: controllers.GetNotesCategoryController
  })

  server.route({
    method: "DELETE",
    url: "/notes/:category/del",
    schema: schemas.DeleteNotesCategorySchema,
    handler: controllers.DeleteNotesCategoryController
  })

  // ENDPOINT: /update
  server.route({
    method: "PUT",
    url: "/update",
    schema: schemas.UpdateNoteSchema,
    handler: controllers.UpdateNoteController
  })
}