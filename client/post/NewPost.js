import React, {Component} from 'react'
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import OtakuImg3 from './../assets/images/otaku4.png'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {create} from './api-post.js'
import auth from './../auth/auth-helper'
import IconButton from 'material-ui/IconButton'
import PhotoCamera from 'material-ui-icons/PhotoCamera'

const styles = theme => ({
  root: {
    
    background: 'linear-gradient(black,gray,white)',
    backgroundColor: '#efefef',
    padding: `${theme.spacing.unit*3}px 0px 1px`,
    backgroundImage: "url("+OtakuImg3+")",
    backgroundSize: 150,
    backgroundRepeat: "no-repeat"
  },
  card: {
    maxWidth:600,
    margin: 'auto',
    marginBottom: theme.spacing.unit*3,
    boxShadow: 'none'
  },
  cardContent: {
    margin: theme.spacing.unit*3,
    background: 'linear-gradient(white,gray)',
    paddingTop: 0,
    paddingBottom: 0
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8
  },
  photoButton: {
    height: 30,
    marginBottom: 5
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing.unit*2,
    marginRight: theme.spacing.unit*2,
    width: '90%'
  },
  submit: {
    margin: theme.spacing.unit * 2
  },
  filename:{
    verticalAlign: 'super'
  }
})

class NewPost extends Component {
  state = {
    text: '',
    photo: '',
    error: '',
    user: {}
  }

  componentDidMount = () => {
    this.postData = new FormData()
    this.setState({user: auth.isAuthenticated().user})
  }
  clickPost = () => {
    const jwt = auth.isAuthenticated()
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.postData).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({text:'', photo: ''})
        this.props.addUpdate(data)
      }
    })
  }
  handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    this.postData.set(name, value)
    this.setState({ [name]: value })
  }
  render() {
    const {classes} = this.props
    return (<div className={classes.root}>
      <Card className={classes.card}>
      <CardHeader
            avatar={
              <Avatar src={'/api/users/photo/'+this.state.user._id}/>
            }
            title={this.state.user.name}
            className={classes.cardHeader}
          />
      <CardContent className={classes.cardContent}>
        <TextField
            placeholder="What's on your mind ..."
            multiline
            rows="3"
            value={this.state.text}
            onChange={this.handleChange('text')}
            className={classes.textField}
            margin="normal"
        />
        <input accept="image/*" onChange={this.handleChange('photo')} className={classes.input} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <IconButton color="secondary" className={classes.photoButton} component="span">
            <PhotoCamera />
          </IconButton>
        </label> <span className={classes.filename}>{this.state.photo ? this.state.photo.name : ''}</span>
        { this.state.error && (<Typography component="p" color="error">
            <Icon color="error" className={classes.error}>error</Icon>
              {this.state.error}
            </Typography>)
        }
      </CardContent>
      <CardActions>
        <Button color="primary" variant="raised" disabled={this.state.text === ''} onClick={this.clickPost} className={classes.submit}>POST</Button>
      </CardActions>
    </Card>
  </div>)
  }
}

NewPost.propTypes = {
  classes: PropTypes.object.isRequired,
  addUpdate: PropTypes.func.isRequired
}

export default withStyles(styles)(NewPost)
