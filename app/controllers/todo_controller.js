const Todo = require('../models/todo_model.js')

exports.create = (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: 'Todo content cannot be empty'
        })
    }
    const todo = new Todo({
        title: req.body.title || 'Untitled Todo',
        content: req.body.content,
        done: false,
        archived: false
    })

    todo.save()
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while crating the todo.'
            })
        })
}

exports.findAll = (req, res) => {
    Todo.find({ archived: false })
        .then(todos => {
            res.send(todos)
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving todos.'
            })
        })
}

exports.findArchived = (req, res) => {
    Todo.find({ archived: true })
        .then(todos => {
            res.send(todos)
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving todos.'
            })
        })
}

exports.findOne = (req, res) => {
    Todo.findById(req.params.todoId)
        .then(todo => {
            if (!todo) {
                return res.status(404).send({
                    message: `Todo not found with id ${req.params.todoId}`
                })
            }
            res.send(todo)
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `Todo not found with id ${req.params.todoId}`
                })
            }
            return res.status(500).send({
                message: `Error retrieving todo with id ${req.params.todoId}`
            })
        })
}

exports.update = (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: 'Todo content cannot be empty'
        })
    }
    if (!req.body.done) {
        return res.status(400).send({
            message: 'Todo status cannot be empty'
        })
    }
    if (!req.body.archived) {
        return res.status(400).send({
            message: 'Todo archive status cannot be empty'
        })
    }

    Todo.findByIdAndUpdate(req.params.todoId, {
        title: req.body.title || 'Untitled Todo',
        content: req.body.content,
        done: req.body.done,
        archived: req.body.archived
    }, { new: true })
        .then(todo => {
            if (!todo) {
                return res.status(404).send({
                    message: `Todo not found with id ${req.params.todoId}`
                })
            }
            res.send(todo)
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `Todo not found with id ${req.params.todoId}`
                })
            }
            return res.status(500).send({
                message: `Error updating todo with id ${req.params.todoId}`
            })
        })
}

exports.delete = (req, res) => {
    console.log(req.params)
    Todo.findByIdAndRemove(req.params.todoId)
        .then(todo => {
            if (!todo) {
                return res.status(404).send({
                    message: `Todo not found with id ${req.params.todoId}`
                })
            }
            res.send({ message: 'Todo deleted successfully!' })
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: `Todo not found with id ${req.params.todoId}`
                })
            }
            return res.status(500).send({
                message: `Could not delete todo with id ${req.params.todoId}`
            })
        })
}