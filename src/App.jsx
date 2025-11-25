import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Contact from './components/Contact'
import Footer from './components/footer'
import Header from './components/Header'
import About from './pages/About'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/portfolio' element={<Portfolio/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
