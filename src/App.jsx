import { Route, Routes } from 'react-router'
import './App.scss'
import HeadNav from './components/HeadNav/HeadNav'
import HomePage from './pages/HomePage/HomePage'
import ProductsPage from './pages/ProductsPage/ProductsPage'

function App() {
  return <>
    <HeadNav />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/products' element={<ProductsPage />} />
    </Routes>
  </>
}

export default App