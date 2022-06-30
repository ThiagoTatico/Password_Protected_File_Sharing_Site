import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

import { routes } from './routes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DATABASE_URL);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(process.env.PORT, () => console.log('Server ON !!!'));
