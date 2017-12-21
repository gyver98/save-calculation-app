import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';

import Header from './components/header/header.jsx'
import ComparisonSelector from './components/comparison-selector/comparison-selector.jsx';
import UploadBill from './components/upload-bill/upload-bill.jsx';
import ComparisonDetailsForm from './components/comparison-details-form/comparison-details-form.jsx';
import ResultsView from './components/results-view/results-view.jsx';
import LoadingScreen from './components/loading-screen/loading-screen';

import './common/sass/common.scss';

class BillCompare extends Component {

  constructor() {
    super()
    this.state = {
      curView: '',
      apiRes: {},
      resultsVisible: false,
      isLoading: false
    }
    this.viewLink = this.viewLink.bind(this);
    this.hashNav = this.hashNav.bind(this);
    this.apiRes = this.apiRes.bind(this);
    this.showResults = this.showResults.bind(this);
    this.toggleLoader = this.toggleLoader.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.hashNav, false);
  }

  componentDidUpdate() {
    scrollToComponent(this.curView, { offset: 0, align: 'top', duration: 400, ease:'inOutCube'})
  }

  hashNav() {
    const location = window.location.hash.replace(/^#\/?|\/$/g, '').split('/')[0];
    if(location !== 'ResultsView') {
      // this is weak
      this.setState({curView: location, resultsVisible: false});
    }
    if (location === 'ComparisonSelector') {
      this.setState({ComparisonSelectorVisible: true});
    }
  }

  viewLink(location) {
    this.setState({curView: location});
  }

  apiRes(data) {
    console.log('APP',data)
    this.setState({apiRes: data});
  }

  showResults() {
    this.setState({resultsVisible: true});
    window.location.hash = '#ResultsView'
  }

  toggleLoader(){
    // toggle the loader state
    const loaderState = !this.state.isLoading;
    this.setState({isLoading: loaderState});
  }

  render() {
    let RenderChoice;
    switch(this.state.curView){
      case 'UploadBill':
          RenderChoice = <UploadBill ref={(section) => { this.curView = section }} 
                                     apiRes={this.apiRes} 
                                     showResults={this.showResults} 
                                     toggleLoader={this.toggleLoader} />
          break;
      case 'ComparisonDetailsForm':
          RenderChoice = <ComparisonDetailsForm />
          break;
      default:
          RenderChoice = <div></div>
    }
    
    return (
      <div className="App">
        {this.state.isLoading && <LoadingScreen />}
        <Header viewLink={this.viewLink}/>
        <ComparisonSelector ref={(section) => { this.curView = section; }} viewLink={this.viewLink}/>
        {RenderChoice}
        {this.state.resultsVisible && <ResultsView ref={(section) => { this.curView = section; }} comparisonResults={this.state.apiRes} />}
      </div>
    )
  }
}

export default BillCompare;
