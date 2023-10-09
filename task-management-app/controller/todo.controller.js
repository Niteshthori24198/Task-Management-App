const { TodoModel } = require('../model/todo.model');
const mongoose = require('mongoose')

/**
 * Adds a new todo task to the database after user is being authenticated from auth middleware.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The response object containing the status and message.
 */

const addTodoTask = async (req, res) => {

    if (req.body.createdDate === undefined) {
        req.body.createdDate = new Date();
    }

    try {

        const todo = new TodoModel(req.body);
        await todo.save();

        return res.status(200).send({
            "msg": "New todo has been created Successfully.",
            todo: todo
        })

    } catch (error) {

        return res.status(400).send({
            "msg": error.message
        })
    }
}


/**
 * Retrieves a single todo task by taking ID as params.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The todo task.
 */

const getOneTodoTask = async (req, res) => {

    const { ID } = req.params;

    const userId = req.body.userId;

    try {

        const todo = await TodoModel.findById({ _id: new mongoose.Types.ObjectId(ID) }).populate("userId");

        if (todo?.userId?._id == userId) {

            return res.status(200).send(todo);
        } else {

            return res.status(400).send({ "msg": "You can't able to get todo of other user" });
        }
    } catch (error) {

        return res.status(400).send({ "error": error.message });
    }
}


/**
 * Retrieves all the todo tasks for a given user.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.userId - The user ID.
 * @param {Object} res - The response object.
 * @returns {Object} An array of todo tasks for the user.
 */

const getAllTodoTask = async (req, res) => {

    const userId = req.body.userId;

    try {

        const todos = await TodoModel.find({ userId }).populate("userId");
        return res.status(200).send(todos);

    } catch (error) {

        return res.status(400).send({ "error": error.message });
    }
}


/**
 * Updates a todo task by taking ID as params and authencation of correct user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves to nothing.
 */

const updateTodoTask = async (req, res) => {

    const { ID } = req.params;

    if (req.body.status) {
        if (!["Pending", "Completed", "In Progress"].includes(req.body.status)) {
            return res.status(400).send({
                "error": "Invalid status provided.",
                "Info": `required status types must be in :- Pending,Completed, In Progress`
            })
        }
    }

    try {

        const verifytodo = await TodoModel.findById({ _id: new mongoose.Types.ObjectId(ID) });

        if (!verifytodo) {
            return res.status(400).send({
                "msg": "Todo not found."
            })
        }

        if (verifytodo.userId == req.body.userId) {

            await TodoModel.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(ID) }, req.body);

            const todo1 = await TodoModel.findById({ _id: new mongoose.Types.ObjectId(ID) });

            return res.status(200).send({

                "msg": `todo has been updated.`,
                todo: todo1
            }
            );

        } else {

            return res.status(400).send({
                "msg": "Unauthorized access detected. Accees Denied"
            })
        }
    } catch (error) {

        return res.status(400).send({
            "msg": error.message
        })
    }
}


/**
 * Delete a todo task by taking ID as params and validating the user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The response containing the success or error message.
 */

const deleteTodoTask = async (req, res) => {

    const { ID } = req.params;

    try {

        const todo = await TodoModel.findById({ _id: new mongoose.Types.ObjectId(ID) });
        if (!todo) {
            return res.status(400).send({
                "msg": "Todo not found."
            })
        }

        if (todo.userId == req.body.userId) {

            await TodoModel.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(ID) });

            return res.status(200).send({
                "msg": "Todo has been deleted."
            });
        } else {

            return res.status(400).send({
                "msg": "Unauthorized access detected. Accees Denied"
            })
        }
    } catch (error) {

        return res.status(400).send({
            "msg": error.message
        })
    }
}


module.exports = {
    addTodoTask,
    getOneTodoTask,
    getAllTodoTask,
    updateTodoTask,
    deleteTodoTask
}