const { default: mongoose } = require("mongoose");

let todosSchema = new mongoose.Schema({
  todo: String,
  completed: Boolean,
  date: { type: Date, default: Date.now },
});
const Todos = mongoose.model("Todos", todosSchema);

module.exports = {
  Todos,
};
