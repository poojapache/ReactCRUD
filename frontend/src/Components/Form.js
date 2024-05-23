import React,{useEffect, useRef, useState} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'



function Form(){
    const [reasons, setReasons] = useState(new Array());
    const [values, setValues] = useState({
        firstName:'',
        lastName:'',
        email:'',
        satisfed:'Y',
        reasons:[]
    })
    useEffect(()=>{
    axios.get('http://localhost:8081/getReasons/')
    .then((res)=>{
        console.log(res);
        setReasons(res.data);
    })
    .catch((err)=>console.log(err));
    },[]);

    const [isSatisfied, setSatisfied] = useState(true);

    const select = (e)=>{
        //e.preventDefault();
        const selected = e.target.value;
        values.satisfied = selected;
        console.log(e);
        selected === 'Y'?setSatisfied(true):setSatisfied(false);
        console.log(isSatisfied);
    }

    const handlecheckbox = (e)=>{
        if(e.target.checked){
            if(!values.reasons.includes(e.target.value))
            {
                values.reasons.push(e.target.value);
            }
        }
        else
        {
            if(values.reasons.includes(e.target.value))
            {
                values.reasons.splice(values.reasons.indexOf(e.target.value));
            }
        }
        console.log(values.reasons);
    }

    const submit = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:8081/insertFormData/', values)
        .then((res)=>{
            console.log(res);
            // setValues({
            //         firstName:'',
            //         lastName:'',
            //         email:'',
            //         satisfed:'Y'
            //     });
            const reasons = {
                id:res.data.insertId,
                reasonCodes:values.reasons
            }
            axios.post('http://localhost:8081/insertReasonCodes/', reasons)
            .then((res)=>{
                console.log(res);
                setValues({
                    firstName:'',
                    lastName:'',
                    email:'',
                    satisfed:'Y',
                    reasons:[]
                });
            })
            .catch((err)=>console.log(err));
        })
        .catch((err)=>console.log(err));
    }

    return(
        <div className="d-flex bg-primary vh-100 justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <h1 className='text-dark'>Customer Reviews</h1>
            <form>
                <table className="table-primary table table-striped">
                    <tbody>
                        <tr>
                            <td>
                            <label>First Name</label>
                            </td>
                            <td>
                            <input onChange={(e)=>setValues({...values, firstName:e.target.value})} type='text' placeholder='Enter first name'/>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label>Last Name</label>
                            </td>
                            <td>
                                <input onChange={(e)=>setValues({...values, lastName:e.target.value})} type='text' placeholder='Enter last name'/>
                            </td>
                        </tr>

                        <tr>
                            <td>
                            <label>Email</label>
                            </td>
                            <td>
                            <input onChange={(e)=>setValues({...values, email:e.target.value})} type='text' placeholder='Enter email'/>
                            </td>
                        </tr>

                        <tr>
                            <td>
                            <label>Gender</label>
                            </td>
                            <td>
                                <div>
                                    <input type = 'radio' value="M" name='gender' checked="true"/>
                                    <label>Male</label>
                                </div>
                                <div>
                                    <input type = 'radio' value="F" name='gender'/>
                                    <label>Female</label>
                                </div>
                                <div>
                                    <input  type = 'radio' value="O" name='gender'/>
                                    <label>Other</label>
                                </div>
                            </td>
                        </tr>


                        <tr>
                            <td>
                                <label>Are you satisfied with our services?</label>
                            </td>

                            <td>
                                <div>
                                    <input type = 'radio' value="Y" name='satisfied' onChange={select}/>
                                    <label>Yes</label>
                                </div>
                                <div>
                                    <input type = 'radio' value="N" name='satisfied' onChange={select} />
                                    <label>No</label>
                                </div>
                            </td>
                        </tr>
                        
                        
                        {!isSatisfied?
                        (<tr>
                            <td>
                            </td>
                            <td>
                            <div className='d-flex justify-content-center align-items-end ml-5'>
                            <ul style={{listStyleType:'none'}}  className='d-flex flex-column justify-content-center align-items-start p-3'>
                                {reasons.map((reason)=>(
                                    <li key={reason.code}>
                                        <input value={reason.code} type='checkbox' onChange={handlecheckbox}/>
                                        <label>{reason.description}</label>
                                    </li>
                                ))}
                            </ul>
                      </div>
                            </td>
                          </tr>):null}
                        <tr>
                            <td colSpan = "2">
                            <button className='btn btn-success' onClick={submit}>Submit</button>

                            </td>
                        </tr>
                    </tbody>
                </table>

                
                
            </form>
            </div>
        </div>
    );
}

export default Form;