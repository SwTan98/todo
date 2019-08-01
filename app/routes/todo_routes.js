module.exports = function(app, db) {
    const todos = require('../controllers/todo_controller.js')

    app.post('/todos', todos.create)
    app.get('/todos', todos.findAll)
    app.get('/todos/archives', todos.findArchived)
    app.get('/todos/:todoId', todos.findOne)
    app.put('/todos/:todoId', todos.update)
    app.delete('/todos/:todoId', todos.delete)
}