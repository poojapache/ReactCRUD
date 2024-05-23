import React, { useRef, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

function SignUp(){

const [values, setValue] = useState({
    username :'',
    password:'',
    role:''
});
const pwd = useRef();

const submit = (e)=>{
    e.preventDefault();
    console.log(values);
    axios.post('http://localhost:8081/insertUser/', values)
    .then((res)=>{
        console.log(res);
        setValue({
            username :'',
            password:'',
            role:'' 
        });
    

    })
.catch((err)=>console.log(err));
}

return(
<div className="d-flex bg-primary vh-100 justify-content-center align-items-center">
    <div className = "w-50 bg-white rounded p-3">
        <table className = "table table-primary">
            <thead>
            <tr><th colSpan="2"><h1 className='text-dark'>Sign Up</h1></th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <label>Username</label>
                    </td>
                    <td>
                        <input type = "text" placeholder='Enter Username' onChange={(e)=>{setValue({...values,username: e.target.value})}}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Password</label>
                    </td>
                    <td>
                        <input ref={pwd} type = "password" placeholder='Enter password'/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Confirm Password</label>
                    </td>
                    <td>
                        <input type = "password" placeholder='Re-enter password' onChange={(e)=>{setValue({...values,password: e.target.value})}}/>
                    </td>
                </tr>
                <tr>
                    <td><label>Select User Role</label></td>
                    <td>
                        <div className='d-flex justify-content-center'>
                            <div className='m-2'>
                            <input type='radio' name='role' value = 'R' onChange={(e)=>{setValue({...values,role: e.target.value})}}/>
                            <label>Customer</label>
                            </div>
                            
                            <div className='m-2'>
                            <input type='radio' name='role' value = 'A' onChange={(e)=>{setValue({...values,role: e.target.value})}}/>
                            <label>Admin</label>
                            </div>

                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <button onClick={submit} className='btn btn-success'>Sign Up</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
);
}

export default SignUp;