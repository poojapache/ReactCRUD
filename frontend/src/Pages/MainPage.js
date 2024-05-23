import React, { useState } from 'react'
//import Form from '../Components/Form.js'
import Login from '../Components/Login.js';
import SignUp from '../Components/SignUp.js';
import { Link } from 'react-router-dom';

function MainPage(){
    const [login, setLogin] = useState(true);
    return(
            <div className="d-flex justify-content-end align-items-end">
                <div className = "w-100 bg-white rounded p-3">
            <table className = "table table-primary">
                <thead>
                    <tr>
                        <td>
                            <div className = "d-flex justify-content-around" onClick={()=>setLogin(false)}>
                            <Link to="" className={`btn ${!login ? 'btn-primary' : 'btn-light'} w-100`}>SignUp</Link>
                            </div>
                        </td>
                        <td>
                        <div className = "d-flex justify-content-around" onClick={()=>setLogin(true)}>
                            <Link to="" className={`btn ${login ? 'btn-primary' : 'btn-light'} w-100`}>Login</Link>
                        </div>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="2">
                        {login?<Login/>:<SignUp/>}
                        </td>
                    </tr>

                </tbody>
            </table>
            </div>
        </div>
    );
}
export default MainPage;