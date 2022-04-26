import React, { useContext, createContext } from 'react';

const SpotifyContext = createContext(undefined);

export function SpotifyProvider(props) {
    const fetchCurrentPlaying = async () => {
        const response = await fetch('http://127.0.0.1:3001/spotify/currentplaying');
        const json = await response.json();
        return json;
    }

    const previousSong = async () => {
        await fetch('http://127.0.0.1:3001/spotify/previous')
    }

    const nextSong = async () => {
        await fetch('http://127.0.0.1:3001/spotify/next')
    }

    const pauseSong = async () => {
        await fetch('http://127.0.0.1:3001/spotify/pause')
    }

    const playSong = async () => {
        await fetch('http://127.0.0.1:3001/spotify/play')
    }

    const value = useMemo(() => {
        return ({
            previousSong,
            nextSong,
            pauseSong,
            playSong,
            fetchCurrentPlaying
        })
    });

    return <SpotifyContext.Provider value={value} {...props} />;
}

export function useSpotify() {
    const context = useContext(SpotifyContext);
    if (!context) {
        throw new Error('useSpotify must be used within a SpotifyProvider');
    }
    return context;
}