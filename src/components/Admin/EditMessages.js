import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Menu } from "semantic-ui-react";

class EditMessages extends Component {
    state = {
        activeWeek: '',
    };

    componentDidMount() {
        //add dispatch to get text message info from db
    }


    //handles updating state for selected Week
    handleWeek = (e, { name }) => {
        if (name === "week0") {
            this.setState({
                activeWeek: name,
                week: 0
            });
        } else if (name === "week1") {
            this.setState({
                activeWeek: name,
                week: 1
            });
        } else if (name === "week2") {
            this.setState({
                activeWeek: name,
                week: 2
            });
        } else if (name === "week3") {
            this.setState({
                activeWeek: name,
                week: 3
            });
        } else if (name === "week4") {
            this.setState({
                activeWeek: name,
                week: 4
            });
        } else if (name === "week5") {
            this.setState({
                activeWeek: name,
                week: 5
            });
        } else if (name === "week6") {
            this.setState({
                activeWeek: name,
                week: 6
            });
        } else if (name === "week7") {
            this.setState({
                activeWeek: name,
                week: 7
            });
        }
    };

    render() {
        return (
            <div className="editParentDiv">
                {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
                <h3>
                    Select week
        </h3>
                <div className="weekMenu">
                    <Menu fluid widths={8} tabular>
                        <Menu.Item
                            name="week0"
                            active={this.state.activeWeek === "week0"}
                            onClick={this.handleWeek}
                        >
                            Sign Up
                        </Menu.Item>
                        <Menu.Item
                            name="week1"
                            active={this.state.activeWeek === "week1"}
                            onClick={this.handleWeek}
                        >
                            Week 1
                        </Menu.Item>
                        <Menu.Item
                            name="week2"
                            active={this.state.activeWeek === "week2"}
                            onClick={this.handleWeek}
                        >
                            Week 2
                        </Menu.Item>
                        <Menu.Item
                            name="week3"
                            active={this.state.activeWeek === "week3"}
                            onClick={this.handleWeek}
                        >
                            Week 3
                        </Menu.Item>
                        <Menu.Item
                            name="week4"
                            active={this.state.activeWeek === "week4"}
                            onClick={this.handleWeek}
                        >
                            Week 4
                        </Menu.Item>
                        <Menu.Item
                            name="week5"
                            active={this.state.activeWeek === "week5"}
                            onClick={this.handleWeek}
                        >
                            Week 5
                        </Menu.Item>
                        <Menu.Item
                            name="week6"
                            active={this.state.activeWeek === "week6"}
                            onClick={this.handleWeek}
                        >
                            Post-Survey
                        </Menu.Item>
                        <Menu.Item
                            name="week7"
                            active={this.state.activeWeek === "week7"}
                            onClick={this.handleWeek}
                        >
                            Three Month
                        </Menu.Item>
                    </Menu>
                </div>
                <div style={{ border: "1px solid black" }}>
                    This div will display the message getting sent to a user on week {this.state.activeWeek}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (reduxState) => ({
    reduxState,
})

export default withRouter(connect(mapStateToProps)(EditMessages));
