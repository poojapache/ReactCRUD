import React from 'react';
import Radio from './Radio';
import Checkbox from './Checkbox';
import 'bootstrap/dist/css/bootstrap.min.css'

function Answer({quesType, quesNo, ansNo, ansText})
{
    return(
        <div className='p-2'>
            {quesType == 'R'?<Radio quesNo={quesNo} ansNo={ansNo} ansText={ansText}/>: <Checkbox quesNo={quesNo} ansNo={ansNo} ansText={ansText}/>}
        </div>
        
    )
}
export default Answer;