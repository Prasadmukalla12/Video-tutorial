import { Link } from "react-router-dom";
import "./videoLibraryHome.css";


export default function VideoLibraryHome() {
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="h-50 d-flex justify-content-center align-items-center w-100">
        <main className="row mt-4 w-100 h-100 g-3">

        <div className="col-6 p-2 m-2 admin border border-2 d-flex align-items-center justify-content-center">
          <div className="m-2 p-2">
            <Link to="/admin-login" className="btn btn-success">
              Admin Login
            </Link>
          </div>
        </div>

        <div className="col-6 p-2 m-2 user border border-2 d-flex align-items-center justify-content-center">
          <div className="m-2 p-2">
            <Link to="/user-login" className="btn btn-primary">
              User Login
            </Link>
          </div>
        </div>

      </main>
      </div>
    </div>
  );
}