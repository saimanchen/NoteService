import { FastifyReply, FastifyRequest } from "fastify"
import validateEmail from "./utils/validateEmail.js"
import { IRegisterRequest, ILoginRequest, IAddNoteRequest, IDeleteNoteRequest, IGetNotesCategoryRequest, IDeleteNotesCategoryRequest, IUpdateNoteRequest } from "./interfaces"

export async function RegisterController(
  req: FastifyRequest<{ Body: IRegisterRequest }>, 
  res: FastifyReply
) {
  try {
    const isEmailValid = validateEmail(req.body.email)

    if (!isEmailValid) {
      res.status(400).send("Invalid e-mail format")
    }

    const { User } = req.db.models

    const foundUser =  await User.findOne({ email: req.body.email })

    if (foundUser) {
      res.status(400).send({ success: false, message: "E-mail address is already in use!" })
    }

    const newUser = await User.create(req.body)

    const jwtToken = await res.jwtSign({
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      userId: newUser.id
    }, { expiresIn: "60m" })

    res.status(201).send({ 
      success: true, 
      message: `Registered new user with userID: ${newUser.id}`, 
      token: jwtToken 
    })

  } catch (error) {
    req.log.error(error)
    await res.status(500).send("Error occurred when registering a new user")
  }
}

export async function LoginController(
  req: FastifyRequest<{ Body: ILoginRequest }>,
  res: FastifyReply
) {
    try {
      const { User } = req.db.models

      const foundUser = await User.findOne({
        email: req.body.email, 
        password: req.body.password
    }).exec()

      if (!foundUser) {
        res.status(404).send("No user exists with this e-mail address")
      }

      if(foundUser != null) {
        const jwtToken = await res.jwtSign({
          firstname: foundUser.firstname,
          lastname: foundUser.lastname,
          email: foundUser.email,
          userId: foundUser.id
        }, { expiresIn: "60m" })

        res.status(201).send({ 
          success: true, 
          message: "Successfully logged in!", 
          token: jwtToken 
        })
      }
    } catch (error) {
      req.log.error(error)
      await res.status(500).send("Error occurred when logging in!")
    }
}

export async function GetNotesController(
  req: FastifyRequest, 
  res: FastifyReply
) {
  try {
    const { Note } = req.db.models
    const notes = await Note.find({ userId: req.user.userId }).exec()

    if (notes.length === 0) {
      await res.status(200).send({ success: true, message: "Your notebook is empty!" })
    }

    return notes
  } catch (error) {
    req.log.error(error)
    await res.status(500).send("Error occurred when fetching notes!")
  }
}

export async function DeleteAllNotesController(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const { Note } = req.db.models
    const { deletedCount } = await Note.deleteMany({ userId: req.user.userId })

    if(deletedCount === 0) {
      res.code(404)
      return { success: false, message: "There are no notes to delete!"}
    }

    res.code(201)
    return { success: true, message: "All notes were deleted!"}
  } catch (error){
    req.log.error(error)
    await res.status(500).send("Error occurred when deleting all notes!")
  }
}

export async function AddNoteController(
  req: FastifyRequest<{ Body: IAddNoteRequest }>, 
  res: FastifyReply
) {
  try {
    req.log.info("Request received!")

    const { Note, User } = req.db.models

    const foundUser = await User.findOne({ _id: req.user.userId })

    if (!foundUser) {
      return await res.status(404).send("User not found!")
    }

    const newNote = await Note.create(req.body)

    res.status(201)
    return { success: true, message: `uploaded with id: ${newNote.id} and appended it to the array` }

  } catch (error) {
    req.log.error(error)
    await res.status(500).send("Error occurred when adding a note!")
  }
}

export async function DeleteNoteController(
  req: FastifyRequest<{ Params: IDeleteNoteRequest }>, 
  res: FastifyReply
) {
  try {
    const { Note } = req.db.models
    const { deletedCount } = await Note.deleteOne({ _id: req.params.id, userId: req.user.userId })

    console.log(deletedCount)
    
    if(deletedCount === 0) {
      res.code(404)
      return { success: false, message: "Note could not be found!" }
    }

    res.code(201)
    return { success: true, message: "Note was successfully deleted!" }
  } catch (error) {
    req.log.error(error)
    await res.status(500).send("An error occurred!")
  }
}

export async function GetNotesCategoryController(
  req: FastifyRequest<{ Params: IGetNotesCategoryRequest }>, 
  res: FastifyReply
) {
  try {
    const { Note } = req.db.models
    const notes = await Note.find({ 
      category: req.params.category, 
      userId: req.user.userId 
    })

    if (notes.length === 0) {
      return { success: false, message: `There are no notes with the category '${req.params.category}'`}
    }

    return notes
  } catch (error) {
    req.log.error(error)
    await res.status(500).send("Error occurred when fetching notes!")
  }
}

export async function DeleteNotesCategoryController(
  req: FastifyRequest<{ Params: IDeleteNotesCategoryRequest }>, 
  res: FastifyReply
) {
  try {
    const { Note } = req.db.models
    const { category } = req.params
    const { userId } = req.user

    const { deletedCount } = await Note.deleteMany({ 
      category: category, 
      userId: userId
    })

    if(deletedCount === 0) {
      res.code(404)
      return { success: false, message: `There are no notes with the category '${category}' to delete!`}
    }

    res.code(201).send({ success: true, message: `All notes with the category '${category}' were deleted!`})
    
  } catch (error) {
    req.log.error(error)
    await res.status(500).send("Error occurred when deleting all notes!")
  }
}

export async function UpdateNoteController(
  req: FastifyRequest<{ Body: IUpdateNoteRequest }>, 
  res: FastifyReply
) {
  try {
    const { Note } = req.db.models
    const { id } = req.body

    const foundNote = await Note.findOne({ _id: id, userId: req.user.userId })

    if(!foundNote) {
      res.code(404)
      return { success: false, message: `Note couldn't be found` }
    }

    await Note.updateOne({ _id: id, userId: req.user.userId }, {
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      content: req.body.content,
      category: req.body.category
    })

    res.code(201).send({ success: true, message: `The note with the id '${id}' was updated!` })
  } catch (error) {
    req.log.error(error)
    await res.status(500).send("Error occurred when updating note!")
  }
}