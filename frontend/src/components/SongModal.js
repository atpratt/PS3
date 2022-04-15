import { useState, useEffect } from "react";
import {Button, Form} from "react-bootstrap";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import API from "../API"; //imports the API for use
//import axios from 'axios';

const Songs = ({ onAdd }) => {
    const [song, setSong] = useState("");
    const [artist, setArtist] = useState("");
    const [average_rating, setAvgRat] = useState(1);
    const [songDict, setSongDict] = useState({});
    const [songs, setSongs] = useState([]);


    useEffect(() => {
        refreshSongs();
    }, []);


    const refreshSongs = () =>
      //calls the get from the API of the ratings in the DB to get ratings
      API.get("/artist/")
          .then((res) => {
            setSongs(res.data);
          })
          .catch(console.error);

    const onSubmit = (event) => {
      //if the event.preventDefault() does not get handled properly to then its result is not normal
      event.preventDefault();
      console.log("song: " + song);
      console.log("artist: " + artist);
      console.log("average_rating: " + average_rating);

      let r = {song, artist, average_rating}
      API.post(`/artist/`, r).then(() => refreshSongs());
    }


    const onUpdate = (item) => {
        //when updted, get the song and patch the update
        //then the refresh is called to update
        console.log("artist: " + item.artist);
        console.log("song: " + item.song);
        console.log("songDict: " + songDict[song]);
        
        API.patch(`/artist/${item.song}/`, item).then((res) => refreshSongs());
        //API.patch(`/artist/${item.song}/`, item).then((res) => refreshSongs());
    }

    const onDelete = (item) => {
        //item.preventDefault();
        //uses the API delete to delete a rating based on the id
        //then the refresh is called to update
        //console.log("ITEM ID IS:", item.id);
        API.delete(`/artist/${item.song}/`).then((res) => refreshSongs());
    }

    
        return(

            <div className = "container" id='cent'>
                <div className = "row">
                    <div className = "col-dm-4">
                        <h3>Create New Song</h3>
                        <Form onSubmit={onSubmit}>
                            <Form.Group>
                                <Form.Label>Song</Form.Label>
                                <Form.Control
                                    type = "text"
                                    placeholder = "Enter Song Name"
                                    value = {song}
                                    onChange = { (e) => setSong(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Artist</Form.Label>
                                <Form.Control 
                                    type = "text"
                                    placeholder = "Enter the Artist"
                                    value = {artist}
                                    onChange= {(e) => setArtist(e.target.value)}
                                />

                            </Form.Group>

                        <div id='cent'>
                            <Button
                                variant= "primary"
                                type = "submit"
                                onClick = {onSubmit}
                                className = "mx-2"
                            >
                              Save
                            </Button> 

                            {/* <Button
                                variant = "primary"
                                type = "button"
                                onClick = {() => onUpdate(songId)}
                                className = "mx-2"
                            >
                                Update
                            </Button> */}
                        </div>

                    </Form>
                    </div>

                    <div className = "col-md-10" id="cent">
                        <table className = "table">
                            <thead>
                                <tr>
                                    <th scope = "col">Song Name</th>
                                    <th scope = "col">Artist</th>
                                </tr>
                            </thead>
                            <tbody>
                                {songs.map((item) => {
                                    return (
                                        <tr key ="">
                                            <td scope="row"> {item.song}</td>
                                            <td scope="row"> {item.artist}</td>
                                            <td>
                                                {/* creating a form to update the rating with */}
                                                <Form.Group >
                                                    <Form.Label></Form.Label>
                                                    <Form.Control 
                                                        type = "text"
                                                        placeholder = "New Song"
                                                        value = {songDict[item.song]}
                                                        onChange= {(e) =>{setSongDict({song : e.target.value})}}
                                                        // value = {songDict[item.song]}
                                                        // onChange= {(e) =>{setSongDict({song: e.target.value})}}                                                      
                                                    />
                                                </Form.Group>

                                                <Button
                                                    variant= "primary"
                                                    type = "submit"
                                                    //onClick = {(e) => onUpdate()}
                                                    onClick = {() => {onUpdate(item)}}
                                                    //onClick = {(e) => setRating(e.target.value), onUpdate()}
                                                    className = "mx-2"
                                                >
                                                Update
                                                </Button>
                                            </td>

                                            <td>
                                            {/* ids = {rating.id} */}
                                            <Button
                                                variant= "primary"
                                                type = "submit"
                                                onClick = {() => {onDelete(item)}}
                                                //onClick = {handleDelete(rating)}
                                                className = "mx-2"
                                            >
                                            Delete
                                            </Button> 
                                            </td>
                                            
                                            {/* <td>
                                                <i
                                                    onClick = {() => selectRating(rating.id)}
                                                ></i>
                                                <i
                                                    onClick={() => onDelete(rating.id)}
                                                ></i>
                                            </td> */}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        );


};

export default Songs;



{/* <Form.Group >
    <Form.Label>Update Rating</Form.Label>
    <Form.Control 
        type = "text"
        placeholder = "Enter your Updated Rating"
        value = {rating}
        onChange= {(e) => setRating(e.target.value)}
        onChange= {(e) => onUpdate(songId)}
    />

</Form.Group> */}
