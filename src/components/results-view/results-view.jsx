import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import OfferDetails from '../offer-details/offer-details';
import ToggleSwitch from '../toggle-switch/toggle-switch';
import Steps from '../steps/steps.jsx';
import ReturnBtn from '../return-btn/return-btn.jsx';
import STATIC_COPY from '../../constants/copy.js';
import './results-view.scss';

const COPY_TEXT = STATIC_COPY.RESULTS_VIEW;

let maximiser = {
    planName: COPY_TEXT.PLAN_NAMES.MAXIMISER,
    planBenefits: COPY_TEXT.PLAN_BENEFITS.MAXIMISER,
    discountRate: '',
    totalSaving: ''
}

let saver = {
    planName: COPY_TEXT.PLAN_NAMES.SAVER,
    planBenefits: COPY_TEXT.PLAN_BENEFITS.SAVER,
    discountRate: '',
    totalSaving: ''
}

let predictable = {
    planName: COPY_TEXT.PLAN_NAMES.PREDICTABLE,
    planBenefits: COPY_TEXT.PLAN_BENEFITS.PREDICTABLE,
    discountRate: '',
    totalSaving: ''
}

function PriceText(props){

    if(props.value >= 0){
        return null;
    }

    return(
        <div className="col">
            <p className="orange">With Origin, you could have saved</p>
            {/* <div className="price"><small>$</small>{Math.abs(props.value)}</div> */}
            <div className="price"><small>$</small><CountUp start={0} end={Math.abs(props.value)} decimals={2} duration={1} /></div>
            <p>This is based on our current rates and the same billing period of your uploaded bill.</p>
        </div>
    )
}

class ResultsView extends React.Component{

    constructor(){
        super();
        this.state = {
            header: '',
            subheader: '',
            planInfo: {},
            ddPreference: true,
            isSpecialOffer: false,
            isOriginCustomer: false,
            isBonusCreditAvailable: false,
            animating: true
        }

        this.changeDirectDebitPreference = this.changeDirectDebitPreference.bind(this);
        this.populateFieldsFromResult = this.populateFieldsFromResult.bind(this);
        this.showDirectDebitToggle = this.showDirectDebitToggle.bind(this);
    }

    componentWillMount(){
        this.populateResults();
    }

    componentWillReceiveProps(){
        this.populateResults();
    }

    populateResults(){
        if(this.props.comparisonResults){
            this.populateFieldsFromResult(this.props.comparisonResults);
        }

        // set default selected plan to Maximiser
        this.setState({
            planInfo: maximiser
        })
    }

    handleEnter() {
        console.log('ResultsView entered')
        this.setState({animating: true})
    }

    isOfferBTL(tariffCode){
        return tariffCode.toUpperCase() !== 'BAU';
    }

    showDirectDebitToggle(){
        return !(!this.state.isOriginCustomer && maximiser.totalSaving >= 0)
    }

    populateFieldsFromResult(result){
        if(!result)
            return;

        const generalResults = result.comparisonResult.general;

        // populate maximiser plan info
        maximiser.discountRate = generalResults["Maximiser Discount"];
        maximiser.totalSaving = parseFloat(generalResults["Maximiser Total Saving"]);
        // maximiser.totalSaving = 11.54;

        // populate saver plan info
        saver.discountRate = generalResults["Saver Discount"];
        saver.totalSaving = parseFloat(generalResults["Saver Total Saving"]);
        // saver.totalSaving = 11.54;        

        // get bonus credit text
        const bonusCredit = generalResults["Bonus Credit"];     
        
        // get tariff type
        const tariffCode = generalResults["Maximiser Tariff Code"];

        const retailer = generalResults["Retailer"];

        this.setState({
            isBonusCreditAvailable: bonusCredit && bonusCredit.length ? true : false,
            isSpecialOffer: this.isOfferBTL(tariffCode),
            isOriginCustomer: retailer && retailer.toUpperCase() === 'ORIGIN'
        })
    }

    changeDirectDebitPreference(event){
        const target = event.target;
        const value = target.checked;
        const name = target.name;

        this.setState({
            [name]: value,
            planInfo: target.checked ? maximiser : saver
        });
    }

    render(){

        let Header, SubHeader, DDToggle

        if(this.state.planInfo.totalSaving < 0){
            Header = this.state.isSpecialOffer ? 
                        <h3 className="results-header" dangerouslySetInnerHTML={{__html: COPY_TEXT.QUOTE_COPY.QUOTE_BEATEN_SPECIAL.HEADER}}></h3> :
                        <h3 className="results-header" dangerouslySetInnerHTML={{__html: COPY_TEXT.QUOTE_COPY.QUOTE_BEATEN.HEADER}}></h3>

            SubHeader = this.state.isSpecialOffer ? 
                        <h3 className="results-subheader">{COPY_TEXT.QUOTE_COPY.QUOTE_BEATEN_SPECIAL.SUBHEADER}</h3> :
                        <h3 className="results-subheader">{COPY_TEXT.QUOTE_COPY.QUOTE_BEATEN.SUBHEADER}</h3>
        } else {
            Header = <h3 className="results-header">{COPY_TEXT.QUOTE_COPY.QUOTE_NOT_BEATEN.HEADER}</h3>
            SubHeader = <h3 className="results-subheader">{ COPY_TEXT.QUOTE_COPY.QUOTE_NOT_BEATEN.SUBHEADER }</h3>
        }

        if(this.showDirectDebitToggle()){
            DDToggle =  <div className="ddtoggle">
                            Happy to pay by direct debit?
                            <ToggleSwitch
                                checkedState={this.state.ddPreference}
                                value="Yes" name="ddPreference"
                                changeHandler={this.changeDirectDebitPreference} />
                        </div>
                        
        } else {
            DDToggle = <OfferDetails header="Or you may like our fixed price plan:" 
                                    planInfo={predictable}
                                    isBonusCreditAvailable={false}
                                    bonusCreditText={COPY_TEXT.BONUS_CREDIT_TEXT}
                                    discountRateText={COPY_TEXT.PLAN_BENEFITS.DISCOUNT_RATE_TEXT} />
        }

        return (
            <section className="view results-view">
                <div className="container">
                    <div className="col-wrap">
                        <div className="col">
                            <ReturnBtn/>
                        </div>
                        <div className="col">
                            <Steps active={1}/>
                        </div>
                    </div>
                    
                    <div className="col-wrap">
                        <div className="col results-copy">
                            {Header}
                            {SubHeader}
                        </div>
                        <PriceText value={this.state.planInfo.totalSaving} />
                    </div>
                    <hr/>
                    <div className="col-wrap">
                        <div className="col">
                            <h4>Our best offer for you:</h4>
                        </div>
                        <div className="col">
                            {DDToggle}
                            <OfferDetails 
                                planInfo={this.state.planInfo}
                                isBonusCreditAvailable={this.state.isBonusCreditAvailable}
                                bonusCreditText={COPY_TEXT.BONUS_CREDIT_TEXT}
                                discountRateText={COPY_TEXT.PLAN_BENEFITS.DISCOUNT_RATE_TEXT} />
                            <div className="col-wrap switch-section">
                                <button className="btn btn-default" onClick={this.submitUpload}>Switch today</button>
                                <small>Or you can <a href="">start again</a></small>
                            </div>
                            <small className="tcs">By clicking switch you are no committing to a contract and can opt out during the sign up process</small>
                        </div>
                    </div>
                    <hr/>
                </div>
            </section>
        )
    }
}

ResultsView.propTypes = {
  comparisonResults: PropTypes.object.isRequired
}

export default ResultsView;