import { useState, useEffect } from "react";
import {Button, Form} from "react-bootstrap";
import API from "../API";

const Attributes = ({ onAdd }) => {

    const [artist_name, setArtist_name] = useState("");
    const [album, setAlbum] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [record_company, setRecord_company] = useState("");
    const [artistId, setArtistId] = useState(null);
    const [artists, setArtists] = useState([]);

    useEffect(() =>
    {
        refreshAttributes();
    }, []);

    const refreshAttributes = () =>

        API.get("/attribute/")
            .then((res) => {
                setArtists(res.data);
            })
            .catch(console.error);

    const onSubmit = (event) => {
        event.preventDefault();

        let val = {artist_name, album, genre, year, record_company}
        API.post("/attribute/", val).then(() => refreshAttributes());
    };

    const onUpdate = (id) => {
        let a_n = {artist_name}
        API.patch(`/attribute/${id}/`, a_n).then((res) => refreshAttributes());
    }

    const onDelete = (item) => {
        console.log("ITEM ID IS:", item.id);
        API.delete(`/attribute/${item.id}/`).then((res) => refreshAttributes());
    }

    function selectAttribute(id)
    {
        let atrib = artists.filter((artist_name) => artist_name.id === id)[0];
        setArtist_name(atrib.artist_name);
        setAlbum(atrib.album);
        setGenre(atrib.genre);
        setYear(atrib.year);
        setArtistId(atrib.id);
    }

    
        return(
            <div className = "container" id="cent">
                <div className = "row">
                    <div className = "col-dm-4">
                        <h3>Create New Attribute</h3>
                        <Form onSubmit={onSubmit}>
                            <Form.Group>
                                <Form.Label>Artist Name</Form.Label>
                                <Form.Control
                                    type = "text"
                                    placeholder = "Enter Artist Name"
                                    value = {artist_name}
                                    onChange = { (e) => setArtist_name(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Album</Form.Label>
                                <Form.Control 
                                    type = "text"
                                    placeholder = "Enter Album Name"
                                    value = {album}
                                    onChange= {(e) => setAlbum(e.target.value)}
                                />

                            </Form.Group>
                            
                            <Form.Group>
                                <Form.Label>Genre</Form.Label>
                                <Form.Control 
                                    type = "text"
                                    placeholder = "Enter Genre"
                                    value = {genre}
                                    onChange= {(e) => setGenre(e.target.value)}
                                />

                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Release Year</Form.Label>
                                <Form.Control 
                                    type = "text"
                                    placeholder = "Enter Release Year"
                                    value = {year}
                                    onChange= {(e) => setYear(e.target.value)}
                                />

                            </Form.Group>
                        
                            <Form.Group>
                                <Form.Label>Record Company</Form.Label>
                                <Form.Control 
                                    type = "text"
                                    placeholder = "Enter The Record Company"
                                    value = {record_company}
                                    onChange= {(e) => setRecord_company(e.target.value)}
                                />

                            </Form.Group>
                        <div className>
                            <Button
                                variant= "primary"
                                type = "submit"
                                onClick = {onSubmit}
                                className = "mx-2"
                            >
                                Save
                            </Button> 
                        </div>
                    </Form>
                    </div>
                    <div className = "col-md-12 m" id="cent">
                        <table className = "table">
                            <thead>
                                <tr>
                                    <th scope = "col">#</th>
                                    <th scope = "col">Artist Name</th>
                                    <th scope = "col">Album</th>
                                    <th scope = "col">Genre</th>
                                    <th scope = "col">Year</th>
                                    <th scope = "col">Record Company</th>
                                    <th scope = "col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {artists.map((artist_name) => {
                                    return (
                                        <tr key ="">
                                            <td scope="row">{artist_name.id}</td>
                                            <td scope="row"> {artist_name.artist_name}</td>
                                            <td scope="row"> {artist_name.album}</td>
                                            <td scope="row"> {artist_name.genre}</td>
                                            <td scope="row"> {artist_name.year}</td>
                                            <td scope="row"> {artist_name.record_company}</td>
                                            <td>
                                            <Button
                                                variant= "primary"
                                                type = "submit"
                                                onClick = {() => onDelete(artist_name)}
                                                className = "mx-2"
                                            >
                                            Delete
                                            </Button> 
                                            </td>
                                            

                                            {/* <td>
                                                <i
                                                    onClick = {() => selectAttribute(artist_name.id)}
                                                ></i>
                                                <i
                                                    onClick={() => onDelete(artist_name.id)}
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

export default Attributes;
