import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function Login(){
const navigate = useNavigate();
const [values, setValues] = useState({
    username:'',
    password:''
});
const submit = (e)=>{
    console.log(values);
    console.log('In login submit')
    console.log(values);
    axios.post('http://localhost:8081/getUser/', values)
    .then((res)=>{
        console.log('In res');
        console.log(res.data.length);
        if(res.data.length > 0 && res.data[0].user_role === 'A')
        {
            setValues({
                username:'',
                password:''
            });
            navigate('/login/admin', {state:res.data[0]});
        }
        
    })
    .catch((err)=>console.log(err));
}
return(
<div className="d-flex bg-primary vh-100 justify-content-center align-items-center">
    <div className = "bg-white rounded p-3">
        <table className = "table table-primary">
            <thead>
            <tr><th colSpan="2"><h1 className='text-dark'>Login</h1></th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <label>Username</label>
                    </td>
                    <td>
                        <input type = "text" placeholder='Eg: gburdel3' onChange = {(e)=>{setValues({...values,username:e.target.value})}}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Password</label>
                    </td>
                    <td>
                        <input type = "password" placeholder='Eg: *********' onChange = {(e)=>{setValues({...values,password:e.target.value})}}/>
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <button className='btn btn-success' onClick={submit}>Login</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
);
}

export default Login;