import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import React from 'react'
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {previousSong, nextSong, pauseSong, playSong} from '../Context/SpotifyContext';

function PlayingBar({ currentPlaying }) {
    const formatMsToMinutes = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }

    // const { previousSong, nextSong, pauseSong, playSong } = useSpotify();

    const songURL = currentPlaying.item.album.images[0].url;
    const songName = currentPlaying.item.name;
    const artists = currentPlaying.item.artists.map(artist => artist.name).join(', ');
    const songLengthMs = currentPlaying.item.duration_ms;
    const progressMs = currentPlaying.progress_ms;
    const songProgress = formatMsToMinutes(progressMs);
    const songLength = formatMsToMinutes(songLengthMs);

    return (
        <Box sx={{
            width: '100%',
            height: '10%',
            backgroundColor: '#ccc',
            position: 'absolute',
            bottom: 0,
            left: 0,
            overflow: 'hidden',
        }}>
            <Stack
                direction='row'
                justifyContent="space-around"
                alignItems="center"
                spacing={12}
                sx={{
                    mx: 3,
                    height: '100%',
                }}>
                <Box sx={{
                    width: '25%',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Box component='img' src={songURL} width={80} height={80} />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        ml: 2,
                    }}>
                        <Typography noWrap={true} fontSize={20} fontFamily={'sans-serif'}>{songName}</Typography>
                        <Typography noWrap={true} fontSize={12} fontFamily={'sans-serif'}>{artists}</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    width: '50%',
                    height: '100%',
                    backgroundColor: '#808080',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Box sx={{ // icons
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}>
                        <SkipPreviousIcon fontSize='large' color='icon'
                            onClick={() => previousSong()}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                    color: 'text.secondary',
                                }
                            }} />
                        {currentPlaying.is_playing ?
                            <PauseCircleIcon fontSize='large' color='icon'
                                onClick={() => pauseSong()}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: 'text.secondary',
                                    }
                                }} /> :
                            <PlayCircleIcon fontSize='large' color='icon'
                                onClick={() => playSong()}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: 'text.secondary',
                                    }
                                }} />
                        }
                        <SkipNextIcon fontSize='large' color='icon'
                            onClick={() => nextSong()}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                    color: 'text.secondary',
                                }
                            }} />
                    </Box>
                    <Box sx={{ // progress bar
                        width: '100%',
                        height: '40%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>
                        <Typography>{songProgress}</Typography>
                        <Box sx={{
                            width: '70%',
                            height: '100%',
                            transform: 'translateY(40%)',
                            mx: 2
                        }} >
                            <LinearProgress color='success' variant="determinate" value={(progressMs / songLengthMs) * 100} sx={{
                                height: '10%',
                            }} />
                        </Box>
                        <Typography>{songLength}</Typography>
                    </Box>

                </Box>
                <Box sx={{
                    width: '25%'
                }}>

                </Box>
            </Stack>
        </Box>
    )
}

export default PlayingBar