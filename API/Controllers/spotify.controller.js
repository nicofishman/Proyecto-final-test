import SpotifyWebApi from 'spotify-web-api-node';
import 'dotenv/config';
import fetch from 'node-fetch';

const redirectUri = 'http://localhost:3001/spotify/callback'

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: redirectUri,
});


const resSend = (res, data) => {
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data, null, 2));
}

const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify',
    'user-modify-playback-state'
];

export const login = (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
}

export const callback = (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;
    if (error) {
        console.log('Callback Error: ' + error);
        res.send('Callback Error: ' + error);
        return
    }
    spotifyApi.
        authorizationCodeGrant(code)
        .then(data => {
            const accessToken = data.body['access_token'];
            const refreshToken = data.body['refresh_token'];
            const expiresIn = data.body['expires_in'];

            spotifyApi.setAccessToken(accessToken);
            spotifyApi.setRefreshToken(refreshToken);
            console.log('Refreshed!');
            // console.log('accessToken: ' + accessToken);
            // console.log('refreshToken: ' + refreshToken);

            // console.log(`The token expires in ${expiresIn} seconds`);
            res.redirect(req.cookies.redirect);

            setInterval(async () => {
                const data = await spotifyApi.refreshAccessToken();
                const access_token = data.body['access_token'];

                console.log('accessToken: ' + access_token);
                console.log('The token has been refreshed!');
                spotifyApi.setAccessToken(access_token);
            }, expiresIn / 2 * 1000);
        })
        .catch(err => {
            console.log('Something went wrong when retrieving an access token', err);
            res.send('Something went wrong when retrieving an access token');
        });
}

export const getAccessToken = (req, res) => {
    const access_token = spotifyApi.getAccessToken()
    res.send(access_token);
}

export const getByArtistName = (req, res) => {
    if (spotifyApi.getAccessToken() == null) {
        res.cookie('redirect', `/spotify/artist/${req.params.artist}`);
        res.redirect('/spotify/login');
    } else {
        res.clearCookie('redirect');
        spotifyApi.searchArtists(req.params.artist)
            .then(data => {
                resSend(res, data);
            })
            .catch(err => {
                resSend(res, err);
            });
    }
}

export const topUser = (req, res) => {
    let topArtists = [];
    if (spotifyApi.getAccessToken() == null) {
        res.cookie('redirect', '/spotify/top');
        res.redirect('/spotify/login');
    } else {
        res.clearCookie('redirect');
        spotifyApi.getMyTopArtists({ limit: 50 })
            .then(function (data) {
                data.body.items.forEach(artist => {
                    topArtists.push(artist.name);
                });
                res.end(JSON.stringify(topArtists));
            }, function (err) {
                console.log('Something went wrong!', err);
            });
    }
}

export const me = (req, res) => {
    if (spotifyApi.getAccessToken() == null) {
        res.cookie('redirect', '/spotify/me');
        res.redirect('/spotify/login');
    } else {
        res.clearCookie('redirect');
        spotifyApi.getMe()
            .then(function (data) {
                res.end(JSON.stringify(data.body));
            }, function (err) {
                console.log('Something went wrong!', err);
            });
    }
}

export const currentPlaying = (req, res) => {
    if (spotifyApi.getAccessToken() == null) {
        res.cookie('redirect', '/spotify/currentplaying');
        res.redirect('/spotify/login');
    } else {
        res.clearCookie('redirect');
        spotifyApi.getMyCurrentPlayingTrack()
            .then(function (data) {
                if (data.body) {
                    resSend(res, data.body);
                } else { 
                    resSend(res, 'No Device is playing')
                }
            }, function (err) {
                console.log('Something went wrong!', err);
            });
    }
}

export const pauseSong = (req, res) => {
    if (spotifyApi.getAccessToken() == null) {
        res.cookie('redirect', '/spotify/pause');
        res.redirect('/spotify/login');
    } else {
        res.clearCookie('redirect');
        spotifyApi.pause();
        resSend(res, 'Succesfully paused song');
    }
}

export const nextSong = (req, res) => {
    if (spotifyApi.getAccessToken() == null) {
        res.cookie('redirect', '/spotify/next');
        res.redirect('/spotify/login');
    } else {
        res.clearCookie('redirect');
        spotifyApi.skipToNext();
        resSend(res, 'Succesfully skipped song');
    }
}

export const previousSong = (req, res) => {
    if (spotifyApi.getAccessToken() == null) {
        res.cookie('redirect', '/spotify/previous');
        res.redirect('/spotify/login');
    } else {
        res.clearCookie('redirect');
        spotifyApi.skipToPrevious();
        resSend(res, 'Succesfully skipped song');
    }
}

export const playSong = (req, res) => {
    if (spotifyApi.getAccessToken() == null) {
        res.cookie('redirect', '/spotify/play');
        res.redirect('/spotify/login');
    } else {
        res.clearCookie('redirect');
        spotifyApi.play();
        resSend(res, 'Succesfully played song');
    }
}