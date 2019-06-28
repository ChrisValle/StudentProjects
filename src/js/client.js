import React from "react";
import ReactDOM from "react-dom";
import 'babel-polyfill';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../../client/css/main.css';


import Projects from './components/Project/Projects';
import CreateGroup from './components/Project/CreateGroup';
import Students from './components/Student/Students';
import ResetToInitialState from './components/Project/ResetToInitialState';

class App extends React.Component {
  
  render() {
    const tabs = ( 
        <Tabs>
        <TabList>
          <Tab>Projects</Tab>
          <Tab>Students</Tab>
          <Tab>Create group</Tab>
          <Tab>Reset app</Tab>
        </TabList>
    
        <TabPanel>
          <Projects />
        </TabPanel>
        <TabPanel>
          <Students />
        </TabPanel>
        <TabPanel>
          <CreateGroup />
        </TabPanel>
        <TabPanel>
          <ResetToInitialState />
        </TabPanel>
      </Tabs>
    );
    return (
      <div>
        <h1>NORTHMILL HIGH SCHOOL</h1>
        {tabs}
      </div>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<App/>, app);
