import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Radio({quesNo, ansNo,ansText})
{
    return(<div><input type='radio' name = {quesNo} value = {ansNo}/><label className='ms-3'>{ansText}</label></div>);
}

export default Radio;