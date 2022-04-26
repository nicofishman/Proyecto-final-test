import axios from 'axios';

export const getCurrentPlaying = async () => {
    const res = await axios.get('http://127.0.0.1:3001/spotify/currentplaying')
    return res;
}

export const getTop = async () => {
    const res = await axios.get('http://127.0.0.1:3001/spotify/top')
    return res;
}

export const previousSong = async () => {
    const res = await axios.get('http://127.0.0.1:3001/spotify/previous');
    return res;
}

export const nextSong = async () => {
    const res = await axios.get('http://127.0.0.1:3001/spotify/next');
    return res;
}

export const pauseSong = async () => {
    const res = await axios.get('http://127.0.0.1:3001/spotify/pause');
    return res;
}

export const playSong = async () => {
    const res = await axios.get('http://127.0.0.1:3001/spotify/play');
    return res;
}

export const getActiveDevices = async () => {
    const res = await axios.get('http://127.0.0.1:3001/spotify/devices');
    return res;
}