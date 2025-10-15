import { useState } from 'react'
import './App.css'
import Inicio from './assets/pages/Inicio'
import { BrowserRouter, Route, Routes } from 'react-router'
import Producto from './assets/pages/Producto'
import Header from './assets/components/header'
import Footer from './assets/components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
 <>
    <BrowserRouter>
    <Header></Header>
      <Routes>
        <Route index element = {<Inicio></Inicio>}></Route>
        <Route path='Producto' element = {<Producto></Producto>}></Route>
      </Routes>
    </BrowserRouter>
    <Footer></Footer>
 </>
  )
}

export default App
