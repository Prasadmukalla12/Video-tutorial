
import {Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, CardMedia } from "@mui/material"
import axios from "axios"
import { useEffect, useLayoutEffect, useState, useTransition } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addToCartClick, removeToCartList } from "../slicer/slicer"


export default function UserDashboard(){

    const [videos,setVideos] = useState([])
    const [categories,setCategories] = useState([])
    const navigate = useNavigate()
    const [searchText,setSearchText]  = useState("")
    const [sortItem,setSortItem] =  useState("")
    const [course,setCourse] = useState("")

    const dispatch = useDispatch()
    const savedVideos = useSelector(state=>state.videos)
    const videosCount = useSelector(state=>state.videosCount)

    function handleSaveClick(video){
        dispatch(addToCartClick(video))
    }

    function handleDeleteClick(video){
        dispatch(removeToCartList(video))
    }

    function LoadVideos(){
        axios.get(`http://localhost:3000/videos`)
        .then(res=>{
            setVideos(res.data)
    })
    }

    function LoadCategories(){
        axios.get(`http://localhost:3000/categories`)
        .then(res=>
            setCategories(res.data)
        )
    }

    function handleLikeClick(video){
        const updateLikes = video.likes + 1
        axios.patch(`http://localhost:3000/videos/${video.id}`,{likes:updateLikes})
        .then(()=>{
            LoadVideos()
        })
    }

    function handleDislikeClick(video){
        const updateDislikes = video.dislikes + 1
        axios.patch(`http://localhost:3000/videos/${video.id}`,{dislikes : updateDislikes})
        .then(()=>{
            LoadVideos()
        })
    }

    useLayoutEffect(()=>{
         LoadVideos()
        LoadCategories()
    },[])

    function valueChange(e){
        setSearchText(e.target.value)
    }

    function SortChange(e){
        setSortItem(e.target.value)
    }

    function CourseChange(e){
        setCourse(e.target.value)
    }
    
    function AllFilters(){
        var values = [...videos]

        if(searchText){
            values = values.filter(item=>item.title.toLowerCase().includes(searchText))
        }

        if(sortItem==="likes"){
            values = values.sort((a,b)=>b.likes-a.likes)
        }

        if(sortItem==="views"){
            values = values.sort((a,b)=>b.views-a.views)
        }

        if(course){
            values = values.filter(item=>item.category_id===parseInt(course))
        }

        return values
    }

    const filterVideos = AllFilters()

    return(
        <div className="container-fluid bg-secondary">
            <nav className=" row d-flex justify-content-between align-items-center p-2 text-white border border-2">
                <div className="col-12 col-md-6 col-sm-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="me-3">User Dashboard</h4>
                    </div>
                </div>
                <div className=" row d-flex justify-content-between">
                    <div className="col-3">
                        <input onChange={valueChange} type="text" className="form-control" placeholder="Search" />
                    </div>
                    <div className="col-3">
                        <select onChange={SortChange} className="form-select" style={{marginLeft:"10px", width:"100px"}}>
                            <option>Sort</option>
                            <option value="likes">Likes</option>
                            <option value="views">Views</option>
                        </select>
                    </div>
                    <div className="col-3">
                        <select onChange={CourseChange} className="form-select" style={{marginLeft:"10px", width:"100px"}}>
                            <option value="">Course</option>
                            <option value="1">React</option>
                            <option value="2">Java</option>
                            <option value="3">Python</option>
                        </select>
                    </div>
                    <div className="col-3">
                    <button data-bs-toggle="offcanvas" data-bs-target="#slide" className="bi bi-cart4 btn btn-secondary position-relative"><span className="badge bg-danger position-absolute border-top-0">{videosCount}</span></button>

                    <div className="offcanvas offcanvas-end" id="slide">
                        <div className="offcanvas-header">
                            <div className="d-flex justify-content-between w-100">
                                <span className="fs-4 fw-bold">Saved</span>
                                <span><button className="btn btn-close" data-bs-dismiss="offcanvas"></button></span>
                            </div>
                        </div>
                        <div className="offcanvas-body">
                            {
                                  <table className="table table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Preview</th>
                                            <th>Title</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                           savedVideos.map((video,i)=>
                                            <tr key={i}>
                                               <td><iframe src={video.url} height="80" width="90"></iframe></td>
                                               <td>{video.title}</td>
                                               <td><button onClick={()=>{handleDeleteClick(video)}} className="bi bi-trash btn btn-danger"></button></td>
                                            </tr>
                                        ) 
                                        }
                                    </tbody>
                                  </table>
                            }
                        </div>
                    </div>
                </div>
                

                </div>
            </nav>
            <section className=" row g-3 d-flex flex-wrap justify-content-evenly align-items-center">
                {
                    filterVideos.map((video,i)=>
                     <div className="col-12 col-md-4 col-sm-6 col-lg-3">
                        <Card className="p-1 m-1" key={i}>
                        <CardMedia component="iframe" height="200" src={video.url} controls />
                        <CardHeader title={video.title} />
                        <CardActions>
                            <ButtonGroup fullWidth>
                                <Button onClick={()=>{handleLikeClick(video)}} ><span className="bi bi-hand-thumbs-up-fill">{video.likes}</span></Button>
                                <Button onClick={()=>{handleDislikeClick(video)}} ><span className="bi bi-hand-thumbs-down-fill">{video.dislikes}</span></Button>
                                <Button><span className="bi bi-eye-fill">{video.views}</span></Button>
                            </ButtonGroup>
                        </CardActions>
                        <Button onClick={()=>{handleSaveClick(video)}} className="bi bi-eye" variant="contained" color="secondary" fullWidth >Save</Button>
                     </Card>
                     </div>
                    )
                }
            </section>
        </div>
    )
}