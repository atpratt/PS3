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
//import AttributeList from "./components/AttributeList"


import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import {ResponsiveEmbed, Image} from 'react-bootstrap';

function App () {

  return (
    <div className = "App">

      <div id="cent" class="navbar">
        <ul>
            <li><a href="#About">Simply Music</a></li>
            <li><a href="#SongLists">Song Catalogue</a></li>
            <li><a href="#Ratings">Rate a Song</a></li>
            <li><a href="#Attribute">Create an Artist Bio</a></li>
            
            {/* <li><a href="#AutoBio">Auto Biographies</a></li> */}
        </ul>
      </div>
      {/* <div style={{width: 660, height: 'auto'}}>
                <ResponsiveEmbed a16by9>
                    <embed type="image/href+xml" href = "https://static.pexels.com/photos/296886/pexels-photo-296886.jpeg"/>
                </ResponsiveEmbed>
            </div> */}
        <div class="bg-image">
        <img src='https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp' 
              class="img-fluid rounded-pill"
              alt='HollyWood Sign' />
        
        </div>
  {/* <div class="bg-image">
  <img
    src="https://mdbcdn.b-cdn.net/img/new/standard/city/053.webp"
    class="img-fluid"
    alt="Sample"
  />
  <div class="mask" style="background-color: rgba(0, 0, 0, 0.6);">
    <div class="d-flex justify-content-center align-items-center h-100">
      <p class="text-white mb-0">Can you see me?</p>
    </div>
  </div>
</div> */}
      <div class="Blue">
        <h3 id="About">About Simply Music</h3>
        <p class="center"> Simply Music is the world wide leader in music sharing and rating. This website was created as part of Wesleyan 
            COMP333 Course. All rights are reserved to individual artists and Simply Music has no claims to financial compensation
            for any of the services </p>
            <Typography variant="body2" color="textSecondary" align="center">
              {' '}  
                    Simply Music {new Date().getFullYear()}  ©. 
              </Typography>

              <div class="Blue">
        <h3 id="About">What's Trending!</h3>
        <p class="center">Simply Music keeps you up to date on the best new music.</p>
            <Typography variant="body2" color="textSecondary" align="center">
              {' '}
              <Link color="white" href="https://www.youtube.com/watch?v=HmP_wGYw1_g">
                    Click HERE to see today's hottest song on Simply Music!
                </Link>
              </Typography>
        
      </div></div>

      <div class="Blue">
        <h3 id="SongLists"></h3>
        <h2>Song List</h2>
        <SongList/>
      </div>

      {/* <div class="Blue">
        <h3 id="AutoBio"></h3>
        <h2>Artist Biographies</h2>
        <BioList/>
      </div> */}

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
