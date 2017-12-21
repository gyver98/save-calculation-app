import React, {Component} from 'react';
import campaignimage from './campaignimage.jpg'
import './header.scss'

const style = {
  backgroundImage: `url(${campaignimage})`
}

class Header extends Component {

  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (link) => {
    window.location.hash = `#${link}`;
    this.props.viewLink(link);
  }

  render() {
    return (
      <section className="campaign-header" style={style}>
        <div className="intro-section">
          <div className="intro">
            <h2 className="text-white">At Origin we believe you could do better, do you?</h2>
            <p className="text-white">Let’s be honest, energy bills can be really confusing.<br/>
            So we have created some tools for you to help make energy comparison easier and friendlier. </p>
          </div>
          <div className="ctas">
            <button className="btn btn-default" onClick={() => this.handleClick('ComparisonSelector')}>Try it out</button>
          </div>
        </div>
      </section>
    )
  }

}

export default Header