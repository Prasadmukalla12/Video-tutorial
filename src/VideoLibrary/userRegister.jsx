import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";


export default function UserRegister(){

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues :{
            user_id:"",
            user_name:"",
            password:"",
            email:""
        },
        onSubmit:(user)=>{
            var result = {
                user_id : user.user_id,
                user_name : user.user_name,
                password : user.password,
                email:user.email
            }
            axios.post("http://localhost:3000/user",result)
            .then(()=>{
                alert("User details created successfully")
                navigate("/user-login")
            })
        }
    })

    return(
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{height:"550px"}}>
            <div>
                <form onSubmit={formik.handleSubmit} className="text-dark fw-bold p-3 m-2 rounded rounded-2 bg-white">
                <div>
                    <h3 className="text-center">User Registration</h3>
                </div>
                <div className="my-4">
                    <label className="fw-bold">User ID</label>
                    <div className="mt-2">
                        <TextField onChange={formik.handleChange} type="text" name="user_id" variant="standard" placeholder="Enter User ID" />
                    </div>
                </div>
                <div>
                    <label>UserName</label>
                    <div className="mt-2">
                        <TextField onChange={formik.handleChange} type="text" name="user_name" variant="standard" placeholder="Enter userName" />
                    </div>
                </div>
                <div className="my-4">
                    <label>Password</label>
                    <div className="mt-2">
                        <TextField onChange={formik.handleChange} type="password" name="password" variant="standard" placeholder="Enter Password" />
                    </div>
                </div>
                <div>
                    <label>Email</label>
                    <div>
                        <TextField onChange={formik.handleChange} type="email" name="email" variant="standard" placeholder="Enter Email" />
                    </div>
                </div>
                <div className="my-4">
                    <Button variant="contained" color="success" type="submit" fullWidth>Register</Button>
                </div>
                 <div className="text-center">
                    <Link to="/user-login">Existing User?</Link>
                 </div>
            </form>
            </div>
        </div>
    )
}