const express = require('express');
const path = require('path');
const port = process.env.PORT;
const posts = require('./routes/posts');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');
const sequelize = require('./db');

const app = express();

app.use(logger);

// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/api/posts', posts);

// 404 not found
app.use((req, res, next) => {
  const err = new Error('Route not found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synchronized");
    app.listen(port, () => {
      console.log(`Server started on port ${port}`)
    });
  })
  .catch((error) => {
    console.error("Failed to synchronize database:", error);
    process.exit(1); // Exit the application if the database sync fails
  });