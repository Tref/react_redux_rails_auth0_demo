import React, { PropTypes as T } from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import AuthService from '../../utils/AuthService'
import styles from './styles.module.css'

export class Messages extends React.Component {
  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      publicMsg: "",
      privateMsg: ""
    }
  }

  componentDidMount(){
    const { auth } = this.props

    // public http request
    fetch('http://localhost:3002/api/public')
      .then(response => response.json())
      .then(response => this.setState({publicMsg: response.message}))
    
    // using auth to send an http request with authorization header
    auth.fetch('http://localhost:3002/api/private')
      .then(response => this.setState({privateMsg: response.message}))
      .catch(error => this.setState({privateMsg: "" + error}))

  }

  render(){
    // if (this.state.events) { debugger }
    // console.log("STATE: ", this.state)
    // console.log("----")

    return (
      <div>
        <h3>Messages</h3>
        <ListGroup className={styles.root}>

          <ListGroupItem header="/api/public response">
            <i>{this.state.publicMsg}</i>
          </ListGroupItem>
          <ListGroupItem header="/api/private response">
            <i>{this.state.privateMsg}</i>
          </ListGroupItem>

        </ListGroup>
      </div>
    )
  }
}

export default Messages;


// {this.state.events && this.state.events.map((event, i) =>
//   <ListGroupItem key={i} header={event.title}>
//   {event.start_time}
//   {
//     event.image && event.image.small && 
//     <img src={event.image.small.url} role="presentation" />
//   }
    
//   </ListGroupItem>
// )}