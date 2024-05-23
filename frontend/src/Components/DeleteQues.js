import React from 'react';

function DeleteQues({quesId, quesNo, quesText, handleSelection})
{
    return(
            <tr>
                <td><input type='checkbox' value={quesId} onChange={(e)=>handleSelection(e.target.checked, e.target.value)}/></td>
                <td><label>{quesNo}</label></td>
                <td><label>{quesText}</label></td> 
            </tr>
        
    );

}
export default DeleteQues;