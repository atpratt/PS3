import React from "react";
// We would like to use a modal (small window) to show details of a task.
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

// We are creating and exporting the CustomModal class.
// It will be imported in our App.js.
export default class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    // The state object is initialized in the constructor.
    // It can contain as many properties as you like.
    // Here we define one property called activeItem.
    this.state = {
      activeBio: this.props.activeBio,
    };
  }

  // Whenver we enter changes into our form, e.g., for the title of our task,
  // we want the change to be immediately detected. This is what happens when
  // this function is called below with onChange={this.handleChange}.
  // handleChange takes an event argument, i.e., a change in title, descripton,
  // or checkbox.
  handleChange = (event) => {
    // An event has a target, thus, event.target gives us the event's DOM element, e.g.,
    // <input name="description" placeholder="Enter Todo description" type="text" class="form-control" value="My Task">.
    // From that, we assign the variables name = "description" and value = "My Task".
    let { name, value } = event.target;
    if (event.target.type === "checkbox") {
      value = event.target.checked;
    }
    // Recall the spread operator three dots ... , e.g.,
    // var parts = ['two', 'three']; // [two", "three"]
    // var numbers = ['one', ...parts, 'four']; // ["one", "two", "three", "four"]
    // ...this.state.activeItem spreads out the current task object, e.g.,
    // {"id": 3, "title": "My Task", "description": "Wash Dishes", "completed": true}.
    // [name]: value sets the name of the task to the new value the user entered
    // (e.g., title to "Another Task" or description to "Sweep floor").
    const activeBio = { .....this.state.activeBio, [name]: value };
    // To change a value in the `state` object for rendering, use the `this.setState()`
    // method. If you would not do so, the text shown to the user in the textbox, e.g.,
    // for the title of the new task would not change.
    this.setState({ activeRating });
  };
  // The `render()` method is the only required method in a class component.
  // When called, it will render the page. You do not have to specifically
  // call render() in your component. Rather, the stub code with the
  // ReactDOM.render(...) in your index.js will do that for you.
  // The following will render the modal for adding or editing a task.
  render() {
    // The modal has three properties: toggle, onSave, and activeItem.
    // See App.js.
    // artist_name = models.CharField(max_length = 200, primary_key = True, default='SOME STRING')
    // album = models.CharField(max_length = 200, default='SOME STRING')
    // genre = models.CharField(max_length = 200, default='SOME STRING')
    // year = models.IntegerField(default=2000)
    // record_company = models.CharField
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader  toggle={toggle}> New Bio </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="artist_name">Artist Name</Label>
              <Input
                type="text"
                name="artist_name"
                value={this.state.activeBio.artist_name}
                // "this" refers to the current event. If there is a change,
                // it will be passed to the handleChange function above.
                onChange={this.handleChange}
                placeholder="Enter Artist Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="album">Album Title</Label>
              <Input
                type="text"
                name="album"
                value={this.state.activeBio.album}
                onChange={this.handleChange}
                placeholder="Enter Album Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="genre">Genre</Label>
              <Input
                type="text"
                name="genre"
                value={this.state.activeBio.genre}
                onChange={this.handleChange}
                placeholder="Enter Genre"
              />
            </FormGroup>
            <FormGroup>
              <Label for="year">Release Year</Label>
              <Input
                type="number"
                name="year"
                value={this.state.activeBio.year}
                onChange={this.handleChange}
                placeholder="Enter Release Year"
              />
            </FormGroup>
            <FormGroup>
              <Label for="record_company">Record Company</Label>
              <Input
                type="text"
                name="record_company"
                value={this.state.activeBio.record_company}
                onChange={this.handleChange}
                placeholder="Enter Record Company"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeBio)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}