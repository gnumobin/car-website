import { Route, Routes } from 'react-router'
import './App.scss'
import HeadNav from './components/HeadNav/HeadNav'
import HomePage from './pages/HomePage/HomePage'
import ProductsPage from './pages/ProductsPage/ProductsPage'
import ProductPage from './pages/ProductPage/ProductPage'

function App() {
  return <>
    <HeadNav />
    <Routes>
      <Route path='/' element={<ProductsPage />} />
      <Route path='/products' element={<HomePage />} />
      <Route path='/product' element={<ProductPage />} />
    </Routes>
  </>
}

export default App