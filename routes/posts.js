import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/postController.js";
const router = express.Router();

// Get All Posts
router.get("", getPosts);

// Get Single Post
router.get("/:id", getPost);

// Create New Post
router.post("/", addPost);

// Update Post
router.put("/:id", updatePost);

// delete post
router.delete("/:id", deletePost);

export default router;
