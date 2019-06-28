import React from 'react';
import 'babel-polyfill';


import { ResetToInitialState } from '../../api/projectService';

export default class Projects extends React.Component {
  state = {
    initialState: ''
  };

  resetToInitialState = async () => {
    const initialState = await ResetToInitialState(); //from backend
    this.setState({initialState});
  }


  onSubmit = () => {
    this.resetToInitialState();
  }

  render() {
    return (
      <div>
        <h1>Reset To Initial State</h1>
        <h2>--Warning--</h2>
        <p>This will delete all the data you have added, there is no backup.</p>
        <button onClick={() => this.onSubmit()}>RESET</button>
        <h3>{this.state.initialState}</h3>
      </div>
    );
  }
}