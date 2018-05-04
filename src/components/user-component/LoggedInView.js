// @ts-nocheck
import React, { Component } from 'react';
import './LoggedInView.css'

class LoggedInView extends Component {
    render() {
        return (
            <div className="text-center">
                <img src={this.props.photoURL} alt="..." className="rounded-circle avatar mx-auto d-block" /><br />
                <h4>{this.props.displayName}</h4>
                <h6 className="text-secondary">{this.props.email}</h6><br />
                <label onClick={this.props.onClick} className="bg-primary rounded-circle exit text-light">
                    <i className="fa fa-sign-out-alt" />
                </label><br /><br />
                <div className="progress" style={{ height: "5px" }}>
                    <div className="progress-bar" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div><br />
                <div className="row">
                    <div className="col-4">
                        <h4>25</h4>
                        <p>
                            <label className="text-secondary no-margin">Complete</label><br />
                            <small className="text-muted">Task</small>
                        </p>
                    </div>
                    <div className="col-4">
                        <h4>75</h4>
                        <p>
                            <label className="text-secondary no-margin">To do</label><br />
                            <small className="text-muted">Task</small>
                        </p>
                    </div>
                    <div className="col-4">
                        <h4>500</h4>
                        <p>
                            <label className="text-secondary no-margin">All</label><br />
                            <small className="text-muted">Complete</small>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoggedInView;