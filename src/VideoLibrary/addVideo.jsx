import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup"


export default function AddVideo(){

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues :  {
            title:"",
            url:"",
            likes:0,
            dislikes:0,
            views:0,
            comments:""
        },
        onSubmit:(video)=>{
            var newVideo = {
                title:video.title,
                url:video.url,
                likes:video.likes,
                dislikes:video.dislikes,
                views:video.views,
                comments:video.comments,
                category_id : parseInt(video.category_id)
            }
            axios.post(`http://localhost:3000/videos`,newVideo)
            .then(()=>{
                console.log("Video uploaded")
                alert("New Video uploaded")
                navigate("/admin-dashboard")
            })
        },
        validationSchema:yup.object({
            title: yup.string().required("Title required"),
            url:yup.string().required("URL required"),
            likes:yup.number(),
            dislikes:yup.number(),
            comments:yup.string().required("required field"),
            views:yup.number(),
            category_id:yup.number().required("Category required")
        })
    })

    return(
        <div className="container d-flex justify-content-center align-items-center " style={{height:"500px"}}>
            <div>
                <form onSubmit={formik.handleSubmit} className="row bg-white rounded rounded-2 border border-2 p-2">
                <h2 className="text-center my-3">Add Video</h2>
                <div className="col-6">
                    <TextField onChange={formik.handleChange} type="text" name="title" variant="standard" label="Title" />
                </div>
                <div>
                    <span className="text-danger fw-semibold">{formik.errors.title}</span>
                </div>
                <div className="col-6 my-1">
                    <TextField onChange={formik.handleChange} type="url" name="url" variant="standard" label="URL" />
                </div>
                <div>
                    <span className="text-danger fw-semibold">{formik.errors.url}</span>
                </div>
                <div className="col-6">
                    <TextField onChange={formik.handleChange} type="number" name="likes" variant="standard" label="Likes" />
                </div>
                <div>
                    <span className="text-danger fw-semibold">{formik.errors.likes}</span>
                </div>
                <div className="col-6 mt-1">
                    <TextField onChange={formik.handleChange} type="number" name="dislikes" variant="standard" label="Dislikes" />
                </div>
                <div>
                    <span className="text-danger fw-semibold">{formik.errors.dislikes}</span>
                </div>
                <div className="col-6">
                    <TextField onChange={formik.handleChange} type="number" name="views" variant="standard" label="Views" />
                </div>
                <div>
                    <span className="text-danger fw-semibold">{formik.errors.views}</span>
                </div>
                <div className="col-6 mt-1">
                    <TextField onChange={formik.handleChange} type="text" name="comments" variant="standard" label="Comments" />
                </div>
                <div>
                    <span className="text-danger fw-semibold">{formik.errors.comments}</span>
                </div>
                <div className="col-6 mt-1">
                    <FormControl fullWidth>
                       <InputLabel>Select Category</InputLabel>
                       <Select onChange={formik.handleChange} name="category_id" variant="standard">
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
                    <Button type="submit" sx={{marginRight:"10px"}} variant="contained" color="success"  >Save</Button>
                    <Link to="/admin-dashboard" className="btn btn-warning" >Cancel</Link>
                </div>
            </form>
            </div>
        </div>
    )
}
      