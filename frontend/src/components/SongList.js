import React from 'react';
import axios from "axios";

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      color: 'pink',
      borderRadius: 2,
      typography: {
        allVariants: {
          fontFamily: 'serif',
          textTransform: 'none',
          fontSize: 16,}
        }
    },
  }));

class SongList extends React.Component {
    constructor() {
        super();
        this.state = { data: [] };
      }
    
    componentDidMount(){
        axios.get('http://localhost:8000/getsongs/')
        .then(json => this.setState({ data: json.data }));

    }

    reset(){
      axios.get('http://localhost:8000/getsongs/')
      .then(json => this.setState({ data: json.data }));

  }

    handleHide(pk) {
      const formData = new FormData();
      formData.append('song', pk.pk);
      axios.post('http://localhost:8000/deletesong/', formData);

      var array = [...this.state.data];
      var idx = array.indexOf(pk);
      if (idx != -1) {
        array.splice(idx, 1);
        this.setState({ data: array}, () => {
          console.log(this.state.data)
        });
      }
      
    }


    handleSort(mode){
      var data = this.state.data;
      if(mode == "song_title"){
        data.sort((a, b) => (a.pk.toLowerCase() > b.pk.toLowerCase()) ? 1 : -1)
      }
      if(mode == "artist_name"){
        data.sort((a, b) => (a.fields.artist.toLowerCase() > b.fields.artist.toLowerCase()) ? 1 : -1)
      }
      this.setState({ data: data });
      if(mode == "rating"){
        data.sort((a, b) => (a.fields.average_rating < b.fields.average_rating) ? 1 : -1)
      }
    }


    render() {
        const useStyles = makeStyles((theme) => ({
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            margin: "auto"
        },
        cardContent: {
            flexGrow: 1,
        },
        }));

        const classes = this.props;
        console.log("SongList" + JSON.stringify(this.state.data[0]));
        if(this.state.data == []){
            console.log("EMPTY");
            return "error";
        }

        return (
          <main>
          <Grid container Spacing={12}>
          <Box mx="auto" m={2} pt={3} px={3}>
          <Button variant="outlined" size="small" color="primary" mt={1} style={{
                            backgroundColor: "Blue",
                            color: "white"}} onClick={() => this.handleSort("song_title")}>
                      Sort Songs by their Title
          </Button>

          <Button size="small" color="primary" style={{
                            backgroundColor: "Blue",
                            color: "white"}} onClick={() => this.handleSort("artist_name")}>
                      Sort Songs by the Artist's Name
          </Button>

          <Button size="small" color="primary" style={{
                            backgroundColor: "Blue",
                            color: "white"}} onClick={() => this.handleSort("rating")}>
                      Sort Songs by their Rating
          </Button>

          <Button size="small" color="primary" style={{
                            backgroundColor: "Blue",
                            color: "white"}} onClick={() => this.reset()}>
                      Reset Songs
          </Button>
          </Box>
          </Grid>

          <Grid container spacing={7}>
            {this.state.data.map((card) =>
            (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card style={{backgroundColor: "pink"}}variant="outlined" className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography  variant="h5" component="h2" color="white">
                        "{card.pk}"
                    </Typography>
                    <Typography color="common.white" variant="subtitle1" component="h2">
                        Performed by {card.fields.artist}
                    </Typography>

                    Has been given an average rating of {card.fields.average_rating}
                    
                  </CardContent>
                  <CardActions style={{justifyContent: 'center'}}>
                    <Button variant="fab" position= "center" size="small" color="primary" onClick={() => this.handleHide(card)}>
                      Hide from view
                    </Button>

                  </CardActions>
                </Card>
              </Grid>
              )
            )
            }
          </Grid>
          </main>
        )
    }
  }
export default withStyles(useStyles, { withTheme: true }) (SongList);