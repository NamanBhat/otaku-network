import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Card, {CardContent, CardMedia} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import OtakuImg from './../assets/images/otaku.gif'
import OtakuImg2 from './../assets/images/otaku.png'
import {Link} from 'react-router-dom'
import Grid from 'material-ui/Grid'
import auth from './../auth/auth-helper'
import FindPeople from './../user/FindPeople'
import Newsfeed from './../post/Newsfeed'
import { Carousel } from 'react-responsive-carousel'
const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 0 ,
    background: 'linear-gradient(black,gray,white)'
  },
  root2: {
    flexGrow: 1,
    margin: 0 ,
    background: 'linear-gradient(white,gray)',
    backgroundSize: 'cover',
    backgroundRepeat: "no-repeat",
    backgroundImage: "url("+OtakuImg2+")"
  },
  backgroundImage:{
    flex:1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing.unit * 5
  },
  title: {
    padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
})

class Home extends Component {
  state = {
    defaultPage: true
  }
  init = () => {
    if(auth.isAuthenticated()){
      this.setState({defaultPage: false})
    }else{
      this.setState({defaultPage: true})
    }
  }
  componentWillReceiveProps = () => {
    this.init()
  }
  componentDidMount = () => {
    this.init()
  }
  render() {
    const {classes} = this.props
    return (
        <div  className={classes.root}>
        {this.state.defaultPage &&
          <div  className={classes.root2}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <Typography type="headline" component="h2" className={classes.title}>
                  Home Page
                </Typography>
                <CardMedia className={classes.media} image={OtakuImg} title="NARUTO xd SASUKE"/>
                <CardContent>
                  <Typography type="body1" component="p">
                    <h1>You are welcomed to The Otaku Network . </h1>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
        }
        {!this.state.defaultPage &&
          <div  className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={8} sm={7}>
              <Newsfeed/>
            </Grid>
            <Grid item xs={6} sm={5}>
              <FindPeople/>
            </Grid>
          </Grid><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
        }
          </div>
      
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
