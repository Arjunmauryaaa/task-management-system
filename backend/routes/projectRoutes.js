const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const Project = require("../models/Project");

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Private
 */
router.post("/", auth, async (req, res) => {
  try {
    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      owner: req.user,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route   GET /api/projects
 * @desc    Get all projects of logged-in user
 * @access  Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   PUT /api/projects/:id
 * @desc    Update a project (only owner)
 * @access  Private
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, owner: req.user },
      {
        title: req.body.title,
        description: req.body.description,
      },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project (only owner)
 * @access  Private
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.user,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
