import { Route, Routes } from "react-router-dom"
import { Completed, Home, Login, Notes, PageLayouts, Pending, Register } from "./App"
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<PageLayouts/>}>
            <Route index element={<Home/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/notes" element={<Notes/>}/>
            <Route path="/completed-notes" element={<Completed/>}/>
            <Route path="/pending-notes" element={<Pending/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
    </Routes>
    <Toaster />
    </>
  )
}

export default App