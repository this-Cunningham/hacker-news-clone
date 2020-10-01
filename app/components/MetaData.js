import React from 'react'
import timeConverter from '../utils/timeConverter.js'
import { Link } from 'react-router-dom'


export default function MetaData ({ post, type }) {
  return (
    <>
    {type === 'comment-box'
      ? <p className="story-info">
          by <Link to = {`user?id=${post.by}`}>{post.by}</Link> on  <strong>{timeConverter(post.time)} </strong>
        </p>
        :
        <p className="story-info">by <Link to = {`user?id=${post.by}`}>{post.by}</Link> on   <strong>{timeConverter(post.time)} </strong> with <Link
          to = {`postComments?id=${post.id}`}
          className = 'nav-link meta-link'>
          {post.descendants}
          </Link> comments
       </p>
    }
    </>
    //need to use queryString here and pass id of the post to Comments, then comments can access post.kids and fetchComments with post.kids on mount

    //Link Comments component to the click on post.decendants--load comments component on click.  navigate to comments component
      //passing it {post} prop and grabbing descendants.kids array and storing it in state when componentDidMount
        //  fetch once component mounts, fetch using the array in state.
  )
}
