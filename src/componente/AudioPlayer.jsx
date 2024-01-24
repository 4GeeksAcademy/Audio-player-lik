import React, { useState, useEffect, useRef } from 'react';
import { IoPlayBackSharp, IoPlayForwardSharp } from "react-icons/io5";



const AudioPlayer = () => {

    const [songs, setSongs] = useState([]);
    const [currentsong, setCurrentSong] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        obtenerCanciones()
    }, [])

    const obtenerCanciones = () => {
        fetch("https://playground.4geeks.com/apis/fake/sound/songs")
            .then((response) => {
                console.log(response)
                if (response.status === 404) throw new Error('Pagina no existe')
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setSongs(data)
            })
    }


    const cambiarCancion = (cancion, index) => {
        console.log(index)
        const songUrl = "https://playground.4geeks.com/apis/fake/sound/" + cancion.url
        audioRef.current.src = songUrl
        setCurrentSong(index)
    }




    const siguienteCancion = (currentsong) => {

        const nextsong = currentsong + 1 === songs.length ? songs[0] : songs[currentsong + 1]
        const url = "https://playground.4geeks.com/apis/fake/sound/" + nextsong.url
        audioRef.current.src = url
        console.log(nextsong)
        setCurrentSong(currentsong + 1 === songs.length ? 0 : currentsong + 1)


    };


    const previaCancion = (currentsong) => {
        console.log(currentsong);
        const nextsong = currentsong - 1 < 0 ? songs[songs.length - 1] : songs[currentsong - 1]
        const url = "https://playground.4geeks.com/apis/fake/sound/" + nextsong.url
        audioRef.current.src = url
        console.log(nextsong)
        setCurrentSong(currentsong - 1 < 0 ? songs.length - 1 : currentsong - 1)
    };



    return (
        <>
            <audio controls ref={audioRef} />


            <div className="control-players">
                <button onClick={() => previaCancion(currentsong)}><IoPlayBackSharp /></button>
                <button onClick={() => siguienteCancion(currentsong)}><IoPlayForwardSharp /></button>
            </div>
            <div>{songs.length}</div>
            <ul>
                {
                    Array.isArray(songs) && songs.length > 0 &&
                    songs.map((cancion, index) => {
                        return <li key={index} onClick={() => cambiarCancion(cancion, index)}>{cancion.name}</li>
                    })
                }
            </ul>
        </>
    
    )

}

export default AudioPlayer