import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from '../../routes'
import DevTools from '../../utils/DevTools'
import { Router } from 'react-router'
import styles from './styles.module.css'

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <div className="container" style={{fontFamily: "Open Sans"}}> 
          <Router history={history} routes={routes} />
          {/*<DevTools />*/}
          {!window.devToolsExtension ? <DevTools /> : null}
        </div>
      </Provider>
    )
  }
}