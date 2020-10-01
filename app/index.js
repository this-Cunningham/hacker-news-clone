import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Nav from './components/Nav.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './components/Loading.js'

const NewStories = React.lazy(()=>import('./components/NewStories.js'))
const TopStories = React.lazy(()=>import('./components/TopStories.js'))
const Comments = React.lazy(()=> import('./components/Comments.js'))
const Author = React.lazy(()=>import('./components/Author.js'))

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
        <Router>
          <React.Suspense fallback = {Loading}>
            <Nav />
            <Switch>
              <Route exact path = '/' component = {TopStories} />
              <Route exact path = '/newstories' component = {NewStories} />
              <Route path = '/user' component = {Author} />
              <Route path = '/postComments' component = {Comments} />
            </Switch>
          </React.Suspense>
        </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
