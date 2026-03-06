import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"


export default function AdminLogin(){

    const navigate = useNavigate()
    const [cookie,setCookie,removeCookie] = useCookies(['admin_id'])


    const formik = useFormik({
        initialValues : {
            admin_id:"",
            password : ""
        },
        onSubmit :(admin)=>{
            axios.get("http://localhost:3000/admin")
            .then(res=>{
            var result = res.data.find(item=>admin.admin_id===item.admin_id)
            if(result){
               if(result.password===admin.password){
                  setCookie("admin_id",admin.admin_id,{expires:new Date("2026-03-25")})
                  navigate("/admin-dashboard")
               }else{
                 alert("Invalid Password")
               }
            }else{
                alert("Invalid Admin")
            }
        })
        }
    })

    useEffect(()=>{
        if(cookie['admin_id']){
            navigate("/admin-dashboard")
        }
    },[])

    return(
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
            <div className="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3">
                <form onSubmit={formik.handleSubmit} className="text-dark fw-bold p-2 m-2 rounded rounded-2 bg-white">
                <div>
                    <h3 className="text-center">Admin Login</h3>
                </div>
                <div className="my-4">
                    <label>Admin ID</label>
                    <div className="mt-2">
                        <TextField fullWidth onChange={formik.handleChange} name="admin_id" variant="standard" type="text" placeholder="Enter Admin ID" />
                    </div>
                </div>
                <div>
                    <label>Password</label>
                    <div className="mt-2">
                        <TextField fullWidth onChange={formik.handleChange} name="password" variant="standard" type="password" placeholder="Enter Password" />
                    </div>
                </div>
                <div className="my-3">
                    <Button type="submit" fullWidth variant="contained" color="info" >Sign in</Button>
                </div>
            </form>
            </div>
        </div>
    )
}