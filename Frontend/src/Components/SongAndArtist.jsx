import Box from "@mui/material/Box";
import React from "react";
import Typography from "@mui/material/Typography";

const SongAndArtist = ({ songURL, songName, artists }) => {
    return (
        <Box
            sx={{
                width: "25%",
                display: "flex",
                alignItems: "center",
            }}
        >
            <Box component="img" src={songURL} width={80} height={80} />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    ml: 2,
                }}
            >
                <Typography
                    noWrap={true}
                    fontSize={20}
                    fontFamily={"sans-serif"}
                >
                    {songName}
                </Typography>
                <Typography
                    noWrap={true}
                    fontSize={12}
                    fontFamily={"sans-serif"}
                >
                    {artists}
                </Typography>
            </Box>
        </Box>
    );
};

export default SongAndArtist;
