// should have 50 new Stories populate
import React from 'react'
import { fetchMainPosts, fetchUser } from '../utils/api.js'
import PropTypes from 'prop-types'
import timeConverter from '../utils/timeConverter.js'
import Author from './Author.js'
import Title from './Title.js'
import MetaData from './MetaData'
// import Loading from './Loading.js'

function Stories ({ newStories, user}) {
  return (
    <ul>
      {newStories.map((story)=>(
        <li key = {story.id} className = 'story-link'>
          <Title
            size = 'h3'
            url = {story.url}
            title = {story.title}
          />
          <MetaData post = {story} type = 'story'/>
        </li>
      ))}
    </ul>
  )
}

Stories.propTypes = {
  newStories : PropTypes.array.isRequired
}

export default class NewStories extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      newStories : [],
      username: null
    }
  }

  componentDidMount () {
      fetchMainPosts('new')
        .then((newStories)=>this.setState({newStories: newStories}))
        .then(()=>console.log('here',this.state))
  }

  render() {
    const { newStories, username } = this.state;

    // if (username !== null) {
    //   console.log('second', username)
    //   return (
    //     <Author
    //     />
    //   )
    // }

    return (
      <React.Fragment>
        <Stories
          newStories = {newStories}
        />
      </React.Fragment>
    )
  }
}
