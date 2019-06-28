import React from 'react';
import 'babel-polyfill';


import { createGroup, getProjects } from '../../api/projectService';

export default class Projects extends React.Component {
  state = {
    projects: [],
    groupName: '',
    activeProject: 'English',
    projectId: '',
  }

  componentDidMount = async () => {
    this.getProjects();
  }

  createGroup = async (projectId, groupName) => {
    await createGroup(projectId, groupName); //after creating group, get all projects and groups within and update on frontend
    getProjects();
  }

  getProjects = async () => {
    const projects = await getProjects();
    this.setState({ projects });
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value //set groupname to input value
    });
  };

  onSubmit = e => {
    e.preventDefault();
  
    this.state.projects.map(project => {
      if(project.name === this.state.activeProject) { //go through all current projects, find project within array thats equal to the selected project
        this.state.projectId = project.id;
        return;
      }
    });
    
    if(this.state.projectId && this.state.groupName) {
      this.createGroup(this.state.projectId, this.state.groupName); //if project id and group name are set, then can we create group
    }
  }

  render() {
    const { projects } = this.state;
    return (
      <div class="create-group">
        <form class="create-group-form">
          <select onChange={e => this.setState({ activeProject: e.target.value }) }>
          {projects &&
            projects.map(project => (
            <option id={project.id} key={project.id}>{project.name}</option>
          ))}
          </select>
          <input 
            type="text"
            name="groupName"
            placeholder="Group name"
            value={this.state.groupName}
            onChange={e => this.change(e)} //e is event (input)
          />
          <button class="create-button" onClick={e => this.onSubmit(e)}>Create group</button>
        </form>
      </div>
    );
  }
}