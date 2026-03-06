import { Button, Card, CardActions, CardHeader, CardMedia } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteVideo(){

    const navigate = useNavigate()
    const params = useParams()

    const [video,setVideo] = useState({})

    useEffect(()=>{
        axios.get(`http://localhost:3000/videos/${params.id}`)
        .then(res=>{
            setVideo(res.data)
        })
    },[])

    function cancelClick(){
        navigate("/admin-dashboard")
    }

    function DeleteClick(){
        axios.delete(`http://localhost:3000/videos/${params.id}`)
        .then(()=>{
            console.log("Video deleted")
            alert("Video deleted")
            navigate("/admin-dashboard")
        },[])
    }

    return(
        <div className="conutainer-fluid d-flex p-2">
            <Card>
                <label className="p-2"><h4>Are you Sure to Delete Video</h4></label>
                <CardMedia component="iframe" src={video.url} height="150" />
                <CardHeader title={video.title} />
                <CardActions>
                    <Button fullWidth variant="contained" color="error" onClick={DeleteClick} >OK</Button>
                    <Button fullWidth variant="contained" color="warning" onClick={cancelClick} >NO</Button>
                </CardActions>
            </Card>
        </div>
    )
}