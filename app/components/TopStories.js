// should have 50 new Stories populate
import React from 'react'
import { fetchMainPosts, fetchUser } from '../utils/api.js'
import PropTypes from 'prop-types'
import timeConverter from '../utils/timeConverter.js'
import Title from './Title'
import MetaData from './MetaData'
// import Loading from './Loading.js'

function Stories ({ topStories, user, fetchUser }) {
  return (
    <ul>
      {topStories.map((story)=>(
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

//when click on the author of the post, load 'USER' component. where we can see the user data/posts

Stories.propTypes = {
  topStories : PropTypes.array.isRequired
}

export default class TopStories extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      topStories : []
    }
  }

  componentDidMount () {
    fetchMainPosts('top')
      .then((topStories)=>this.setState({topStories: topStories}))
      .then(()=>console.log(this.state))
  }

  render() {
    const { topStories } = this.state;

    return (
      <React.Fragment>
        <Stories topStories = {topStories} />
      </React.Fragment>
    )
  }
}
