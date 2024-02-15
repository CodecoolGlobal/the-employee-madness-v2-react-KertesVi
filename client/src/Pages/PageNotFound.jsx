import React from "react";

export default function PageNotFound (){
    return (
        <div>
            <h1>404 Error</h1>
            <h1>Page Not Found</h1>
        </div>
    );
}

// const resp = await fetch(`/api/years-of-experience/${params}`);
// if(resp.status === 404){
//   console.error("not found")
// }