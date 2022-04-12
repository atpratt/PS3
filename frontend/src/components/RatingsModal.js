import { useState, useEffect } from "react";
import {Button, Form} from "react-bootstrap";
import API from "../API"; //imports the API for use

const Ratings = ({ onAdd }) => {
    const [username, setUsername] = useState("");
    const [rating, setRating] = useState("");
    const [song, setSong] = useState("");
    const [songId, setSongId] = useState(null);
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        refreshRatings();
    }, []);

    const refreshRatings = () =>
      //calls the get from the API of the ratings in the DB to get ratings
      API.get("/rating/")
          .then((res) => {
            setRatings(res.data);
          })
          .catch(console.error);

    const onSubmit = (event) => {
      //if the event.preventDefault() does not get handled properly to then its result is not normal
      event.preventDefault();

      //sets the rating to be posted to the API
      //this only posts for users and songs that exist
      //calls the refresh to update the ratings that are showed to the user
      let r = {username, song, rating}
      API.post("/rating/", r).then(() => refreshRatings());
      //API.put(`/rating/${rating.id}/`, r).then(() => refreshRatings());
    };

    const onUpdate = () => {
        //when updted, get the song and patch the update
        //then the refresh is called to update
        let s = {rating}
        //API.patch(`/rating/${id}/`, s).then((res) => refreshRatings());
        API.patch(`/rating/${this.songId}/`, s).then((res) => refreshRatings());
    }

    const onDelete = (id) => {
        //uses the API delete to delete a rating based on the id
        //then the refresh is called to update
        API.delete(`/rating/${id}`).then((res) => refreshRatings());
    }

    // const handleDelete = (pk) => {
    //     API.delete('/deleterating/', pk).then((res) => refreshRatings());
    // };

    function selectRating(id){
        //filter function to go through the ratings based on ID and sets the current paramters based on the r
        let r = ratings.filter((rating) => rating.id === id)[0];
        setUsername(r.username);
        setSong(r.song);
        setSongId(r.id);
        setRating(r.rating); 
    }

    
        return(
            //bootstrap grid system uses -> container, row, col to format
            //Containers provide a means to center and horizontally pad your site’s contents
            //Rows are wrappers for columns
            //Col are used to indicate column numbers/percentage breakup
            <div className = "container" id='cent'>
                <div className = "row">
                    <div className = "col-dm-4">
                        <h3>Create New Rating</h3>
                        <Form onSubmit={onSubmit}>
                            <Form.Group>
                                <Form.Label>User Name</Form.Label>
                                <Form.Control
                                    type = "text"
                                    placeholder = "Enter Name"
                                    value = {username}
                                    onChange = { (e) => setUsername(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Song</Form.Label>
                                <Form.Control 
                                    type = "text"
                                    placeholder = "Enter the name of the song"
                                    value = {song}
                                    onChange= {(e) => setSong(e.target.value)}
                                />

                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Rating</Form.Label>
                                <Form.Control 
                                    type = "text"
                                    placeholder = "Enter your Rating (1, 2, 3, 4, or 5)"
                                    value = {rating}
                                    onChange= {(e) => setRating(e.target.value)}
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
                                    <th scope = "col">ID</th>
                                    <th scope = "col">Song Name</th>

                                    <th scope = "col">Rating</th>
                                    <th scope = "col">Rater</th>
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
                                                {/* creating a form to update the rating with */}
                                                <Form.Group >
                                                    <Form.Label>Update Rating</Form.Label>
                                                    <Form.Control 
                                                        type = "text"
                                                        placeholder = "Updated Rating"
                                                        value = {rating}
                                                        onChange= {(e) => setRating(e.target.value)}
                                                    />
                                                </Form.Group>

                                                <Button
                                                    variant= "primary"
                                                    type = "submit"
                                                    onClick = {(e) => onUpdate()}
                                                    className = "mx-2"
                                                >
                                                Update
                                                </Button>
                                            </td>


                                            <td>
                                            <Button
                                                variant= "primary"
                                                type = "submit"
                                                onClick = {onDelete(rating)}
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

export default Ratings;



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