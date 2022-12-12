export async function GetNotesController(req, res) {
  try {
    const { Note } = req.db.models
    const notes = await Note.find({})

    return notes
  } catch {
    req.log.error(error)
    await res.status(500).send("Error occurred when fetching notes!")
  }
}

export async function DeleteAllNotesController(req, res) {
  try {
    const { Note } = req.db.models
    const { deletedCount } = await Note.deleteMany({})

    if(deletedCount === 0) {
      res.code(404)
      return { success: false, message: "There are no notes to delete!"}
    }

    res.code(201)
    return { success: true, message: "All notes were deleted!"}
  } catch {
    req.log.error(error)
    await res.status(500).send("Error occurred when deleting all notes!")
  }
}

export async function AddNoteController(req, res) {
  try {
    req.log.info("Request received!")

    const { Note } = req.db.models
    const newNote = await Note.create(req.body)

    res.status(201)
    return { success: true, message: `uploaded with id: ${newNote.id}` }

  } catch (error) {
    req.log.error(error)
    await res.status(500).send("Error occurred when adding a note!")
  }
}

export async function DeleteNoteController(req, res) {
  try {
    const { Note } = req.db.models
    const { deletedCount } = await Note.deleteOne({ title: req.body.title })

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