import React from 'react'
import Loading from './Loading.js'
import { fetchComments, fetchItem } from '../utils/api.js'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MetaData from './MetaData'
import Title from './Title'

export default class Comments extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      post: null,
      loadingPost: true,
      comments: [],
      loadingComment: true,
      error: null
    }
  }

  componentDidMount () {
     const { id } = queryString.parse(this.props.location.search);
     const { post } = this.state

    fetchItem(id) //this.props.id as argument
    .then((post)=>{
      this.setState({post, loadingPost: false, error: null}, ()=>{
        console.log('comments',this.state)
      })
      //fetchComments takes in an array of comments ()
      return fetchComments(post.kids)
    })
    .catch((error)=>console.log('error fetching post', error))
    .then((comments)=>this.setState({comments, loadingComment: false}, ()=>{
      console.log(this.state)
    }))
  }

  render() {
    const { loadingPost, loadingComment, comments, post } = this.state;
    return (

      <>
      {loadingPost === true ?
        <Loading text = 'Loading Post'/> :
        <div className = 'comment-header'>
          <Title url = {post.url} title = {post.title} size = {'h1'}
            className = ''/>
          <MetaData post = {post} type = 'title'/>
        </div>
      }

      {
      loadingComment === true ?
        <Loading text = 'Loading Comments' /> :
          <ul>
            { //if comments is truthy, render map <li>
              comments && (
              comments.map((comment)=>{
                return (
                  <li key = {comment.id} className = 'comment-box'>
                    <MetaData post = {comment} type = 'comment-box' />
                    <p dangerouslySetInnerHTML={{__html: comment.text}}/>
                  </li>
                )
              })
            )}

          {//if comments is not truthy, render div
            !comments && <div>No Comments for this Post!</div>}
        </ul>
      }
      </>
    )
  }
}
