import React, { Component } from 'react';
import { connect } from 'react-redux';

import './signUp.css';

import Header from './signUp_header';
import { Input, Button } from "semantic-ui-react";

//sweetAlert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class signUp_5 extends Component {
  state = {
    why_are_you_participating: this.props.reduxState.answersReducer.signupReducer.why_are_you_participating || '',
    why_are_you_participating_other: this.props.reduxState.answersReducer.signupReducer.why_are_you_participating_other || '',
    how_did_you_find_us: this.props.reduxState.answersReducer.signupReducer.how_did_you_find_us || '',
    how_did_you_find_us_referral: this.props.reduxState.answersReducer.signupReducer.how_did_you_find_us_referral || '',
    how_did_you_find_us_other: this.props.reduxState.answersReducer.signupReducer.how_did_you_find_us_other || ''
  }


  handleChange = (propertyName) => (event) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    })
  }

  handleClickBack = () => {
    this.props.dispatch({ type: `SET_SIGNUP_ANSWERS`, payload: this.state })
    this.props.history.push('/signup4');
  }

  handleClickNext = () => {
    let survey = this.state
    //everytime next is clicked, it resets missingAnswers to an empty array, then checks each question to see if it has an answer
    //if it is blank, it adds it to the missing array, then at the end we check if the array has a length (aka if any ques aren't answered)
    //if it has no lnegth, it means every question was answered and we can move on, 
    //if it has length, it alerts us to what. 
    let missingAnswers = []

    if (survey.how_did_you_find_us.trim() === '') {
      missingAnswers.push('Please answer question 10. ')
    } else if (
      survey.how_did_you_find_us === 'Referral' &&
      survey.how_did_you_find_us_referral.trim() === ''
    ) {
      missingAnswers.push('For question 10, please let us know who referred you. ')
    } else if (
      survey.how_did_you_find_us === 'Other' &&
      survey.how_did_you_find_us_other.trim() === ''
    ) {
      missingAnswers.push('For question 10, please tell us more. ')
    }

    if (survey.why_are_you_participating.trim() === '') {
      missingAnswers.push('Please answer question 11. ')
    } else if (
      survey.why_are_you_participating === 'Other' &&
      survey.why_are_you_participating_other.trim() === ''
    ) {
      missingAnswers.push('For question 11, please let us why know you are participating.')
    }

    if (missingAnswers.length > 0) {
      alert(missingAnswers.join(' \n'))
    } else {
      this.props.dispatch({ type: `SET_SIGNUP_ANSWERS`, payload: this.state })
      MySwal.fire({
        title: '',
        width: '300px',
        html: `
        Thank you! <br />If you do not receive a confirmation email after hitting “submit,” please email us at <a href="mailto:hello@withall.org">hello@withall.org</a>.
        `,
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Submit'
      }).then((result) => {
        if (result.value) {
          this.props.dispatch({ type: 'SUBMIT_SIGNUP_ANSWERS', payload: this.props.reduxState.answersReducer.signupReducer })
          this.props.history.push('/home');
        }
      }
      )

    }


  } // end handleClickNext 

  render() {
    return (
      <>
        <Header width={'100%'} /><br />
        <div className="signup-card"><br />
          <span className="survey-questions">10. How did you find us?</span>
          <label className="question-label">choose one</label>
          <select className="radio-button radio-select" onChange={this.handleChange('how_did_you_find_us')} value={this.state.how_did_you_find_us} >
            <option>--choose one--</option>
            <option value="Girls on the Run">Girls on the Run</option>
            <option value="Wayzata Girls Basketball Association">Wayzata Girls Basketball Association</option>
            <option value="The Loppet Foundation">The Loppet Foundation</option>
            <option value="Fusion Soccer Club MN">Fusion Soccer Club MN</option>
            <option value="Jessie Diggins">Jessie Diggins</option>
            <option value="Internet search">Internet search</option>
            <option value="Social Media">Social Media</option>
            <option value="Mail">Mail</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </select><br />
          {this.state.how_did_you_find_us === 'Referral' &&
            <>
              <label className="question-label">If referral, please let us know who:</label>
              <Input
                name="how_did_you_find_us_referral"
                className="radio-button mobile-input radio-select"
                onChange={this.handleChange('how_did_you_find_us_referral')}
                placeholder="Who were you referred by?"
                value={this.state.how_did_you_find_us_referral} />
              <br />
            </>
          }
          {this.state.how_did_you_find_us === 'Other' &&
            <>
              <label className="question-label">If other, please tell us more:</label>
              <Input
                name="how_did_you_find_us_other"
                className="radio-button mobile-input radio-select"
                onChange={this.handleChange('how_did_you_find_us_other')}
                placeholder="How did you find us?"
                value={this.state.how_did_you_find_us_other} />
              <br />
            </>
          }
          <br />
          <span className="survey-questions">11. Why are you particpating in the "What to say" Coaches Challenge?</span>
          <label className="question-label">choose one</label>
          <div className="radio-answer-pair">
            <input
              onChange={this.handleChange('why_are_you_participating')}
              type="radio"
              className="radio-button"
              checked={this.state.why_are_you_participating === "I’m eager for guidance. I know how I talk to my athletes matters, but I want help knowing the right words/phrases to say about food and body image."}
              name="q1"
              id="ques11answer1"
              value="I’m eager for guidance. I know how I talk to my athletes matters, but I want help knowing the right words/phrases to say about food and body image."
            />
            <label
              htmlFor="ques11answer1"
              className="radio-answer">
              I’m eager for guidance. I know how I talk to my athletes matters, but I want help knowing the right words/phrases to say about food and body image.
            </label>
          </div>

          <div className="radio-answer-pair">
            <input
              onChange={this.handleChange('why_are_you_participating')}
              type="radio"
              className="radio-button"
              checked={this.state.why_are_you_participating === "I’m just curious. I know how I talk to my athletes matters, but I feel like my current approach/language is good. Maybe I’ll learn something."}
              name="q1"
              id="ques11answer2"
              value="I’m just curious. I know how I talk to my athletes matters, but I feel like my current approach/language is good. Maybe I’ll learn something."
            />
            <label
              htmlFor="ques11answer2"
              className="radio-answer">
              I’m just curious. I know how I talk to my athletes matters, but I feel like my current approach/language is good. Maybe I’ll learn something.
              </label>
          </div>

          <div className="radio-answer-pair">
            <input
              onChange={this.handleChange('why_are_you_participating')}
              type="radio"
              className="radio-button"
              checked={this.state.why_are_you_participating === "This is not a priority issue for me as a coach, but I’m doing this because I was asked to participate."}
              name="q1"
              id="ques11answer3"
              value="This is not a priority issue for me as a coach, but I’m doing this because I was asked to participate." />
            <label htmlFor="ques11answer3" className="radio-answer">This is not a priority issue for me as a coach, but I’m doing this because I was asked to participate.</label>
          </div>

          <div className="radio-answer-pair">
            <input
              onChange={this.handleChange('why_are_you_participating')}
              type="radio"
              className="radio-button"
              checked={this.state.why_are_you_participating === "Other"}
              id="ques11answer4"
              value="Other"
              name="q1" /><label htmlFor="ques11answer4" className="radio-answer">I have other reasons for participating. They are:</label>
          </div>
          {this.state.why_are_you_participating === "Other" &&
            <>
              <Input
                name="why_are_you_participating_other"
                className="radio-button mobile-input radio-select"
                onChange={this.handleChange('why_are_you_participating_other')}
                value={this.state.why_are_you_participating_other}
                placeholder="My reasons for participating are..."
              ></Input><br />
            </>
          }
          <br />
        </div>
        <br />
        <div className="signup-prev-next-div">
          <Button onClick={this.handleClickBack}>Back</Button>
          <Button onClick={this.handleClickNext}>Finish</Button>
        </div>
      </>
    );
  }
}
const mapStateToProps = (reduxState) => ({
  reduxState,
})

export default connect(mapStateToProps)(signUp_5);