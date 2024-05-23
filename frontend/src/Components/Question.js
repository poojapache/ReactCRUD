import React, { useEffect, useState } from 'react';
import Answer from './Answer';
import 'bootstrap/dist/css/bootstrap.min.css'

function Question({quesNo, quesText, quesType, answerList})
{
    return(
        <div className='d-flex'>
            <div><label className='fw-bold pe-3'>{`${quesNo}`}</label></div>
            <div>
                <label className='fw-bold'>{`${quesText}`}</label>

                <ul className='w-100 d-flex flex-column justify-content-start align-items-start list-unstyled'>
                    {answerList.map((element, index)=>(<li key = {index}><Answer quesType = {quesType} quesNo = {quesNo} ansNo = {element.ansNo} ansText = {element.ansText}/></li>))}
                </ul>
            </div>
            
        </div>
    );
}

export default Question;