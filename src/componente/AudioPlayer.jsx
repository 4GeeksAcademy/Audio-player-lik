import React, { useState, useEffect, useRef } from 'react';
import { IoPlayBackOutline, IoPlayOutline, IoPlayForwardOutline, IoPauseOutline } from "react-icons/io5";

const AudioPlayer = () => {
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        fetchSongs();
    }, []);

    const fetchSongs = () => {
        fetch("https://playground.4geeks.com/apis/fake/sound/songs")
            .then((response) => {
                if (!response.ok) throw new Error('Error al obtener las canciones');
                return response.json();
            })
            .then((data) => {
                setSongs(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const playSong = () => {
        audioRef.current.play();
    };

    const pauseSong = () => {
        if (!audioRef.current.paused) {
            audioRef.current.pause();
        }
    };

    const playNextSong = () => {
        const nextSongIndex = (currentSong + 1) % songs.length;
        const nextSong = songs[nextSongIndex];
        const url = "https://playground.4geeks.com/apis/fake/sound/" + nextSong.url;
        audioRef.current.src = url;
        setCurrentSong(nextSongIndex);
    };

    const playPreviousSong = () => {
        const prevSongIndex = (currentSong - 1 + songs.length) % songs.length;
        const prevSong = songs[prevSongIndex];
        const url = "https://playground.4geeks.com/apis/fake/sound/" + prevSong.url;
        audioRef.current.src = url;
        setCurrentSong(prevSongIndex);
    };

    const changeSong = (cancion, index) => {
        const songUrl = "https://playground.4geeks.com/apis/fake/sound/" + cancion.url;
        audioRef.current.src = songUrl;
        setCurrentSong(index);
        playSong();
    };

    return (
        <div className="audio-player-container">
            <audio ref={audioRef} />
            <div className="control-players">
                <button onClick={playPreviousSong}><IoPlayBackOutline /></button>
                <button onClick={playSong}><IoPlayOutline /></button>
                <button onClick={pauseSong}><IoPauseOutline /></button>
                <button onClick={playNextSong}><IoPlayForwardOutline /></button>
            </div>
            <ol className="song-list">
                {songs.map((cancion, index) => (
                    <li key={index} onClick={() => changeSong(cancion, index)}>
                        {cancion.name}
                    </li>
                ))}
            </ol>
        </div>
    );
};


export default AudioPlayer;