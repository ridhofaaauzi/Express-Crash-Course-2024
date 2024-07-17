let posts = [
  {
    id: 1,
    title: "Post 1",
  },
  {
    id: 2,
    title: "Post 2",
  },
  {
    id: 3,
    title: "Post 3",
  },
];

// Get All Posts
// GET /api/posts
export const getPosts = (req, res, next) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json({ message: "Get All Posts", posts });
};

// Get Single Post
// GET /api/posts/:id
export const getPost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`Post Not Found`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json({
    message: `Get Post ${id}`,
    post,
  });
};

// Add Post
// POST /api/posts/
export const addPost = (req, res, next) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    const error = new Error(`Title is required`);
    error.status = 400;
    return next(error);
  }

  posts.push(newPost);
  res.status(201).json({
    message: "Post Created",
    newPost,
  });
};

// Update Post
// PUT /api/posts/:id
export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`Post Not Found`);
    error.status = 404;
    return next(error);
  }

  const index = posts.indexOf(post);
  const updatedPost = { ...post, ...req.body };
  posts[index] = updatedPost;
  res.status(200).json({
    message: `Post ${id} updated`,
    updatedPost,
  });
};

// Delete Post
// DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`Post Not Found`);
    error.status = 404;
    return next(error);
  }

  const index = posts.indexOf(post);
  posts.splice(index, 1);
  res.status(200).json({ message: `Post ${id} deleted` });
};
