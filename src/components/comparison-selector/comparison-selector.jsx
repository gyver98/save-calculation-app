import React, {Component} from 'react';
import STATIC_COPY from '../../constants/copy.js';
import Waypoint from 'react-waypoint';
import Steps from '../steps/steps.jsx';
//import Animation from '../../constants/animation.js';

import './comparison-selector.scss';

const COPY_TEXT = STATIC_COPY.COMPARISON_SELECTOR;

class ComparisonSelector extends Component {
    
    constructor() {
        super()
        this.state = {
            switchChoice: 'UploadBill',
            choiceText: COPY_TEXT.CHOICE_COPY.UPLOAD_BILL.COPY,
            animating: false
        }
        this.switchChoice = this.switchChoice.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleEnter() {
        console.log('ComparisonSelector entered')
        this.setState({animating: true})
    }
    
    handleClick = (link) => {
        window.location.hash = `#${link}`;
        this.props.viewLink(link)
    }

    switchChoice(choice) {
        let choiceText;
        if (choice === 'UploadBill') {
            choiceText = COPY_TEXT.CHOICE_COPY.UPLOAD_BILL.COPY
        } else {
            choiceText = COPY_TEXT.CHOICE_COPY.MANUAL_ENTRY.COPY
        }
        this.setState({switchChoice: choice, choiceText: choiceText});
    }

    render() {
        
        return (
            <Waypoint onEnter={this.handleEnter}>
                <section className="view comparison-selector">
                    <div className="container">
                    <p className="hidden-xs">Select your comparison option</p>
                    <div className={`col-wrap selection ${this.state.animating ? 'anim': '' }`}>
                        <div className="col col-one">
                            <div tabIndex="0" className={this.state.switchChoice === 'UploadBill' ? 'switch-choice active' : 'switch-choice'} onClick={() => this.switchChoice('UploadBill')}>
                                <div className="icon-circle">A</div><h4>{COPY_TEXT.CHOICE_COPY.UPLOAD_BILL.HEADER}</h4>
                            </div>
                            <hr/>
                            <div tabIndex="0" className={this.state.switchChoice === 'ComparisonDetailsForm' ? 'switch-choice active' : 'switch-choice'}  onClick={() => this.switchChoice('ComparisonDetailsForm')}>
                                <div className="icon-circle">B</div><h4>{COPY_TEXT.CHOICE_COPY.MANUAL_ENTRY.HEADER}</h4>
                            </div>
                        </div>
                        <div className="col col-two">
                            <Steps/>
                            <div className="copy">
                                {this.state.choiceText.map((item, i) => {
                                    return <p key={i}>{item}</p>
                                })}
                            </div>
                            <button onClick={() => this.handleClick(this.state.switchChoice)} className="btn btn-default">Use my bill</button>
                        </div>
                    </div>
                    </div>
                </section>
            </Waypoint>
        )
    }
    
}

export default ComparisonSelector;