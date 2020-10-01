import React from 'react'
import { fetchUser, fetchPosts } from '../utils/api.js'
import timeConverter from '../utils/timeConverter.js'
import PropTypes from 'prop-types'
import Loading from './Loading.js'
import MetaData from './MetaData.js'
import Title from './Title.js'
import queryString from 'query-string'
import { Link } from 'react-router-dom'


//This component will receive a username prop
function UserInfo ({user}) {
  return (
    <div className="user-data">
      <h2 className = 'username'>{user.id}</h2>
      <p>Joined <strong>{timeConverter(user.created)}</strong> has <strong>{user.karma}</strong> karma</p>
      <p dangerouslySetInnerHTML = {{__html: user.about}}/>
      <h2 className="header-lg">POSTS</h2>
      <div></div>
    </div>
  )
}

function Posts ({posts}) {
  return (
    <ul>
      {posts.map((post)=>{
        return (
          <li className="story-link" key = {post.id}>
            <Title url = {post.url} title = {post.title} size = {'h3'}/>
            <MetaData post = {post} type = 'author'/>
          </li>
        )
      })}
    </ul>
  )
}

export default class Author extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: null, //unable to access the object if initial state.user = null
      loadingUser: true,
      posts: null,
      loadingPosts: true,
      error: null,
      commentState: false
    }
  }

  componentDidMount () {
    const { id } = queryString.parse(this.props.location.search)

    fetchUser(id)
      .then((id)=>{
        this.setState({id, loadingUser: false})

        return fetchPosts(id.submitted.slice(0,30))
      })
      .then((posts)=>this.setState({
        posts,
        loadingPosts: false,
        error: null
      }, ()=>console.log('this.state.posts', this.state.posts)))
    }

  render () {
    const { id, posts, loadingUser, loadingPosts } = this.state;

    return (
      <>
        {loadingUser === true ?
            <Loading text = 'Fetching User Data...' /> :
            <UserInfo user = {id}/>
        }
        {loadingPosts === true ?

          <Loading text = 'Fetching Posts...' /> :
          <>
            {//if posts.length === 0, render...
              posts.length === 0 && (
              <div>This User Hasn't Posted Yet!</div>
              )
              //the reason this works is because can only render one of these, so if posts.length === 0 then cannot render anything after the div
            }

            {//else render below...
              <Posts posts = {posts} />}
          </>
        }
      </>
    )
  }
}
