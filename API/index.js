import express from 'express';
import cors from 'cors';
import routerSpotify from './Routes/spotify.routes.js';
import cookieParser from 'cookie-parser'

const app = express();

app.set('port', process.env.PORT || 3001);
app.use(cors());
app.use(cookieParser());

app.listen(process.env.PORT || 3001);

app.use('/spotify', routerSpotify);