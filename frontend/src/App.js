import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the Modals we want to use
import RatingsModal from "./components/RatingsModal"
import AttributeModal from "./components/AttributeModal"
import {useState, useEffect} from 'react';
import SongList from "./components/SongList"
import BioList from "./components/BioList"
import SongModal from "./components/SongModal"
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function App () {

  return (
      <div className="App">

        <div id="cent" class="navbar">
          <ul>
            <li><a href="#About">Simply Music</a></li>
            <li><a href="#SongLists">Song Catalogue</a></li>
            <li><a href="#Ratings">Rate a Song</a></li>
            <li><a href="#Attribute">Create an Artist Bio</a></li>
            <li><a href="#AddSongs">Add Songs</a></li>

            {/* <li><a href="#AutoBio">Auto Biographies</a></li> */}
          </ul>
        </div>
        <div class="bg-image">
          <img src='https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp'
            class="img-fluid rounded-pill"
            alt='HollyWood Sign' />

        </div>

        <div class="Blue">
          <h3 id="About">About Simply Music</h3>
          <p class="center"> Simply Music is the world wide leader in music sharing and rating. This website was created as part of Wesleyan
            COMP333 Course. All rights are reserved to individual artists and Simply Music has no claims to financial compensation
            for any of the services </p>
          <Typography variant="body" color="textSecondary" align="center">
            {' '}
            Simply Music {new Date().getFullYear()}  ©.
          </Typography>
          </div>

          <div class="Blue">
            <h3 id="About">What's Trending!</h3>
            <p class="center">Simply Music keeps you up to date on the best new music.</p>
            <Typography variant="h5" color="textSecondary" align="center">
              {' '}
              <Link color="white" href="https://www.youtube.com/watch?v=HmP_wGYw1_g">
                Click HERE to see today's hottest song on Simply Music!
              </Link>
            </Typography>

          </div>
          

        <div class="Blue">
          <h3 id="SongLists"></h3>
          <h2>Song List</h2>
          <SongList />
        </div>

        {/* <div class="Blue">
      <h3 id="AutoBio"></h3>
      <h2>Artist Biographies</h2>
      <BioList/>
    </div> */}

        <div class="Blue">
          <h3 id="Ratings"></h3>
          <RatingsModal />
        </div>

        <div class="Blue">
          <h3 id="Attribute"></h3>
          <AttributeModal />
        </div>

        <div class="Blue">
          <h3 id="AddSongs"></h3>
          <SongModal />
        </div>

      
    <div>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        This site was designed and published as part of the COMP 333 Software Engineering class at Wesleyan University. 
        The described platform is not publicly available but rather is created as a training exercise.
        </Typography>
        <Typography>
        <Link color="white" href="https://sebastianzimmeck.de/class/comp333/comp333.html">
                Class Website
        </Link>
        </Typography>
      </div>
    </div>
  );
}
export default App;
