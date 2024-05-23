import React,{useEffect, useState} from 'react';
import axios from 'axios';
import DeleteQues from './DeleteQues';

function Delete()
{
    const [questionList, setQuestionList] = useState([]);
    const [finalQuestionList, setFinalQuestionList] = useState([]);
    useEffect(() => {
        console.log('Setting Question List');
        setQuestions();
      }, []);
    
    const setQuestions = ()=>{
        axios.get('http://localhost:8081/getQuesForDelete')
        .then((res)=>{
            console.log(res);
            setQuestionList(res.data);
        })
        .catch((err)=>console.log(err));
    }
       

    const handleSelection = (checked, quesId) => {
        console.log(checked);
        if(checked)
        {
            finalQuestionList.push(quesId);
        }
        else
        {
            const index = finalQuestionList.indexOf(quesId);
            finalQuestionList.splice(index,1);
        }
        console.log(finalQuestionList);
      };


      const onClickDelete = (e)=>{
        const values = [{ids:finalQuestionList}];
        axios.post('http://localhost:8081/deleteQues', values)
        .then((res)=>{
            console.log(res);
            setQuestions();
        })
        .catch((err)=>console.log(err));
      }
    return(
    <div>
        <table className='table table-primary w-100'>
            <thead>
                <tr>
                    <th></th>
                    <th>Question No.</th>
                    <th>Question Text</th>
                </tr>
            </thead>
            <tbody>
                    {questionList.map((element, index)=>(
                    <DeleteQues 
                    key = {index} 
                    quesId = {element.id} 
                    quesNo = {element.ques_no} 
                    quesText = {element.ques_text} 
                    handleSelection = {handleSelection}
                    />
                    ))}
                <tr>
                    <td colSpan="3">
                        <button className='btn btn-danger w-100' onClick={onClickDelete}>Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    );
}

export default Delete;