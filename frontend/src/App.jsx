import {BrowserRouter , Routes as Router , Route} from 'react-router'
import Login from './pages/login/Login'
import Sign from './pages/signup/Signup'
import Home from './pages/home/Home'
import {Toaster} from 'react-hot-toast'

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Router>
          <Route path='/login' element = {<Login />} />
          <Route path='/sign' element = {<Sign />} />
          <Route path='/' element = {<Home />} />
        </Router>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
