const express = require('express');
require('express-async-errors');
const errorMiddleware = require('./middlewares/error');
const loginRouter = require('./routes/loginRoutes');
const usersRouter = require('./routes/usersRoutes');
const categoriesRouter = require('./routes/categoriesRoutes');
const postsRouter = require('./routes/postsRoutes');

// ...

const app = express();

app.use(express.json());

app.use('/login', loginRouter);
app.use('/user', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postsRouter);

app.use(errorMiddleware);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
