import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage";
import MainPage from "./Pages/MainPage";
import WorkersPage from "./Pages/WorkersPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<HomePage/>} />
          <Route path="/workers" element={<WorkersPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
