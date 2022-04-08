//APP.JS


// import logo from './logo.svg';
// import './App.css';
// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// // Import the CustomModal that we created in Modal.js.
// // import ... from "./components/...";
// import axios from "axios";

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }
// // export default App;



// //import "./styles.css";

// function App() {
//   // React States
//   const [errorMessages, setErrorMessages] = useState({});
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   // User Login info
//   const database = [
//     {
//       username: "user1",
//       password: "pass1"
//     },
//     {
//       username: "user2",
//       password: "pass2"
//     }
//   ];

//   const errors = {
//     uname: "That username doesn't exist!",
//     pass: "That password is incorrect! Please try again."
//   };

//   const handleSubmit = (event) => {
//     //Prevent page reload
//     event.preventDefault();

//     var { uname, pass } = document.forms[0];

//     // Find user login info
//     const userData = database.find((user) => user.username === uname.value);

//     // Compare user info
//     if (userData) {
//       if (userData.password !== pass.value) {
//         // Invalid password
//         setErrorMessages({ name: "pass", message: errors.pass });
//       } else {
//         setIsSubmitted(true);
//       }
//     } else {
//       // Username not found
//       setErrorMessages({ name: "uname", message: errors.uname });
//     }
//   };

//   // Generate JSX code for error message
//   const renderErrorMessage = (name) =>
//     name === errorMessages.name && (
//       <div className="error">{errorMessages.message}</div>
//     );

//   // JSX code for login form
//   const renderForm = (
//     <div className="form">
//       <form onSubmit={handleSubmit}>
//         <div className="input-container">
//           <label>Username </label>
//           <input type="text" name="uname" required />
//           {renderErrorMessage("uname")}
//         </div>
//         <div className="input-container">
//           <label>Password </label>
//           <input type="password" name="pass" required />
//           {renderErrorMessage("pass")}
//         </div>
//         <div className="button-container">
//           <input type="submit" />
//         </div>
//       </form>
//     </div>
//   );

//   return (
//     <div className="app">
//       <div className="login-form">
//         <div className="title">Sign In</div>
//         {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
//       </div>
//     </div>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

// export default App;


import React from "react";
import Modal from "./components/ratingModal";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeRating: {
        username: "",
        song: "",
        rating: 0
      },
      ratingList: []
    };
  }

  // The `componentDidMount()` method is called after the component is rendered,
  // at which point we call refreshList.
  componentDidMount() {
    this.refreshList();
  }

  // You can also define your custom functions in components as below.
  // We are using JavaScript arrow functions. There are no parameters () and 
  // the function body executes an HTTP request. 
  refreshList = () => {
    // If it succeeds, we set the todoList to the resolved data.
    // Otherwise, we catch the error and print it to the console.
    axios
      .get("http://localhost:8000/api/rating/")
      .then(res => this.setState({ ratingList: res.data }))
      .catch(err => console.log(err));
      //this is a HTTP get request for the ratingList
  };

  displayCompleted = status => {
    if (status) {
      // To change a value in the state object, use the this.setState() method.
      // When a value in the state object changes, the component will re-render,
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  
  renderRating = () => {
    const { viewCompleted } = this.state;
    // filter is a callback function that returns the elements of an array 
    // meeting a particular condition; here all items that are viewCompleted.
    const newRating = this.state.ratingList.filter(
      rating => rating.completed === viewCompleted
    );
    // The items are then mapped to their UI elements based on their id, i.e.,
    return newRating.map(rating => (
      <li
        key={rating.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          username={rating.username}
        >
          {rating.username}
        </span>
        {/* UI for editing and deleting items and their respective events. */}
        <span>
          <button
            onClick={() => this.editRating(rating)}
            className="btn btn-secondary mr-2"
          >
            {" "}
            Edit{" "}
          </button>
          <button
            onClick={() => this.ratingDelete(rating)}
            className="btn btn-danger"
          >
            Delete{" "}
          </button>
        </span>
      </li>
    ));
  };
  // To change a value in the state object, use the this.setState() method.
  // When a value in the state object changes, the component will re-render,
  // meaning that the output will change according to the new value(s).
  toggle = () => {
    // We have a modal view below in the render() function.
    // Upon toggle, set the modal to false, i.e., do not show the modal.
    this.setState({ modal: !this.state.modal });
  };
  ratingSubmit = rating => {
    this.toggle();
    // If the item already exists in our database, i.e., we have an id for our
    // item, use a PUT request to modify it.
    if (rating.id) {
      axios
        // Note that we are using backticks here instead of double quotes.
        // Backticks are useful because they allow us to use dynamic variables,
        // i.e., the item.id in this case. You can use this technique also
        // for authentication tokens.
        .put(`http://localhost:8000/api/rating/${rating.id}/`, rating)
        .then(res => this.refreshList());
      return;
    }
    // If the item does not yet exist, use a POST request to write to the
    // database.
    axios
      .post("http://localhost:8000/api/rating/", rating)
      .then(res => this.refreshList());
  };
  // If the user triggers a delete event, send a delete request.
  ratingDelete = rating => {
    axios
      .delete(`http://localhost:8000/api/rating/${rating.id}`)
      .then(res => this.refreshList());
  };
  // If the user triggers a createItem event (by clicking on Add task), create
  // a new item with default values and set the modal to false.
  createRating = () => {
    const rating = { username: "", song: "", rating: 0 };
    this.setState({ activeRating: rating, modal: !this.state.modal });
  };
  // If the use triggers an editItem event.
  editRating = rating => {
    this.setState({ activeRating: rating, modal: !this.state.modal });
  };
  // The `render()` method is the only required method in a class component.
  // When called, it will render the page. You do not have to specifically
  // call render() in your component. Rather, the stub code with the
  // ReactDOM.render(...) in your index.js will do that for you.
  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Music App</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createRating} className="btn btn-primary">
                  Add Rating
                </button>
              </div>
              {this.renderRating()}
              <ul className="list-group list-group-flush">
                {this.renderRating()}
              </ul>
            </div>
          </div>
        </div>
        {/* If the modal state is true, show the modal component. */}
        {this.state.modal ? (
          <Modal
            activeRating={this.state.activeRating}
            toggle={this.toggle}
            onSave={this.ratingSubmit}
          />
        ) : null}
      </main>
    );
  }
}

// Export our App so that it can be rendered in index.js.
export default App;
