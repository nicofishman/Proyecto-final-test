import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// import { SpotifyProvider } from './Context/SpotifyContext'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: [
            'Signika',
            'sans-serif'
        ].join(','),
    },
    palette: {
        icon: {
            main: '#fff'
        },
        iconHover: {
            main: '#808'
        }
    }
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            {/* <SpotifyProvider> */}
            <App />
            {/* </SpotifyProvider> */}
        </ThemeProvider>
    </React.StrictMode>
)
