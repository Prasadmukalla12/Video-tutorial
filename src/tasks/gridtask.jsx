import axios from "axios"
import { useEffect, useState } from "react"

export function GridComponant(){

    const[data,setData] = useState([{Name:null,Price:0,Rating:0}])
    const[row,setRow] = useState()

    useEffect(()=>{
        axios.get("../products.json")
        .then(res=>{
            setData(res.data)
        })
    },[])

    function EditClick(index){
        setRow(index)
    }

    function SaveClick(){
        setRow()
    }

    function handleValueChange(e,i,item){
        var values = [...data]
        values[i][item] = e.target.value;
        setData(values)
    }

    
    return(
        <div className="container-fluid">
            <table className="table table-bordered table-hover table-dark">
                <thead>
                   <tr>
                    {
                        Object.keys(data[0]).map(item=>
                            <th key={item}>{item}</th>
                        )
                    }
                    <th>Actions</th>
                   </tr>
                </thead>
                <tbody>
                   {
                    data.map((items,i)=>
                      <tr key={i}>
                        {
                            Object.keys(items).map(item=>
                                <td key={item}>
                                    {
                                        (row===i)?<span><input type="text" onChange={(e)=>handleValueChange(e,i,item)} value={items[item]} /></span>:
                                        <span>{items[item]}</span>
                                    }
                                </td>
                            )
                        }
                        <td>
                            {
                                (row===i)?<span><button onClick={SaveClick} className="btn btn-success">Save</button></span>:
                                <span><button onClick={()=>EditClick(i)} className="btn btn-primary">Edit</button></span>
                            }
                        </td>
                      </tr>
                    )
                   }
                </tbody>
            </table>
        </div>
    )
}