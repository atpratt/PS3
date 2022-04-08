//RATING MODAL

import axios from "axios";
import React from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    // The state object is initialized in the constructor.
    // here we are setting ther activeRatingx
    this.state = {
      activeRating: this.props.activeRating,
    };
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    // if (event.target.type === "checkbox") {
    //   value = event.target.checked;
    // }
    const activeRating = { ...this.state.activeRating, [name]: value };
    this.setState({ activeRating });
    // console.log(this.state.activeRating.username);
  };  

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/todos/")
      .then(res => this.setState({ activeRating: res.data }))
      .catch(err => console.log(err));
  };

  ratingSubmit = ar => {
    // If the item does not yet exist: POST Request 
    axios
    .post("http://localhost:8000/api/rating/", ar)
    //.then(res => console.log(res));
    .then(res => this.refreshList());

  };

  // DELETE.
  ratingDelete = ar => {
    axios
      .delete(`http://localhost:8000/api/rating/${ar.id}`)
      .then(res => this.refreshList());
  };

  //EDIT the rating and submits it again
  editRating = ar => {
    this.setState({ activeRating: ar, modal: !this.state.modal });
    this.ratingSubmit(this.state.activeRating)
  };


// HTTP Request Functions
// Create - Rating Submit 
// Read
// Update
// Delete







  render() {
    // The modal has three properties: toggle, onSave, and activeRating.
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader  toggle={toggle}> New Song Rating </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="username">Username of Rater</Label>
              <Input
                type="text"
                name="username"
                value={this.state.activeRating.username}
                // "this" refers to the current event. If there is a change,
                // it will be passed to the handleChange function above.
                onChange={this.handleChange}
                placeholder="Enter Username"
              />
            </FormGroup>
            <FormGroup>
              <Label for="song">Song Title</Label>
              <Input
                type="text"
                name="song"
                value={this.state.activeRating.song}
                onChange={this.handleChange}
                placeholder="Enter Song Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="rating">Rating</Label>
              <Input
                type="number"
                name="rating"
                value={this.state.activeRating.rating}
                onChange={this.handleChange}
                placeholder="Enter Rating"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => this.ratingSubmit(this.state.activeRating)}>
            {/* onClick={this.createItem} > */}
            {/* onClick={ratingSubmit}> */}
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
