import React, { useState } from "react";


function Rows (){
    return(
        <rows>
            <div id="rows-grid">
            {Array.from({ length: 35 }, (_, index) => (
                <div key={index} className="grid-item">{index + 1}</div>
            ))}
            </div>

        </rows>
        
    )
    
}

export default Rows;