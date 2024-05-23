import React,{Component, useState} from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import Create from '../Components/Create.js'
import Delete from '../Components/Delete.js'
import Retrieve from '../Components/Retrieve.js'
import Update from '../Components/Update.js';

function Admin()
{
    const location = useLocation();
    const data = location.state;
    const [mode, setMode] = useState('C');
    const renderSwitch = ()=>{
        console.log(mode);
        switch(mode){
            case 'C': return <Create id={data.id}/>;
            case 'R':return <Retrieve/>;
            case 'U':return <Update/>;
            case 'D': return <Delete/>
            default: return <Create id={data.id}/>;
        }
    }
    return(
    <div className="d-flex justify-content-start align-items-start vh-100">
    <div className = "w-100 p-3 vh-100">
    <table className = "table table-primary h-100">
        <thead>
            <tr>
                <td>
                    <div className = "d-flex justify-content-around" onClick={()=>setMode('C')}>
                    <button to="" className={`btn ${mode === 'C' ? 'btn-primary' : 'btn-light'} w-100`}>Create</button>
                    </div>
                </td>
                <td>
                <div className = "d-flex justify-content-around" onClick={()=>setMode('R')}>
                    <button to="" className={`btn ${mode === 'R' ? 'btn-primary' : 'btn-light'} w-100`}>Retrieve</button>
                </div>
                </td>
                <td>
                <div className = "d-flex justify-content-around" onClick={()=>setMode('U')}>
                    <button to="" className={`btn ${mode === 'U' ? 'btn-primary' : 'btn-light'} w-100`}>Update</button>
                </div>
                </td>
                <td>
                <div className = "d-flex justify-content-around" onClick={()=>setMode('D')}>
                    <button to="" className={`btn ${mode === 'D' ? 'btn-primary' : 'btn-light'} w-100`}>Delete</button>
                </div>
                </td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colSpan="4" >
                {renderSwitch()}
                </td>
            </tr>

        </tbody>
    </table>
    </div>
</div>
    )

}

export default Admin;