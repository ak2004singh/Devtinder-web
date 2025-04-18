import { useState } from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Body from './Body'
import Login from './login'
import Signup from './signup'
import Logout from './logout'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Body/>}>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/logout' element ={<Logout/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
