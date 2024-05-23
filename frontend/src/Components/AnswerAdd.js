import React from 'react';
import axios from 'axios';

function AnswerAdd({ ansNo, handleChange })
{
return(
    <div>
        <table className='table table-primary w-100'>
                            <tbody>
                                <tr>
                                    <td>
                                        <label className='w-100'>{`Answer ${ansNo}`}</label>
                                    </td>
                                    <td><input type='text' onChange={(e) => handleChange(ansNo, e.target.value)}/></td>
                                </tr>
                            </tbody>
        </table>
    </div>
);
}
export default AnswerAdd;