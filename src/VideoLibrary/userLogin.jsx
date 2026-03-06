import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";


export default function UserLogin(){

    const navigate = useNavigate()
    const [cookie,setCookie,removeCookie] = useCookies(['user_id'])

    const formik = useFormik({
        initialValues : {
            user_id:"",
            password:""
        },
        onSubmit:(user)=>{
            axios.get("http://localhost:3000/user")
            .then(res=>{
                var result = res.data.find(item=>item.user_id===user.user_id)
                if(result){
                    if(result.password===user.password){
                        navigate("/user-dashboard")
                    }else{
                        alert("Invalid Password")
                    }
                }else{
                    alert("Invalid UserID")
                }
            })
        }
    })

   
    return(
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
            <div>
                <form onSubmit={formik.handleSubmit} className="text-dark fw-bold p-2 m-2 rounded rounded-2 bg-white">
                <div>
                    <h3 className="text-center">User Login</h3>
                </div>
                <div className="my-4">
                    <label>User ID</label>
                    <div className="mt-2">
                        <TextField onChange={formik.handleChange} variant="standard" type="text" name="user_id" placeholder="Enter User ID" />
                    </div>
                </div>
                <div>
                    <label>Password</label>
                    <div className="mt-2">
                        <TextField onChange={formik.handleChange} variant="standard" type="password" name="password" placeholder="Enter Password" />
                    </div>
                </div>
                <div className="my-4">
                    <Button variant="contained" type="submit" color="success" fullWidth  >Log in</Button>
                </div>
                 <div className="text-center">
                    <Link to="/user-register">New User?</Link>
                 </div>
            </form>
            </div>
        </div>
    )
}