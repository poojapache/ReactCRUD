import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Question from './Question';
import 'bootstrap/dist/css/bootstrap.min.css'

function Retrieve()
{
    const [itemList, setItemList] = useState([]);
    const [rerender, setRerender] = useState(false);
    useEffect(()=>{
        console.log('Fetching questions');
        axios.get('http://localhost:8081/getQues/')
        .then((res)=>{
            //console.log(res);
            const questions = res.data;
            console.log(questions);
            questions.map((element, index)=>{
                console.log('Here');
                let idx = itemList.findIndex((e)=>e.quesNo == element.ques_no);
                console.log(idx);
                if(idx <= -1)
                {
                    itemList.push({
                        quesNo:element.ques_no,
                        quesText:element.ques_text,
                        quesType:element.ques_type,
                        answerList:[{
                            ansNo:element.ans_no,
                            ansText:element.option_text
                        }]
                    });
                    
                }
                else{
                    itemList[idx].answerList.push({
                        ansNo:element.ans_no,
                        ansText:element.option_text
                    });
                }
                console.log(itemList[idx]);
                
            });
            setRerender(!rerender);
        })
        .catch((err)=>console.log(err));
        
        console.log('Done!');
    },[]);
return(
    
<div className='d-flex justify-content-center'>
    <ul className='w-50 list-unstyled p-5'>
        
            {itemList.map((element, index)=>(<li className='bg-primary rounded p-5 bg-opacity-50 mb-2' key = {index}><Question quesNo = {element.quesNo} quesText = {element.quesText} quesType = {element.quesType} answerList={element.answerList}/></li>))}
        
    </ul>
</div>);
}

export default Retrieve;