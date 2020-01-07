import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

//styling
import { Menu } from "semantic-ui-react";

//components
import EditWeeklyContent from './EditWeeklyContent'
import EditMessages from './EditMessages'
import EditSurveys from './EditSurveys'

class AdminEdit extends Component {

  state = {
    activeRole: "",
  };

  handleRole = (e, { name }) => {
    if (name === "weekly") {
      this.setState({
        activeRole: name,
        role: 1
      });
    } else if (name === "messages") {
      this.setState({
        activeRole: name,
        role: 2
      });
    } else if (name === "surveys") {
      this.setState({
        activeRole: name,
        role: 3
      });
    }
  };
  render() {
    return (
      <>
        <div className="edit-choice-div">
          <div className="roleMenu">
            <Menu fluid widths={3}>
              <Menu.Item
                name="weekly"
                active={this.state.activeRole === "weekly"}
                onClick={this.handleRole}
              >
                Weekly Content
              </Menu.Item>
              <Menu.Item
                name="messages"
                active={this.state.activeRole === "messages"}
                onClick={this.handleRole}
              >
                Messages to Users
              </Menu.Item>
              <Menu.Item
                name="surveys"
                active={this.state.activeRole === "surveys"}
                onClick={this.handleRole}
              >
                Surveys
              </Menu.Item>
            </Menu>
          </div>
        </div>
        {this.state.activeRole === "weekly" &&
          <EditWeeklyContent />
        }
        {this.state.activeRole === "messages" &&
          <EditMessages />
        }
        {this.state.activeRole === "surveys" &&
          <EditSurveys />
        }
      </>
    )
  }
}
const mapStateToProps = (reduxState) => ({
  reduxState,
})

export default withRouter(connect(mapStateToProps)(AdminEdit));
