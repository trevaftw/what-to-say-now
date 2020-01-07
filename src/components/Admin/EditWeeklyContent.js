import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AdminEditTable from './AdminEditTable';

import { Menu } from "semantic-ui-react";

class EditWeeklyContent extends Component {
  state = {
    activeRole: "",
    activeAge: "",
    activeWeek: '',
  };

  componentDidMount() {
    this.props.dispatch({ type: "GET_EDIT_CONTENT" });
  }

  handleClick = propertyName => event => {
    this.setState({
      [propertyName]: event.target.value
    });
  };

  //handles updating state for selected Role
  handleRole = (e, { name }) => {
    if (name === "role1") {
      this.setState({
        activeRole: name,
        role: 1
      });
    } else if (name === "role2") {
      this.setState({
        activeRole: name,
        role: 2
      });
    } else if (name === "role3") {
      this.setState({
        activeRole: name,
        role: 3
      });
    }
  };

  //handles updating state for selected Age
  handleAge = (e, { name }) => {
    if (name === "age1") {
      this.setState({
        activeAge: name,
        age: 1
      });
    } else if (name === "age2") {
      this.setState({
        activeAge: name,
        age: 2
      });
    } else if (name === "age3") {
      this.setState({
        activeAge: name,
        age: 3
      });
    }
  };

  //handles updating state for selected Week
  handleWeek = (e, { name }) => {
    if (name === "week1") {
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
  }};

  render() {
    return (
      <div className="editParentDiv">
        {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
        <h3>
          Select a role, age group, and week to view and edit content.
        </h3>
        <div className="role-age-menu-div">
          <div className="roleMenu">
            <Menu fluid widths={3}>
              <Menu.Item
                name="role1"
                active={this.state.activeRole === "role1"}
                onClick={this.handleRole}
              >
                Coach
              </Menu.Item>
              <Menu.Item
                name="role2"
                active={this.state.activeRole === "role2"}
                onClick={this.handleRole}
              >
                Pediatrician
              </Menu.Item>
              <Menu.Item
                name="role3"
                active={this.state.activeRole === "role3"}
                onClick={this.handleRole}
              >
                Parents
              </Menu.Item>
            </Menu>
          </div>

          <div className="ageMenu">
            <Menu fluid widths={3}>
              <Menu.Item
                name="age1"
                active={this.state.activeAge === "age1"}
                onClick={this.handleAge}
              >
                Ages 6-9
              </Menu.Item>
              <Menu.Item
                name="age2"
                active={this.state.activeAge === "age2"}
                onClick={this.handleAge}
              >
                Ages 10-13
              </Menu.Item>
              <Menu.Item
                name="age3"
                active={this.state.activeAge === "age3"}
                onClick={this.handleAge}
              >
                Ages 14-18
              </Menu.Item>
            </Menu>
          </div>
        </div>

        <div className="weekMenu">
          <Menu fluid widths={5} tabular>
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
          </Menu>
        </div>
        <br />
        <br />

        {/* content that is displayed renders conditionally based on 
        local state. The local state must contain a value for 
        role, age, and week; then the reducer is mapped to displaye
        the selected content.  */}
        <div>
          <ul>
            {this.state.role && this.state.age && this.state.week ? (
              <>
                {this.props.reduxState.adminReducer.editContentReducer.map(
                  content => {
                    return (
                      Number(this.state.role) === Number(content.role_id) &&
                      Number(this.state.age) ===Number(content.ageGroup_id) &&
                      Number(this.state.week) === Number(content.week) && 
                      (
                        <AdminEditTable
                          content={content}
                          key={content.id}
                        />
                      )
                    );
                  }
                )}
              </>
            ) : (
              <>
                <AdminEditTable />
              </>
            )}
          </ul>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (reduxState) => ({
  reduxState,
})

export default withRouter(connect(mapStateToProps)(EditWeeklyContent));
