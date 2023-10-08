const { Router } = require('express');

const {auth} = require('../middleware/auth.middleware');
const todoRouter = Router();

const {
    addTodoTask,
    getOneTodoTask,
    getAllTodoTask,
    updateTodoTask,
    deleteTodoTask
} = require('../controller/todo.controller')


app.use(auth);

// All routes are protected so login required to access them.

todoRouter.post("/addnewtask", addTodoTask)
todoRouter.get("/getalltask", getAllTodoTask)
todoRouter.get('/getonetask/:ID', getOneTodoTask)
todoRouter.put("/updatetask/:ID", updateTodoTask)
todoRouter.patch("/updatetask/:ID", updateTodoTask)
todoRouter.delete("/deletetask/:ID", deleteTodoTask)


module.exports = {
    todoRouter
}