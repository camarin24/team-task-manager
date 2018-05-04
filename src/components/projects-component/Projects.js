import React, { Component } from 'react';
import db from '../../database/Fire'
import UserSessionInstance from '../user-component/UserSession'


class Projects extends Component {

    constructor(props) {
        super(props)
        this.state = { projects: [],loading:true }
    }

    componentDidMount() {
        UserSessionInstance.LoginHandler.subscribe((user) => {
            this.user = user;
            this.GetUserTeams();
        })


        UserSessionInstance.LogoutHandler.subscribe((user)=>{
            this.RestartState();
        })
    }

    RestartState() {
        this.setState({ projects: [] });
    }

    GetUserTeams() {
        this.setState({projects:[]})
        db.db.collection("userTeams").where("user", "==", this.user.uid).get()
            .then(data => {
                data.forEach(team => {
                    this.GetUserProjects(team);
                })
            })
    }

    GetUserProjects(team) {
        db.db.collection("projects").where("team", "==", team.data().team).get()
            .then(projects => {
                projects.forEach(project => {
                    let doc = { name: project.data().name, key: project.id, color: project.data().color };
                    this.setState({ projects: [doc, ...this.state.projects] });
                });
            });
    }

    render() {
        return (
            <div className="card border-radius-0 no-border-top">
                <div className="card-body">
                    <h4>Projects</h4>
                    <div className="paddig-">
                        <ul className="list-unstyled">
                            {this.state.projects.map((m) => {
                                return <li key={m.key}> <i className="far fa-circle" style={{ color: m.color }}></i> {m.name}</li>
                            })
                            }
                        </ul>
                    </div>
                </div>
            </div >)
    }
}

export default Projects;