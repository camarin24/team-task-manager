import React, { Component } from 'react';
import './User.css'
import db from '../../database/Fire'
import firebase from 'firebase'
import LoggedInView from './LoggedInView'
import UserSessionInstance from './UserSession'

class User extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            isLoggedIn: false,
            displayName: "NA",
            email: "NA",
            photoURL: ""
        }
    }

    componentDidMount() {

        UserSessionInstance.LoginHandler.subscribe((user) => {
            this.setState({
                displayName: user.displayName, photoURL: user.photoURL, isLoggedIn: true, email: user.email
            })
        })

        UserSessionInstance.LogoutHandler.subscribe((user) => {
            this.setState({
                displayName: "NA", email: "NA", isLoggedIn: false
            })
        })
    }

    handleLogin() {
        firebase.auth().signInWithPopup(db.loginProvider)
            .then((result) => {
                this.InsertOrUpdateUser(result)
            }).catch(function (error) {
                console.error("Ha ocurrido un error al iniciar sesion", error);
            });

    }

    InsertOrUpdateUser(result) {
        if (result && result.additionalUserInfo) {
            if (result.additionalUserInfo.isNewUser) {
                this.InsertUser(result);
            }
        }
    }

    InsertUser(result) {
        let user = result.user;
        db.db.collection("users").add({
            displayName: user.displayName,
            uid: user.uid,
            photoURL: user.photoURL
        });
    }

    handleLogout() {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
    }

    render() {
        return (
            <div className="card border-radius-0 no-border-top">
                <div className="card-body">
                    {
                        this.state.isLoggedIn ?
                            (
                                <LoggedInView
                                    email={this.state.email}
                                    photoURL={this.state.photoURL}
                                    displayName={this.state.displayName}
                                    onClick={this.handleLogout} />
                            )
                            :
                            (
                                <button onClick={this.handleLogin}>Login</button>
                            )
                    }
                </div>
            </div >)
    }
}

export default User;