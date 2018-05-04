import React, { Component } from 'react';
import db from '../../database/Fire'
import UserSessionInstance from '../user-component/UserSession'


class Teams extends Component {

    constructor(props) {
        super(props)
        this.state = { teams: [] }
        this.isFirstTime = true;
    }

    componentDidMount() {
        UserSessionInstance.LoginHandler.subscribe((user) => {
            this.user = user;
            this.GetUserTeams();
        })

        UserSessionInstance.LogoutHandler.subscribe((user)=>{
            this.setState({teams:[]})
        })

        db.db.collection("userTeams").onSnapshot(querySnapshot => {
            if (!this.isFirstTime) {
                this.GetUserTeams();
            } else {
                this.isFirstTime = !this.isFirstTime;
            }
        })
    }

    GetUserTeams() {
        this.setState({ teams: [] })
        db.db.collection("userTeams").where("user", "==", this.user.uid).get()
            .then(data => {
                data.forEach(team => {
                    this.GetTeam(team);
                })
            })
    }

    GetTeam(team) {
        db.db.collection("teams").doc(team.data().team).get()
            .then(data => {
                console.log(data.data())
                this.setState({ teams: [{ ...data.data(), key: team.data().team }, ...this.state.teams] })
            })
    }

    render() {
        return (
            <div className="card border-radius-0 no-border-top">
                <div className="card-body">
                    <h4>Teams</h4>
                    <div>
                        <ul className="list-unstyled">
                            {this.state.teams.map((m) =>
                                <li key={m.key} className="d-inline p-2"> 
                                    <i className="far fa-circle" style={{ color: m.color }}></i> 
                                    <span> {m.name}</span>
                                </li>
                            )
                            }
                        </ul>
                    </div>
                </div>
            </div >)
    }
}

export default Teams;