export async function AddNoteController(req, res) {
  try {
    req.log.info("Request received!")

    const { Note } = req.db.models
    const newNote = await Note.create(req.body)

    res.status(201)
    return { success: true, message: `uploaded with id: ${newNote.id}` }

  } catch (error) {
    req.log.error(error)
    await res.status(500).send("An error occurred!")
  }
}

export async function GetNotesController(req, res) {
  try {
    const { Note } = req.db.models
    const notes = await Note.find({})

    return notes
  } catch {
    req.log.error(error)
    await res.status(500).send("Error when fetching notes")
  }
}