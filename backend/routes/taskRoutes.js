const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const Task = require("../models/Task");
const Project = require("../models/Project");

/**
 * @route   POST /api/tasks
 * @desc    Create a task under a project
 * @access  Private
 */
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, project } = req.body;

    // Ensure project belongs to logged-in user
    const existingProject = await Project.findOne({
      _id: project,
      owner: req.user,
    });

    if (!existingProject) {
      return res.status(403).json({ message: "Unauthorized project access" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      project,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route   GET /api/tasks/:projectId
 * @desc    Get all tasks of a project
 * @access  Private
 */
router.get("/:projectId", auth, async (req, res) => {
  try {
    // Ensure project belongs to user
    const project = await Project.findOne({
      _id: req.params.projectId,
      owner: req.user,
    });

    if (!project) {
      return res.status(403).json({ message: "Unauthorized project access" });
    }

    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update task (status, priority, etc.)
 * @access  Private
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("project");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check project ownership
    if (task.project.owner.toString() !== req.user) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a task
 * @access  Private
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("project");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check project ownership
    if (task.project.owner.toString() !== req.user) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
