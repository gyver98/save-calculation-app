import React from 'react';
import PropTypes from 'prop-types';

function OfferDetails(props){
    return(
        <section className="OfferDetails">
            <h4>{props.planInfo.planName}</h4>
            <ul className="plan-benefits">
                {props.planInfo.discountRate !== '' ? 
                        <li><span className="checkmark"></span>{props.planInfo.discountRate + props.discountRateText}</li> : 
                        ''}
                { 
                    props.planInfo.planBenefits.map((benefit, key) => {
                        return <li key={key}><span className="checkmark"></span>{benefit}</li>
                    }) 
                }
                {props.isBonusCreditAvailable ? <li className="bright-orange"><span className="checkmark"></span>{props.bonusCreditText}</li> : ''}
            </ul>
        </section>
    )
}

OfferDetails.propTypes = {
    planInfo: PropTypes.object.isRequired,
    discountRateText: PropTypes.string.isRequired,
    isBonusCreditAvailable: PropTypes.bool.isRequired,
    bonusCreditText: PropTypes.string.isRequired
}

export default OfferDetails;