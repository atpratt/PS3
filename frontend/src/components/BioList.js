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
    },
    cardContent: {
      flexGrow: 1,
    },
  }));

class BioList extends React.Component {
    constructor() {
        super();
        this.state = { data: [] };
      }
    
    componentDidMount(){
        axios.get('http://localhost:8000/getbios/')
        .then(json => this.setState({ data: json.data }));

    }

    reset(){
      axios.get('http://localhost:8000/getbios/')
      .then(json => this.setState({ data: json.data }));

  }

    handleHide(pk) {
      const formData = new FormData();
      formData.append('artist_name', pk.pk);
      axios.post('http://localhost:8000/deletebio/', formData);

      var array = [...this.state.data];
      var idx = array.indexOf(pk);
      if (idx != -1) {
        array.splice(idx, 1);
        this.setState({data: array}, () => {
          console.log(this.state.data)
        });
      }
      
    }


    handleSort(mode){
      var data = this.state.data;
      if(mode == "artist_name"){
        data.sort((a, b) => (a.pk.toLowerCase() > b.pk.toLowerCase()) ? 1 : -1)
      }
      if(mode == "album"){
        data.sort((a, b) => (a.fields.album.toLowerCase() > b.fields.album.toLowerCase()) ? 1 : -1)
      }
      this.setState({ data: data });
      if(mode == "genre"){
        data.sort((a, b) => (a.fields.genre.toLowerCase() > b.fields.genre.toLowerCase()) ? 1 : -1)
      }
      if(mode == "year"){
        data.sort((a, b) => (a.fields.year < b.fields.year) ? 1 : -1)
      }
      if(mode == "record_company"){
        data.sort((a, b) => (a.fields.record_company.toLowerCase() > b.fields.record_company.toLowerCase()) ? 1 : -1)
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
        console.log("BioList" + JSON.stringify(this.state.data[0]));
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
                            color: "white"}} onClick={() => this.handleSort("artist_name")}>
                      Sort by Artist
          </Button>

          <Button size="small" color="primary" style={{
                            backgroundColor: "Blue",
                            color: "white"}} onClick={() => this.handleSort("album")}>
                      Sort by Album
          </Button>

          <Button size="small" color="primary" style={{
                            backgroundColor: "Blue",
                            color: "white"}} onClick={() => this.handleSort("genre")}>
                      Sort by Genre
          </Button>

          <Button size="small" color="primary" style={{
                            backgroundColor: "Blue",
                            color: "white"}} onClick={() => this.handleSort("year")}>
                      Sort by Release Year
          </Button>

          <Button size="small" color="primary" style={{
                            backgroundColor: "Blue",
                            color: "white"}} onClick={() => this.handleSort("record_company")}>
                      Sort by Record Company
          </Button>

          <Button size="small" color="primary" style={{
                            backgroundColor: "Blue",
                            color: "white"}} onClick={() => this.reset()}>
                      Show All Bios
          </Button>

          </Box>
          </Grid>

          <Grid container spacing={7}>
            {this.state.data.map((card) =>
            (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card variant="outlined" className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h5" component="h2">
                        {card.pk}
                    </Typography>

                    Released the {card.fields.genre} album {card.fields.album} through {card.fields.record_company} in {card.fields.year}
                    
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
export default withStyles(useStyles, { withTheme: true }) (BioList);