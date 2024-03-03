import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Auth from "./Pages/Auth.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
