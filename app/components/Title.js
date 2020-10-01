import React from 'react'
import PropTypes from 'prop-types'

export default function Title ({size, url, title}) {
  const Header = `${size}`
  return (
      <a href = {`${url}`} className = 'story-title'>
        <Header>{title}</Header>
      </a>
  )
}
Title.propTypes = {
  size: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}
