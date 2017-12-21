import React, {Component} from 'react';
import {pushFiles} from '../../api/kogbill';
import PersonalDetailsForm from '../personal-details-form/personal-details-form';
import Steps from '../steps/steps.jsx';
import ReturnBtn from '../return-btn/return-btn.jsx';
import FileUpload from '../file-upload/file-upload';
import STATIC_COPY from '../../constants/copy.js';
import './upload-bill.scss';

const COPY_TEXT = STATIC_COPY.UPLOAD_BILL;

class UploadBill extends Component {
  
  constructor() {
    super()
    this.state = {
      acceptedFiles: [],
      rejectedFiles: [],
      apiRes: {},
      resultsVisible: false,
      personalDetails: { firstName: '', email: ''},
      formErrors: {firstName: '', email: ''},
      isFormValid: false,
      fileInfoText: '',
      animating: true
    }
    
    this.submitUpload = this.submitUpload.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  onDrop(accepted, rejected) {
    if(rejected.length > 0){
      this.setState({fileInfoText: 'Please upload a valid PDF file', 
                     rejectedFiles: rejected, acceptedFiles: []},
                     () => this.validateForm())
    } else {
      this.setState({ fileInfoText: '',
                      acceptedFiles: accepted, rejectedFiles: []},
                     () => this.validateForm())
    }
  }

  submitUpload() {
    let comp = this;
    let files = this.state.acceptedFiles;
    this.props.toggleLoader();
    pushFiles(files)
    .then((resp) => resp.json()) 
    .then(function(data) {
      comp.props.apiRes(data);
      comp.props.showResults();
    })
    .catch(function(error) {
      console.error(error)
    })
    .then(() => {this.props.toggleLoader()})
  }

  returnClick() {
    console.log('clocked')
  }

  handleUserInput(e){
    const name = e.target.name;
    const value = e.target.value;
    let personalDetails = {...this.state.personalDetails};
    personalDetails[name] = value;
    this.setState({personalDetails},
                    () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;

    switch(fieldName) {
      case 'email':
        fieldValidationErrors.email = value.length === 0 
                                      ? '' 
                                      : (value.match(/^(\s*)([\w.%+-]+)@([\w-]+\.)+([\w]{2,})(\s*)$/i) ? '' : 'email is invalid');
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors}, this.validateForm);
  }

  validateForm(){
    this.setState({isFormValid: (this.state.formErrors.email === '' 
                                  && this.state.formErrors.firstName === '' 
                                  && this.state.rejectedFiles.length === 0
                                  && this.state.acceptedFiles.length > 0
                                  && this.state.personalDetails.email.length > 0)})
  }
  

  render() {
    return (
      <section className="view upload-bill">
        <div className={`container ${this.state.animating ? 'anim': '' }`}>
          <div className="col-wrap">
              <div className="col">
                <ReturnBtn />
              </div>
              <div className="col">
                <Steps active={2}/>
              </div>
          </div>
          <div className="col-wrap">
            <div className="col copy">
              <h3>{COPY_TEXT.HEADER}</h3>
              {COPY_TEXT.COPY.map((item, i) => {
                  return <p key={i} className="hidden-xs">{item}</p>
              })}
            </div>
            <div className="col">
              <PersonalDetailsForm 
                      details={this.state.personalDetails} 
                      handleUserInput={this.handleUserInput} 
                      formErrors={this.state.formErrors}/>
              <FileUpload onDrop={this.onDrop} fileInfoText={this.state.fileInfoText} copy={COPY_TEXT} files={this.state.acceptedFiles} />
              <div className="col-wrap">
                <small className="tcs">By using this tool you accept our <a href="">terms & conditions</a></small>
                <button className="btn btn-default" onClick={this.submitUpload} disabled={!this.state.isFormValid}>Upload to compare</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

}

export default UploadBill
