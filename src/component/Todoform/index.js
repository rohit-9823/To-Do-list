import {React,useState} from 'react'
import "./style.css"
import { Container } from 'react-bootstrap'
export default function Todoforms({value}) {
    const [name, setname] = useState(' ')
    const handlesubmit = (e) => {
        e.preventDefault();
        
        value({name});
        
        if(name != " "){
            setname('')
        }
    }
    return (
        <Container className="formy">
            <h1 style={{color:"white"}}>Things To Do</h1>
            <form>
                <input type="text" className="form_text" placeholder="To-Do" value={name} onChange={(e)=>{
                    setname(e.target.value)}} />
                    <button onClick={handlesubmit} className="buttonsubmit">Submit</button>
            </form>
        </Container>
    )
}


