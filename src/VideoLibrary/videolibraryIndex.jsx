import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import "./videoLibraryIndex.css"
import { lazy, Suspense } from "react";

const VideoLibraryHome = lazy(()=>
    import("./videoLibraryHome")
)
const AdminLogin = lazy(()=>
    import("./adminLogin")
)
const UserLogin = lazy(()=>
    import("./userLogin")
)
const UserRegister = lazy(()=>
    import("./userRegister")
)
const AdminDashboard = lazy(()=>
    import("./adminDashboard")
)
const EditVideo  = lazy(()=>
    import("./editVideo")
)
const DeleteVideo = lazy(()=>
    import("./deleteVideo")
)
const AddVideo = lazy(()=>
    import("./addVideo")
)
const UserDashboard = lazy(()=>
    import("./userDashboard")
)

export default function VideoLibraryIndex(){

    return(
        <div className="container bg-poster">
           <BrowserRouter>
           <header className="p-2 bg-white border border-3 border-dark d-flex justify-content-between align-content-center">
            <div><h3>Video Library</h3></div>
            <div><Link to="/" className="btn btn-primary bi bi-house"></Link></div>
           </header>
           <section>
                <Suspense fallback={<h3 className="text-white text-center">Loading...</h3>}>
                    <Routes>
                    <Route path="/"  element={<VideoLibraryHome/>}/>
                    <Route path="admin-login"  element={<AdminLogin/>}/>
                    <Route path="user-login"  element={<UserLogin/>}/>
                    <Route path="user-register"  element={<UserRegister/>}/>
                    <Route path="user-dashboard"  element={<UserDashboard />}/>
                    <Route path="admin-dashboard"  element={<AdminDashboard/>}/>
                    <Route path="add-video"  element={<AddVideo />}/>
                    <Route path="edit-video/:id"  element={<EditVideo />}/>
                    <Route path="delete-video/:id"  element={<DeleteVideo />}/>
                </Routes>
                </Suspense>
           </section>
           </BrowserRouter>
        </div>
    )
}