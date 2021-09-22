import React from 'react'
import "./style.css"
import {Container} from  "react-bootstrap"
function Todolists({data,del}) {
   console.log(data);
   const handledelete = () => {
       del(data.id)
   }
    return (
        <Container className="listy">
            
   <ul class="list-group mt-3">
    <li class="list-group-item">
        {data.name}
    <i class="fas fa-trash-alt trash  " onClick={handledelete}></i>
    </li>
</ul>

</Container>


    )
}

export default Todolists
