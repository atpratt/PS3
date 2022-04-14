import '../App.css';
import { useState, useEffect } from "react";
import {Button, Form} from "react-bootstrap";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import API from "../API"; //imports the API for use
//import axios from 'axios';

const Ratings = ({ onAdd }) => {
    const [username, setUsername] = useState("");
    const [rating, setRating] = useState("");
    const [song, setSong] = useState("");
    const [songId, setSongId] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [ratingsDict, setRatingsDict] = useState({});


    useEffect(() => {
        refreshRatings();
    }, []);

    // handleChange = (event) => {
    //     // An event has a target, thus, event.target gives us the event's DOM element
    //     let {id, us, sg, rt} = event.target;
    //     this.setUsername(us)
    //     this.setSongId(id)
    //     this.setRating(rt)
    //     this.setSong(sg)

    //     const activeItem = { ...this.state.activeItem, [id]: rt };
    //     this.setState({ activeItem });
    // };

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
      let r = {username, song, rating}
      API.post(`/rating/`, r).then(() => refreshRatings());

      //API.post("/rating/", r).then(() => refreshRatings());
      //API.put(`/rating/${rating.id}/`, r).then(() => refreshRatings());
    };

    // const handleDelete = item => {
    //     axios
    //       .delete(`http://localhost:8000/api/rating/${item.id}`)
    //       .then(res => this.refreshRatings());
    //   };

    const onUpdate = (item) => {
        //when updted, get the song and patch the update
        //then the refresh is called to update
        let s = parseInt(ratingsDict["rating"]);
        
        console.log("id is:", item.id);
        console.log(ratingsDict);
        console.log("rating is:" + " " + s + " " +  "type is: " + typeof s);
        console.log(item)
        var ids = item.id;
        item['rating'] = s;

        API.patch(`/rating/${item.id}/`, item).then((res) => refreshRatings());
        //API.put(`/rating/${item.id}/`, s).then((res) => refreshRatings());
    }

    const onDelete = (item) => {
        //item.preventDefault();
        //uses the API delete to delete a rating based on the id
        //then the refresh is called to update
        //console.log("ITEM ID IS:", item.id);
        API.delete(`/rating/${item.id}/`).then((res) => refreshRatings());
    }

    // const handleDelete = (pk) => {
    //     API.delete('/deleterating/', pk).then((res) => refreshRatings());
    // };

    function selectRating(pk){
        //filter function to go through the ratings based on ID and sets the current paramters based on the r
        let r = ratings.filter((rating) => rating.pk === pk)[0];
        setUsername(r.username);
        setSong(r.song);
        setSongId(r.pk);
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
                                    //onChange={this.handleChange()}
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
                    <div className = "container" id='cent'>
                    <div className = "col-md-10" id="cent">
                        <table className = "table">
                            <thead>
                                <tr>
                                    {/* <th scope = "col">ID</th> */}
                                    <th scope = "col">Song Name</th>

                                    <th scope = "col">Rating</th>
                                    <th scope = "col">Rater</th>
                                    <th scope = "col">Update Rating</th>
                                    <th scope = "col">Delete Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ratings.map((item) => {
                                    return (
                                        <tr key ="">
                                            {/* <td scope="row">{item.id}</td> */}
                                            <td scope="row"> {item.song}</td>
                                            <td scope="row"> {item.rating}</td>
                                            <td scope="row"> {item.username}</td>
                                            <td>
                                                {/* creating a form to update the rating with */}
                                                <Form.Group >
                                                    <Form.Label></Form.Label>
                                                    <Form.Control 
                                                        class="span6 input-large"
                                                        //style="width:50px"
                                                        type = "text"
                                                        placeholder = "New Rating 1-5"
                                                        value = {ratingsDict[item.id]}
                                                        onChange= {(e) =>{var id = item.id; setRatingsDict({ rating: e.target.value})}}
                                                        
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