import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import GPA from "./pages/GPA"

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/gpa' element={<GPA/>}/>
    </Routes>
  )
}

export default App
