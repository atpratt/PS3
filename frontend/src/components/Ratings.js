import { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form} from "react-bootstrap";
import API from "../API";

const Ratings = ({ onAdd }) => {

    const [username, setUsername] = useState("");
    const [rating, setRating] = useState("");
    const [song, setSong] = useState("");
    const [songId, setSongId] = useState(null);
    const [ratings, setRatings] = useState([]);

    useEffect(() =>
    {
        refreshRatings();
    }, []);

    const refreshRatings = () =>

        API.get("/rating/")
            .then((res) => {
                setRatings(res.data);
            })
            .catch(console.error);

    const onSubmit = (e) => {
        e.preventDefault();

        let item = {username, song, rating}
        API.post("/rating/", item).then(() => refreshRatings());
    };

    const onUpdate = (id) => {
        let item = {song}
        API.patch(`/rating/${id}/`, item).then((res) => refreshRatings());
    }

    const onDelete = (id) => {

        API.delete(`/rating/${id}`).then((res) => refreshRatings());
    }

    function selectRating(id)
    {
        let item = ratings.filter((rating) => rating.id === id)[0];
        setUsername(item.username);
        setSong(item.song);
        setSongId(item.id);
        setRating(item.rating);
        
        
    }

    
        return(
            <div className = "container mt-5">
                <div className = "row">
                    <div className = "col-dm-4">
                        <h3 className = "float-left">Create a new Rating</h3>
                        <Form onSubmit={onSubmit} className = "mt-4">
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>{songId}</Form.Label>
                                <Form.Control
                                    type = "text"
                                    placeholder = "Enter Name"
                                    value = {username}
                                    onChange = { (e) => setUsername(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className = "mb-3" controlId = "formBasicSong">
                                <Form.Label>Song</Form.Label>
                                <Form.Control 
                                    type = "text"
                                    placeholder = "Enter the name of the song"
                                    value = {song}
                                    onChange= {(e) => setSong(e.target.value)}
                                />

                            </Form.Group>
                            
                            {/* <Form.Group className = "mb-3" controlId = "formBasicReview">
                                <Form.Label>Review</Form.Label>
                                <Form.Control 
                                    type = "text"
                                    placeholder = "Enter your Review"
                                    value = {review}
                                    onChange= {(e) => setReview(e.target.value)}
                                />

                            </Form.Group> */}

                            <Form.Group className = "mb-3" controlId = "formBasicRating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control 
                                    type = "text"
                                    placeholder = "Enter your Rating"
                                    value = {rating}
                                    onChange= {(e) => setRating(e.target.value)}
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
                                onClick = {() => onUpdate(songId)}
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
                                    <th scope = "col">Song Name</th>

                                    <th scope = "col">Rating</th>
                                    <th scope = "col">Reviewer</th>
                                    <th scope = "col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {ratings.map((rating, index) => {
                                    return (
                                        <tr key ="">
                                            <th scope="row">{rating.id}</th>
                                            <td> {rating.song}</td>
                                            
                                            <td> {rating.rating}</td>
                                            <td> {rating.username}</td>
                                            <td>
                                                <i
                                                    className = "fa fa-pencil-square"
                                                    aria-hidden = "true"
                                                    onClick = {() => selectRating(rating.id)}
                                                ></i>
                                                <i
                                                    className="fa fa-trash"
                                                    aria-hidden="true"
                                                    onClick={() => onDelete(rating.id)}
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