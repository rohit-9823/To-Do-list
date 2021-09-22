import {React,useState,useEffect} from 'react'
import Todoforms from '../Todoform'
import Todolists from '../Todolist'

export default function Todo() {
    const [info, setinfo] = useState([ ])
    const handleadd = (data) => {
        let id=info.length + 1
        let cls={id, ...data}
        setinfo([cls,...info])
    }
    const handledelete = (datas) => {
        const now = info.filter((num)=>(
            num.id != datas
        ))
        setinfo([...now])

    }
    return (
        <div style={{ backgroundColor: " rgb(13, 78, 199)",
        margin: "0 auto",
        width: "28%",
        borderRadius:"10px",
        marginTop:"5%"}} >
            <Todoforms value={handleadd}/>
            {info.map((num)=> (
            <Todolists data={num} del={handledelete}/>
            ))}
        </div>
    )
}

