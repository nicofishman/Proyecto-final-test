import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import {
    previousSong,
    nextSong,
    pauseSong,
    playSong,
} from "../Context/SpotifyContext";

const Player = ({
    is_playing,
    songProgress,
    progressMs,
    songLengthMs,
    songLength,
}) => {
    return (
        <Box
            sx={{
                width: "50%",
                height: "100%",
                backgroundColor: "#808080",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    // icons
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                }}
            >
                <SkipPreviousIcon
                    fontSize="large"
                    color="icon"
                    onClick={() => previousSong()}
                    sx={{
                        cursor: "pointer",
                        "&:hover": {
                            color: "text.secondary",
                        },
                    }}
                />
                {is_playing ? (
                    <PauseCircleIcon
                        fontSize="large"
                        color="icon"
                        onClick={() => pauseSong()}
                        sx={{
                            cursor: "pointer",
                            "&:hover": {
                                color: "text.secondary",
                            },
                        }}
                    />
                ) : (
                    <PlayCircleIcon
                        fontSize="large"
                        color="icon"
                        onClick={() => playSong()}
                        sx={{
                            cursor: "pointer",
                            "&:hover": {
                                color: "text.secondary",
                            },
                        }}
                    />
                )}
                <SkipNextIcon
                    fontSize="large"
                    color="icon"
                    onClick={() => nextSong()}
                    sx={{
                        cursor: "pointer",
                        "&:hover": {
                            color: "text.secondary",
                        },
                    }}
                />
            </Box>
            <Box
                sx={{
                    // progress bar
                    width: "100%",
                    height: "40%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                }}
            >
                <Typography>{songProgress}</Typography>
                <Box
                    sx={{
                        width: "70%",
                        height: "100%",
                        transform: "translateY(40%)",
                        mx: 2,
                    }}
                >
                    <LinearProgress
                        color="success"
                        variant="determinate"
                        value={(progressMs / songLengthMs) * 100}
                        sx={{
                            height: "10%",
                        }}
                    />
                </Box>
                <Typography>{songLength}</Typography>
            </Box>
        </Box>
    );
};

export default Player;
