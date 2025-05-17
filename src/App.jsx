import { useState } from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Body from './Body'
import Login from './login'
import Signup from './signup'
import Logout from './logout'
import Feed from './Feed'
import Profile from './profile'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Connections from './Connections'
import Requests from './Requests'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Provider store={appStore}>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Body/>}>
          <Route path='/login' element={<Login/>}/>
          <Route path='/feed' element={<Feed/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/logout' element ={<Logout/>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<Requests/>} />
        </Route>
      </Routes>
      </BrowserRouter>
     </Provider>
    </>
  )
}

export default App
