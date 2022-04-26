import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import React from "react";
import SongAndArtist from "./SongAndArtist";
import Player from "./Player";

function PlayingBar({ currentPlaying }) {
    const formatMsToMinutes = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    };

    // const { previousSong, nextSong, pauseSong, playSong } = useSpotify();

    const songURL = currentPlaying.item.album.images[0].url;
    const songName = currentPlaying.item.name;
    const artists = currentPlaying.item.artists
        .map((artist) => artist.name)
        .join(", ");
    const songLengthMs = currentPlaying.item.duration_ms;
    const progressMs = currentPlaying.progress_ms;
    const songProgress = formatMsToMinutes(progressMs);
    const songLength = formatMsToMinutes(songLengthMs);

    return (
        <Box
            sx={{
                width: "100%",
                height: "10%",
                backgroundColor: "#ccc",
                position: "absolute",
                bottom: 0,
                left: 0,
                overflow: "hidden",
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                spacing={12}
                sx={{
                    mx: 3,
                    height: "100%",
                }}
            >
                <SongAndArtist
                    songURL={songURL}
                    songName={songName}
                    artists={artists}
                />

                <Player
                    songLength={songLength}
                    songProgress={songProgress}
                    songLengthMs={songLengthMs}
                    progressMs={progressMs}
                    is_playing={currentPlaying.is_playing}
                />
                <Box
                    sx={{
                        width: "25%",
                    }}
                ></Box>
            </Stack>
        </Box>
    );
}

export default PlayingBar;
