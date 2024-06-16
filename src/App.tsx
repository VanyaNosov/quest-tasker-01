import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import 'react-phone-input-2/lib/style.css'
import 'react-datepicker/dist/react-datepicker.css';
function App() {

  return (
    <Routes>
      <Route path="/*" element={<Home />}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />}/>
    </Routes>
  )
}

export default App
