import { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form} from "react-bootstrap";
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

    const onSubmit = (e) => {
        e.preventDefault();

        let item = {artist_name, album, genre, year, record_company}
        API.post("/attribute/", item).then(() => refreshAttributes());
    };

    const onUpdate = (id) => {
        let item = {artist_name}
        API.patch(`/attribute/${id}/`, item).then((res) => refreshAttributes());
    }

    const onDelete = (id) => {

        API.delete(`/attribute/${id}`).then((res) => refreshAttributes());
    }

    function selectAttribute(id)
    {
        let item = artists.filter((artist_name) => artist_name.id === id)[0];
        setArtist_name(item.artist_name);
        setAlbum(item.album);
        setGenre(item.genre);
        setYear(item.year);
        setArtistId(item.id);
    }

    
        return(
            <div className = "container mt-5">
                <div className = "row">
                    <div className = "col-dm-4">
                        <h3 className = "float-left">Create a new Bio</h3>
                        <Form onSubmit={onSubmit} className = "mt-4">
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>{songId}</Form.Label>
                                <Form.Control
                                    type = "text"
                                    placeholder = "Enter Artist Name"
                                    value = {artist_name}
                                    onChange = { (e) => setArtist_name(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className = "mb-3" controlId = "formBasicSong">
                                <Form.Label>Album</Form.Label>
                                <Form.Control 
                                    type = "text"
                                    placeholder = "Enter the name of the album"
                                    value = {album}
                                    onChange= {(e) => setSong(e.target.value)}
                                />

                            </Form.Group>
                            
                            <Form.Group className = "mb-3" controlId = "formBasicReview">
                                <Form.Label>Genre</Form.Label>
                                <Form.Control 
                                    type = "text"
                                    placeholder = "Enter the genre of music"
                                    value = {genre}
                                    onChange= {(e) => setGenre(e.target.value)}
                                />

                            </Form.Group>

                            <Form.Group className = "mb-3" controlId = "formBasicRating">
                                <Form.Label>Release Year</Form.Label>
                                <Form.Control 
                                    type = "text"
                                    placeholder = "Enter the year the album came out"
                                    value = {year}
                                    onChange= {(e) => setYear(e.target.value)}
                                />

                            </Form.Group>
                        
                            <Form.Group className = "mb-3" controlId = "formBasicRating">
                                <Form.Label>Record Company</Form.Label>
                                <Form.Control 
                                    type = "text"
                                    placeholder = "Enter the record comapny who released the album"
                                    value = {record_company}
                                    onChange= {(e) => setRecord_company(e.target.value)}
                                />

                            </Form.Group>
                        <div className = "float-right">
                            <Button
                                variant= "primary"
                                type = "submit"
                                onClick = {onSubmit}
                                className = "mx-2"
                            >
                                Save
                            </Button> 
                            <Button
                                variant = "primary"
                                type = "button"
                                onClick = {() => onUpdate(artistId)}
                                className = "mx-2"
                            >
                                Update
                            </Button>
                        </div>
                    </Form>
                    </div>
                    <div className = "col-md-8 m">
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
                                {artists.map((artist_name, index) => {
                                    return (
                                        <tr key ="">
                                            <th scope="row">{artist_name.id}</th>
                                            <td> {artist_name.artist_name}</td>
                                            <td> {artist_name.album}</td>
                                            <td> {artist_name.genre}</td>
                                            <td> {artist_name.year}</td>
                                            <td> {artist_name.record_company}</td>
                                            <td>
                                                <i
                                                    className = "fa fa-pencil-square"
                                                    aria-hidden = "true"
                                                    onClick = {() => selectAttribute(artist_name.id)}
                                                ></i>
                                                <i
                                                    className="fa fa-trash"
                                                    aria-hidden="true"
                                                    onClick={() => onDelete(artist_name.id)}
                                                ></i>
                                            </td>
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

export default Ratings;