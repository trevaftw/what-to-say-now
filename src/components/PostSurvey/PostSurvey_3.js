import React, { Component } from 'react';
import { connect } from 'react-redux';
//sweetAlert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const topMargin = {
  marginTop: '10px'
}



class PostSurvey_3 extends Component {
  state = {};

  handleChangeFor = propertyName => event => {
    console.log(this.state);
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    });
  };

  // handleClick = () => {
  //   console.log('next button clicked!', this.state);
  //   let survey2 = Object.keys(this.state);
  //   console.log(survey2.length);
  //   if (survey2.length < 2) {
  //     alert("Please Answer All Questions")
  //   } else {
  //     this.props.dispatch({ type: `SET_POST_ANSWERS`, payload: this.state })
  //     }
  // }

  handleClickNext = () => {
    console.log("next button clicked!", this.state);
    let survey2 = Object.keys(this.state);
    console.log(survey2.length);
    if (survey2.length < 2) {
      alert("Please Answer All Questions");
    } else {
      this.props.dispatch({ type: `SET_POST_ANSWERS`, payload: this.state });
      MySwal.fire({
        title: "",
        text: `Are you done filling out the form?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Submit"
      }).then(result => {
        if (result.value) {
          this.props.dispatch({
            type: "SUBMIT_POST_ANSWERS",
            payload: this.props.reduxState.answersReducer.postSurveyReducer
          });
          //console.log('true')
          this.props.history.push("/home");
        }
      });
    }
  }; // end handleClickNext

  handleClickBack = () => {
    console.log("back button clicked!");
    this.props.history.push("/postsurvey2");
  };

  render() {
    return (
      <center>
        <div>
          <label> 9. What was your favorite thing about the Challenge?</label>
          <br />
          <textarea
            onChange={this.handleChangeFor("favorite_thing")}
            style={topMargin}
            rows="10"
            cols="100"
          />
          <br />
          <label>
            10.Can we call you for more information about your experience?
          </label>
          <br />
          <input
            onChange={this.handleChangeFor("call_more_information")}
            name="q10"
            style={topMargin}
            type="radio"
            value="Yes"
          />
          Yes
          <br />
          <input
            onChange={this.handleChangeFor("call_more_information")}
            name="q10"
            type="radio"
            value="No"
          />
          No
          <br />
          <button onClick={this.handleClickBack}>Go Back</button>
          <button onClick={this.handleClickNext}>Submit</button>
        </div>
        <pre>
          {JSON.stringify(this.props.reduxState.answersReducer, null, 2)}
        </pre>
      </center>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  reduxState,
})

export default connect(mapStateToProps)(PostSurvey_3);