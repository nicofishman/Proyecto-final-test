import { useEffect, useState } from 'react'
import './App.css'
import PlayingBar from './Components/PlayingBar';
import Box from '@mui/material/Box';
import {getCurrentPlaying, getTop} from './Context/SpotifyContext';

function App() {
    const [currentPlaying, setCurrentPlaying] = useState(null);
    const [previousCurrentPlaying, setPreviousCurrentPlaying] = useState(null);
    const fetchCurrentPlaying = async () => {
        try {
            const response = await getCurrentPlaying();
            return response.data;
        } catch {
            await getTop();
            const response = await getCurrentPlaying();
            return response.data;
        }
    }
    useEffect(() => {
        fetchCurrentPlaying().then(setPreviousCurrentPlaying);
        setInterval(() => {
            fetchCurrentPlaying().then(setCurrentPlaying);
        }, 500);
    }, []);

    useEffect(() => {
        if (currentPlaying !== previousCurrentPlaying) {
            setPreviousCurrentPlaying(currentPlaying);
        }
    }, [currentPlaying]);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                backgroundColor: '#333',
                overflow: 'hidden',
            }}>
            {currentPlaying && <PlayingBar currentPlaying={currentPlaying} />}
        </Box>
    )
}

export default App
