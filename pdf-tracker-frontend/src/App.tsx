
import { Routes, Route} from "react-router-dom";
import './App.css'
import UploadForm from "./components/UploadForm";

function App() {
  

  return (
    <>
    <Routes>
       
      <Route path="/upload" element={<UploadForm/>}/> 


    </Routes>
    
     
    </>
  )
}

export default App
