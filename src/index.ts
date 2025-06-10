import express, { Request, Response } from 'express';
import * as http from 'http';
import 'dotenv/config';
import mongoose, { ConnectOptions } from 'mongoose';
import revenueRoutes from './routes/revenue.route'
import refreshRoutes from './routes/refresh.route'
import cron from 'node-cron';
import refreshDataBackground from './util/jobs';

const app = express();
const server = http.createServer(app);
const DB_CONNECTION: any = process.env.MONGO_DB_URL;

app.set('port', process.env.PORT)
app.use(express.json());

app.use('/api/refresh', refreshRoutes);
app.use('/api/revenue', revenueRoutes);

app.get('', (_: Request, res: Response) => {
    res.send("Welcome to Lumel task");
});

server.listen(process.env.PORT, () => {
    mongoose.connect(DB_CONNECTION, { dbName: process.env.DATABASE, useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
        .then(result => {
            cron.schedule('0 0 * * *', refreshDataBackground);
            console.log('Server running at', process.env.PORT);
        }).catch(err => {
            console.log(err);
        });
});