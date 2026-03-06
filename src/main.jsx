import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import { GridComponant } from './tasks/gridtask.jsx'
import  VideoLibraryIndex  from './VideoLibrary/videolibraryIndex.jsx'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import store from './store/store.jsx'

createRoot(document.getElementById('root')).render(
    
    <CookiesProvider>
        <Provider store={store}>
            <VideoLibraryIndex />
        </Provider>
    </CookiesProvider>
)
