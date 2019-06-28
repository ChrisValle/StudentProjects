import React from 'react';
import 'babel-polyfill';


import { getProjects, addStudentToGroup } from '../../api/projectService';
import { async } from 'q';
//change students array from hardcoded ID:s to nodes that you collect from studentService.
export default class Projects extends React.Component {
  state = {
    projects: [],
    students: ['1ef6cc17-78d5-4afb-a5e8-78177f1375f2','0ecb7180-e4d7-4092-80d1-53c0ee8427a8','c1e0b7a4-ea78-43b3-a963-0e754e958711','3260be1f-33a1-41b9-9b66-2ce5f8912637'],
    addMember: false
  };

  componentDidMount = async () => {  //if initializes correct you get back projects
    this.getProjects();
  };

  getProjects = async () => {
    const projects = await getProjects(); //waits until project is returned, set project to state
    this.setState({ projects });
  }

  addStudentToGroup = async (projectId, studentId) => {
    await addStudentToGroup(projectId, studentId); //
    getProjects();
  }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max)); //we get a random student, put in group
  }

  onSubmit = (group) => {
    const ranInt = this.getRandomInt(4);
    console.log(group);
    if(group.students.length > 0) { //if student group is larger than 0, 
      group.students.filter(student => {
        if(student.id !== this.state.students[ranInt]) { //checking if student is already in group
          this.addStudentToGroup(group.id, this.state.students[ranInt]); //always a new person
        }
      });
    }else {
      this.addStudentToGroup(group.id, this.state.students[ranInt]);//if there are no students, add random hardcoded studentid
    }
  }

  render() {
    const { projects } = this.state;
  
    return (
      <div class="project-list">
        {projects &&
          projects.map(project => (
          <div class="project-list-item" key={project.id}>
            <h3>{project.name}</h3>
            {project.groups.map(group => (
              <div class="project-list-group" key={group.id}>
                <p>{group.name}</p>
                <button class="project-button" onClick={() => this.onSubmit(group)}>Join group</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}