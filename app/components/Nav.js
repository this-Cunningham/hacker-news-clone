import React from 'react'
import { Router, NavLink } from 'react-router-dom'

export default function Nav () {
    return (
        <ul className = 'row nav'>
          <li className="space-around">
            <NavLink to = '/' className = 'nav-link'> Top </NavLink>
          </li>
          <li className="space-around">
            <NavLink to = '/newstories' className = 'nav-link' > New </NavLink>
          </li>
        </ul>
    )
}
