const { noteModel } = require("../model/noteModel");
// create a note
exports.createNote = async (req, res) => {
    try {
        const { title, description, date, time } = req.body;
        const createNote = await noteModel.create({
            title: title,
            description: description,
            date: date,
            time: time,
            userId: req.userId // userId send middleware 
        })

        if (!createNote) {
            return res.json({
                status: false,
                message: 'Note not created'
            })
        }

        res.json({
            status: true,
            message: 'Note successfully created'
        })

    } catch (error) {
        console.log('error creating note', error);
        res.json({
            status: false,
            message: 'error creating note'
        })
    }
}

// update a note
exports.updateNote = async (req, res) => {
    try {
        const { title, description, date, time, status } = req.body;
        const id = req.params.id;
        const existingNote = await noteModel.findById({ _id: id });
        if (!existingNote) {
            return res.json({
                status: false,
                message: 'Note not existing'
            })
        }
        const updateNote = await noteModel.updateOne({ _id: id }, {
            $set: {
                title: title,
                description: description,
                date: date,
                time: time,
                status : status
            }
        })

        if (!updateNote) {
            return res.json({
                status: false,
                message: 'Note not updated'
            })
        }

        res.json({
            status: true,
            message: 'Note successfully updated'
        })

    } catch (error) {
        console.log('error creating note', error);
        res.json({
            status: false,
            message: 'error creating note'
        })
    }
}


// delete a note
exports.deleteNote = async (req, res) => {
    try {
        const id = req.params.id;
        const existingNote = await noteModel.findById({ _id: id });
        if (!existingNote) {
            return res.json({
                status: false,
                message: 'Note not existing'
            })
        }
        const deleteNote = await noteModel.deleteOne({ _id: id })

        if (!deleteNote) {
            return res.json({
                status: false,
                message: 'Note not deleted'
            })
        }

        res.json({
            status: true,
            message: 'Note successfully deleted'
        })

    } catch (error) {
        console.log('error deleting note', error);
        res.json({
            status: false,
            message: 'error deleting note'
        })
    }
}

// delete a note
exports.getNotes = async (req, res) => {
    try {
        const userId = req.userId;
        const getNotes = await noteModel.find({ userId: userId });
        if (getNotes.length == []) {
            return res.json({
                status: false,
                message: 'Note not existing'
            })
        }
        res.json({
            status: true,
            getNotes
        })

    } catch (error) {
        console.log('error fetching note', error);
        res.json({
            status: false,
            message: 'error fetching note'
        })
    }
}