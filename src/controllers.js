export async function AddNoteController(req, res) {
  try {
    req.log.info("Request received!")

    const Note = req.db.models.Note // const { book } = req.db.models
    const newNote = await Note.create(req.body)

    res.status(201)
    return { success: true, message: `uploaded with id: ${newNote.id}` }

  } catch (error) {
    req.log.error(error)
    await res.status(500).send("An error occurred!")
  }
}