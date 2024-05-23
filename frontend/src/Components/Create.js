import React,{useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AnswerAdd from './AnswerAdd';

function Create({id})
{
    const [answerList, setAnswerList] = useState([]);
    const [disableAdd, setDisableAdd] = useState(false);
    const [disableDelete, setDisableDelete] = useState(false);
    const [values,setValues] = useState({
        userId:'',
        quesNo:'',
        quesText:'',
        quesType:'',
        optionList:[]
    })

    useEffect(() => {
        addAnswer();
      }, []);

    const addAnswer = () => {
        const newAnswer = { id: answerList.length + 1, text: '' };
        setAnswerList([...answerList, newAnswer]);
      };

    const handleAnswerChange = (id, text) => {
        setAnswerList(
          answerList.map((answer) => (answer.id === id ? { ...answer, text } : answer))
        );
      };

    const addBtnOnClick = (e)=>{
        e.preventDefault();
        console.log(answerList.length);
        if(answerList.length < 4 )
        {
            setDisableAdd(false);
            addAnswer();
            //setAnswerList(answerList.concat(<AnswerAdd key={answerList.length + 1} ansNo={answerList.length + 1}/>));
            if(answerList.length == 3)setDisableAdd(!disableAdd);
            if(answerList.length >= 1)setDisableDelete(true);
            else setDisableDelete(false);
        }
        
    }
    const deleteBtnOnClick = (e)=>{
        e.preventDefault();
        if(answerList.length > 1)
        {
            setDisableDelete(true);
            setAnswerList(answerList.slice(0, answerList.length - 1));
            console.log(answerList.length);
            if(answerList.length == 2)setDisableDelete(false);
            if(answerList.length <= 4)setDisableAdd(false);
        }
        else{
            setDisableDelete(false);
        }
        
    }


    const submit = (e)=>{
        e.preventDefault();
        console.log(answerList);
        values.userId = id;
        values.optionList = answerList;
        axios.post("http://localhost:8081/insertQues/",values)
        .then((res)=>{
            console.log(res);
            values.quesId = res.data.insertId;
            console.log(values);
            axios.post("http://localhost:8081/insertAns/",values)
            .then((res)=>{
                console.log(res);
                setValues({
                    userId:'',
                    quesNo:'',
                    quesText:'',
                    quesType:'',
                    optionList:[]
                });
            })
            .catch((err)=>console.log(err));
        })
        .catch((err)=>console.log(err));
    }
return(
    <div className="d-flex justify-content-center align-items-center h-100">
    <div className = "w-50  p-3">
        <table className = "table table-primary">
            <thead>
            <tr><th colSpan="2"><h1 className='text-dark'>Create new question</h1></th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <label>Question No</label>
                    </td>
                    <td>
                        <input type = "text" onChange={(e)=>{setValues({...values,quesNo:e.target.value})}}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Question</label>
                    </td>
                    <td>
                        <input type = "multiline" onChange={(e)=>{setValues({...values,quesText:e.target.value})}}/>
                    </td>
                </tr>
                <tr>
                    <td><label>Question Type</label></td>
                    <td>
                        <div className='d-flex justify-content-center'>
                            <div className='m-2'>
                            <input type='radio' name='type' value = 'C' onChange={(e)=>{setValues({...values,quesType:e.target.value})}}/>
                            <label>Checkbox</label>
                            </div>
                            
                            <div className='m-2'>
                            <input type='radio' name='type' value = 'R' onChange={(e)=>{setValues({...values,quesType:e.target.value})}}/>
                            <label>Radio</label>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <div>
                        {answerList.map((answer, index) => (
                        <AnswerAdd
                        key={index}
                        ansNo={answer.id}
                        handleChange={handleAnswerChange}
                        />
                        ))}
                        <div className='d-flex justify-content-between'>
                                <button className={`btn ${disableDelete?'btn-danger':'btn-dark'} w-25`} onClick={deleteBtnOnClick}>Delete</button>
                                <button className={`btn ${!disableAdd?'btn-success':'btn-dark'} w-25`} onClick={addBtnOnClick}>Add</button>
                        </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <button className='btn btn-primary w-100' onClick = {submit}>Create</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>);
}

export default Create;