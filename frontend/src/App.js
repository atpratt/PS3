import './App.css';
import React from "react";
//import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the Modals we want to use
import RatingsModal from "./components/RatingsModal"
import AttributeModal from "./components/AttributeModal"
import {useState, useEffect} from 'react';
import SongList from "./components/SongList"
import BioList from "./components/BioList"

function App () {

  return (
    <div className = "App">

      <div id="cent" class="navbar">
        <ul>
            <li><a href="#About">Simply Music</a></li>
            <li><a href="#Ratings">Rate a Song</a></li>
            <li><a href="#Attribute">View Attributes</a></li>
            <li><a href="#SongLists">Song List</a></li>
        </ul>
      </div>

      <div class="Blue">
        <h3 id="About">About Simply Music</h3>
        <p class="center"> Simply Music is the world wide leader in music sharing and rating. This website was created as part of Wesleyan 
            COMP333 Course. All rights are reserved to individual artists and Simply Music has no claims to financial compensation
            for any of the services </p>
        
      </div>

      <div class="Blue">
        <h3 id="SongLists"></h3>
        <h2>Song List</h2>
        <SongList/>
      </div>

      <div class="Blue">
        <h3 id="SongLists"></h3>
        <h2>Artist Biographies</h2>
        <BioList/>
      </div>

      <div class="Blue">
        <h3 id="Ratings"></h3>
        <RatingsModal/>
      </div>

      <div class="Blue">
        <h3 id="Attribute"></h3>
        <AttributeModal/>
      </div>

      

    </div>
    
  );
}
export default App;
