import React from 'react';
import 'babel-polyfill';


export default class Header extends React.Component {

  render() {
    return (
      <header>
        <nav>
          <ul>
            <li><a href="/Projects">Projects</a></li>
            <li><a href="#">Students</a></li>
          </ul>
        </nav>
      </header>
    );
  }
}