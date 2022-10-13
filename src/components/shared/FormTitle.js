import React from 'react';
import './FormTitle.css';

export default function FormTitle(props) {
    return ( <
        div className = 'form-title-container' >
        <
        span className = 'form-title-translated' > { props.translation } < /span> <
        h2 className = 'form-title' > { props.title } < /h2> <
        hr className = 'form-underline' > < /hr> <
        /div>
    );
}