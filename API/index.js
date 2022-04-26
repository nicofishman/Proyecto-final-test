import express from 'express';
import cors from 'cors';
import routerSpotify from './Routes/spotify.routes.js';
import cookieParser from 'cookie-parser'

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    cors: true
}

app.set('port', process.env.PORT || 3001);
app.use(cors(corsOptions));
app.use(cookieParser());

app.listen(process.env.PORT || 3001);

app.use('/spotify', routerSpotify);