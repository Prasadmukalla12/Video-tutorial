import { Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, CardMedia, Skeleton } from "@mui/material"
import axios from "axios"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"


export default function AdminDashboard(){

    const [videos,setVideos] = useState([])
    const [categories,setCategories] = useState([])
    const [cookie,setCookie,removeCookie] = useCookies(['admin_id'])
    const navigate = useNavigate()
    const [searchText,setSearchText]  = useState("")
    const [sortItem,setSortItem] =  useState("")
    const [loading,setLoading] = useState(true)

    const LoadVideos = useCallback(()=>{
        axios.get(`http://localhost:3000/videos`)
        .then(res=>{
            setTimeout(()=>{
                setVideos(res.data)
                setLoading(false)
            },3000)
    })
    },[])

    const LoadCategories = useCallback(()=>{
        axios.get(`http://localhost:3000/categories`)
        .then(res=>
            setCategories(res.data)
        )
    },[])

    useEffect(()=>{
        LoadVideos()
        LoadCategories()
        if(!cookie['admin_id']){
            navigate("/admin-login")
        }
    },[])

    const SignOutClick = useCallback(()=>{
        removeCookie('admin_id')
        navigate("/admin-login")
    },[])

    const EditClick = useCallback((id)=>{
        navigate(`/edit-video/${id}`)
    },[])

    const DeleteClick = useCallback((id)=>{
        navigate(`/delete-video/${id}`)
    },[])

    const addClick = useCallback(()=>{
        navigate("/add-video")
    },[])

    const valueChange = useCallback((e)=>{
        setSearchText(e.target.value)
    },[])

    const SortChange = useCallback((e)=>{
        setSortItem(e.target.value)
    },[])
    
    const allFilterItems = useMemo(()=>{
        var values = [...videos]

        if(sortItem==="likes"){
            values = values.sort((a,b)=>b.likes - a.likes)
        }

        if(sortItem==="views"){
            values = values.sort((a,b)=>b.views-a.views)
        }

        if(searchText){
            values = values.filter(item=>item.title.toLowerCase().includes(searchText))
        }

        return values;
    },[videos,searchText,sortItem])


    return(
        <div className="container-fluid min-vh-100 bg-black">
            <nav className="row d-flex justify-content-between align-items-center p-3 text-white border border-2">
                <div className="col-12 col-md-4 mb-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>{cookie["admin_id"]}-Dashboard</h4>
                    <Button sx={{marginLeft:"10px"}} onClick={addClick} variant="contained" color="secondary">Add</Button>
                    </div>
                </div>
                <div className=" col-12 col-md-5 gap-2 mb-2 d-flex justify-content-between">
                    <div className="input-group">
                        <input onChange={valueChange} type="text" className="form-control" placeholder="Search" />
                    </div>
                    <div>
                        <select onChange={SortChange} className="form-select" style={{marginLeft:"10px", width:"100px"}}>
                            <option>Sort</option>
                            <option value="likes">Likes</option>
                            <option value="views">Views</option>
                        </select>
                    </div>
                </div>
                <div className="col-12 col-md-3 text-md-end">

                    <Button variant="contained" color="primary" onClick={SignOutClick} >Sign out</Button>
                </div>
            </nav>
            <section className=" row g-3 p-3 d-flex flex-wrap justify-content-evenly align-items-center">
                {
                    (!loading)? 
                    allFilterItems.map((video,i)=>
                     <Card className="p-1 m-1" sx={{width:"270px"}} key={i}>
                        <CardMedia component="iframe" height="200" src={video.url} controls />
                        <CardHeader title={video.title} />
                        <CardActions>
                            <ButtonGroup fullWidth>
                                <Button><span className="bi bi-hand-thumbs-up-fill">{video.likes}</span></Button>
                                <Button><span className="bi bi-hand-thumbs-down-fill">{video.dislikes}</span></Button>
                                <Button><span className="bi bi-eye-fill">{video.views}</span></Button>
                            </ButtonGroup>
                        </CardActions>
                        <CardActions>
                                <Button onClick={()=>{EditClick(video.id)}} variant="contained" fullWidth color="warning">Edit</Button>
                                <Button variant="contained" onClick={()=>{DeleteClick(video.id)}} fullWidth color="error">Delete</Button>
                        </CardActions>
                     </Card>
                    ) : (<div>
                         <p className="text-white">Please wait...</p>
                    </div>)
                }
            </section>
        </div>
    )
}