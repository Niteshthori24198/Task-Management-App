const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
    title: { type: String, required: true },
    description: { type: String },
    createdDate: { type: Date },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" }
},

    { versionKey: false }

)

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = {
    TodoModel
}