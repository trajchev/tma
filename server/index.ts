import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';

import { errorHandler } from './middlewares/error-handler';
import { currentUserRouter } from './routes/currentuser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { NotFoundError } from './errors/not-found-error';

dotenv.config({path: './config.env'});

const app = express();

app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError()
})

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.jxb6m.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to mongoDb')
  } catch(err) {
    console.log(err);
  }

  app.listen(3200, () => {
    console.log('Listening on port 3200');
  });
  
}

start();