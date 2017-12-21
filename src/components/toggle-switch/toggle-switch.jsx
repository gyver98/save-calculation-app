import React from 'react';
import './toggle-switch.scss';

function ToggleSwitch(props) {
    return (
        <section className="ToggleSwitch">
            <label className="switch">
            <input type="checkbox" 
                   checked={props.checkedState} 
                   onChange={props.changeHandler} 
                   name={props.name}/>
            <span className="slider round"></span>
            </label>
        </section>
    )
}

export default ToggleSwitch;
