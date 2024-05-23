import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

function Checkbox({quesNo, ansNo, ansText})
{
    return(<div><input type='checkbox' name = {quesNo} value = {ansNo}/><label className='ms-3'>{ansText}</label></div>);
}

export default Checkbox;