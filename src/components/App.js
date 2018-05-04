import React, { Component } from 'react';
import Task from './task-component/Task';
import User from './user-component/User';
import Projects from './projects-component/Projects';
import Teams from './team-component/Teams'
import './App.css';
class App extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 no-padding full-height">
            <div className="card border-radius-0">
              <div className="card-body">
                <h4 className="text-secondary text-center">TASK MANAGER</h4>
              </div>
            </div>
            <User />
            <Projects />
            <Teams />
          </div>
          <div className="col-10">
            <div className="row">
              <div className="col no-padding ">
                <div className="card border-radius-0">
                  <div className="card-body">
                    <h4 className="text-secondary text-center">TASK MANAGER</h4>
                  </div>
                </div>
              </div>
            </div>
            <Task />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
