import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup"


export default function EditVideo(){

    const navigate = useNavigate()
    const params = useParams()
    const [video,setVideo] = useState({})
    
    function cancelClick(){
        navigate("/admin-dashboard")
    }

    useLayoutEffect(()=>{
        axios.get(`http://localhost:3000/videos/${params.id}`)
        .then(res=>{
            setVideo(res.data)
        })
    },[])

    const formik = useFormik({
        initialValues :  {
            title:video.title || "",
            url:video.url || "",
            likes:video.likes || 0,
            dislikes:video.dislikes || 0 ,
            views:video.views || 0,
            comments:video.comments|| "",
            category_id:video.category_id ||0
        },
        onSubmit :(details)=>{
            var newVideo = {
                title:details.title,
                url:details.url,
                likes:details.likes,
                dislikes:details.dislikes,
                views:details.views,
                comments:details.comments,
                category_id : parseInt(details.category_id)
            }
            axios.put(`http://localhost:3000/videos/${params.id}`,newVideo)
            .then(()=>{
                console.log("Video updated")
                alert("Video updated")
                navigate("/admin-dashboard")
            })
        },
        validationSchema : yup.object({
            title: yup.string().required("Title required"),
            url:yup.string().required("URL required"),
            likes:yup.number(),
            dislikes:yup.number(),
            comments:yup.string().required("required field"),
            views:yup.number(),
            category_id:yup.number().required("Category required")
        }),
        enableReinitialize : true
    })

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center " style={{height:"500px"}}>
            <div>
                <form onSubmit={formik.handleSubmit} className="row bg-white rounded rounded-2 border border-2 p-2">
                <h2 className="text-center my-3">Edit Video</h2>
                <div className="col-6">
                    <TextField onChange={formik.handleChange} value={formik.values.title} type="text" name="title" variant="standard" label="Title" />
                </div>
                <div>
                    <span className="text-danger fw-semibold">{formik.errors.title}</span>
                </div>
                <div className="col-6 my-1">
                    <TextField onChange={formik.handleChange} value={formik.values.url} type="url" name="url" variant="standard" label="URL" />
                </div>
                <div>
                    <span className="text-danger fw-semibold">{formik.errors.url}</span>
                </div>
                <div className="col-6">
                    <TextField onChange={formik.handleChange} value={formik.values.likes} type="number" name="likes" variant="standard" label="Likes" />
                </div>
                <div>
                    <span className="text-danger fw-semibold">{formik.errors.likes}</span>
                </div>
                <div className="col-6 mt-1">
                    <TextField onChange={formik.handleChange} value={formik.values.dislikes} type="number" name="dislikes" variant="standard" label="Dislikes" />
                </div>
                <div>
                    <span className="text-danger fw-semibold">{formik.errors.dislikes}</span>
                </div>
                <div className="col-6">
                    <TextField onChange={formik.handleChange} value={formik.values.views} type="number" name="views" variant="standard" label="Views" />
                </div>
                <div>
                    <span className="text-danger fw-semibold">{formik.errors.views}</span>
                </div>
                <div className="col-6 mt-1">
                    <TextField onChange={formik.handleChange} value={formik.values.comments} type="text" name="comments" variant="standard" label="Comments" />
                </div>
                <div>
                    <span className="text-danger fw-semibold">{formik.errors.comments}</span>
                </div>
                <div className="col-6 mt-1">
                    <FormControl fullWidth>
                       <InputLabel>Select Category</InputLabel>
                       <Select name="category_id" value={formik.values.category_id} onChange={formik.handleChange} variant="standard">
                           <MenuItem value="1">React</MenuItem>
                           <MenuItem value="2">Java</MenuItem>
                           <MenuItem value="3">Python</MenuItem>
                         </Select>
                     </FormControl>
                </div>
                <div>
                    <span className="text-danger fw-semibold">{formik.errors.category_id}</span>
                </div>
                <div className="my-4">
                    <Button type="submit" sx={{marginRight:"10px"}} variant="contained" color="success">Save</Button>
                    <Button variant="contained" onClick={cancelClick} color="warning">Cancel</Button>
                </div>
            </form>
            </div>
        </div>
    )
}