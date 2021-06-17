import React from 'react'

const FormInput = (props) => {
    return (

        <div className="mb-3">
            <label htmlFor={props.nameInput} className="form-label">{props.formLabel}</label>
            <input type="text" className="form-control" placeholder={props.placeholder} value={props.value} onChange={props.onChange} name={props.name} />
            <div id={props.id}></div>
        </div>

    )
}

export default FormInput;
