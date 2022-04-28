import { useEffect, useState } from 'react'
import './App.css'
import PlayingBar from './Components/PlayingBar';
import Box from '@mui/material/Box';
import { getCurrentPlaying, getTop, getActiveDevices } from './Context/SpotifyContext';

function App() {
    const [hasActiveDevices, setHasActiveDevices] = useState(false);
    const [currentPlaying, setCurrentPlaying] = useState(null);
    const [previousCurrentPlaying, setPreviousCurrentPlaying] = useState(null);
    const fetchCurrentPlaying = async () => {
        try {
            const activeDevices = await getActiveDevices();
            setHasActiveDevices(activeDevices.data.body.devices.length > 0);
            if (activeDevices.data.body.devices.length > 0) {
                setHasActiveDevices(true);
                const response = await getCurrentPlaying();
                return response.data;
            }
        } catch {
            const activeDevices = await getActiveDevices();
            if (activeDevices.data.body.devices.length > 0) {
                setHasActiveDevices(true);
                await getTop();
                const response = await getCurrentPlaying();
                return response.data;
            }
        }
    }
    useEffect(() => {
        fetchCurrentPlaying().then((data) => {
            console.log(data);
            setCurrentPlaying(data);
        });
        setInterval(() => {
            fetchCurrentPlaying().then(setCurrentPlaying);
        }, 800);
    }, []);

    // useEffect(() => {
    //     if (currentPlaying !== previousCurrentPlaying) {
    //         setPreviousCurrentPlaying(currentPlaying);
    //     }
    // }, [currentPlaying]);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                backgroundColor: '#333',
                overflow: 'hidden',
            }}>
            {(hasActiveDevices && currentPlaying) ? <PlayingBar currentPlaying={currentPlaying} /> : <h1>No active Devices</h1>}
        </Box>
    )
}

export default App
