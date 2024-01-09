import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'virtual:uno.css'
import './index.css'
import "launcher-api/dist/index.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Suspense fallback={"Loading..."}>
            <App/>
        </Suspense>
    </React.StrictMode>,
)
