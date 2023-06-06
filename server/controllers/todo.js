const { Todos } = require("../models/todoSchema");

const todoController = {
  getAll: (req, res) => {
    Todos.find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getById: (req, res) => {
    let id = req.params.id;
    Todos.findById(id)
      .then((data) => {
        if (data) res.json(data);
        else
          res.status(404).json({
            msg: "Not Found",
          });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  add: (req, res) => {
    let todo = new Todos({
      todo: req.body.todo,
      completed: req.body.completed,
    });
    todo.save();
    res.json(todo);
  },
  updateById: (req, res) => {
    let id = req.params.id;
    let newTodo = {
      todo: req.body.todo,
      completed: req.body.completed,
      date: new Date(),
    };
    Todos.findByIdAndUpdate(id, newTodo, { new: true })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.json(err));
  },
  deleteById: (req, res) => {
    Todos.findByIdAndRemove(req.params.id)
      .then((data) => {
        res.json({
          msg: "Deleted Succesfully",
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  deleteMany: async (req, res) => {
    try {
      const idsToDelete = req.body.map((item) => item._id);
      await Todos.deleteMany({ _id: { $in: idsToDelete } });
      res.json({ msg: "Başarıyla Silindi" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
module.exports = {
  todoController,
};
