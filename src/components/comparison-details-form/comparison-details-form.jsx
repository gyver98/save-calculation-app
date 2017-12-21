import React from 'react';
import {getEstimate} from '../../api/kogbill';
import './comparison-details-form.scss';

class ComparisonDetailsForm extends React.Component{
  
  constructor() {
    super()
    this.state = {
      apiRes: ''
    }
  }
  
  addFormValues(event){
    event.preventDefault();
    const comp = this;
    const formValues = {
      postcode: this.postcode.value,
      retailer: this.retailer.value,
      usage: this.usage.value
    }

    getEstimate(formValues)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
      console.log(data)
      comp.setState({'apiRes': data})
    })
    .catch(function(error) {
      console.error(error)
    })
    
    this.DetailsForm.reset();
  }
    
  render() {
    return (
      <section className="view manual-entry">
        <form ref={(input) => this.DetailsForm = input} onSubmit={(e) => this.addFormValues(e)}>
            <div className="form-group">
                <label>Your postcode?</label>
                <input type="text" ref={(input) => this.postcode = input} className="form-control" aria-describedby="postcode" />
            </div>
            <div className="form-group">
                <label>Your current retailer</label>
                <input type="text" ref={(input) => this.retailer = input} className="form-control" aria-describedby="retailer" />
            </div>
            <div className="form-group">
                <label>Usage</label>
                <select className="form-control" ref={(input) => this.usage = input}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <button>Submit</button>
        </form>
        <div className="results">
          <p>Results:</p>
          <p>{this.state.apiRes.totalSaving}</p>
        </div>
      </section>
    )
  }
}


export default ComparisonDetailsForm;

