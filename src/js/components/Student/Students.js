import React from 'react';
import 'babel-polyfill';


import { getStudents, getStudentProjects } from '../../api/studentService';
import Header from '../Containers/Header';
import { async } from 'q';


export default class Students extends React.Component {
  state = {
    students: [],
    studentProject: [],
  };


  componentDidMount = async () => { //returns all students from server
    this.getStudents();
  };

  getStudents = async () => {
    const students = await getStudents();
    students.map(student => { 
       this.getStudentProjects(student, students); //for every student we get back their projects, can't set states here
    });
  }

  getStudentProjects = async (stud, students) => {
    const studentProject = await getStudentProjects(stud.id); //return student groups, now can set state
    this.state.students.filter(student => {
      if(student.id === stud.id) {
       student.studentGroups = studentProject; //return all students and groups associated with them, add new group within same subject with different name
        //students.studentGroups = studentProject;
      }
    });
    this.setState({ students });
  }

  

  render() {
    return (
      <div class="student-list">
        {this.state.students &&
          this.state.students.map(student => (
          <div class="student-list-item" key={student.id}>
              <h3>{student.firstName} {student.lastName} </h3>
              {student.studentGroups.map(group => (
                <div key={group.id}>
                  <h3>Project: {group.name}</h3>
                  <div>
                    {group.groups.map(g => (
                      <p key={g.id}>{g.name}</p>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    );
  }
}