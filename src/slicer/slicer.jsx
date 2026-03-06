import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    videos : [],
    videosCount : 0
}

const videoSlicer = createSlice({
    name : "video-slice",
    initialState,
    reducers : {
       addToCartClick : (state,action)=>{
            state.videos.push(action.payload)
            state.videosCount = state.videos.length
        },
        removeToCartList : (state,action)=>{
            state.videos = state.videos.filter(video=>video.id!==action.payload.id)
            state.videosCount = state.videos.length
        }
    }
})

export const {addToCartClick,removeToCartList} = videoSlicer.actions
export default videoSlicer.reducer
