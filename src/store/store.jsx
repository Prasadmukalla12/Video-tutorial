import { configureStore } from "@reduxjs/toolkit";
import videoSlicer from "../slicer/slicer.jsx"


export default configureStore({
    reducer : videoSlicer
})