import express from 'express';
import connection from './src/config/connection.js';
import routes from './src/routes/index.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(routes);

connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
  });
});