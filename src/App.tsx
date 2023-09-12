import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Slide, ToastContainer } from 'react-toastify'
import { Loading } from './components/Loading'
import { SharedLayout, Error, ProtectedRoute, Login } from './views'
import 'react-toastify/dist/ReactToastify.css'
import { adminRoutes, workerRoutes } from 'utils/data'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { Auth } from 'views/Login/Auth'
import { Register } from 'views/Login/Register'

function App() {

  const localUser: any = JSON.parse(localStorage.getItem('user'))
  const { user } = useSelector((state: RootState) => state.user)
  const routes = user ? user?.role === 'ADMIN' ? adminRoutes : workerRoutes : localUser?.role === 'ADMIN' ? adminRoutes : workerRoutes

  return (
    <>
      <Loading />
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            {routes.map((r, i) => <Route key={i} path={r.path} element={<r.element />} />)}
            <Route path='*' element={<Error />} />
          </Route>
          <Route path='auth' element={<Auth />} />
          <Route path='auth/login' element={<Login />} />
          <Route path='auth/register' element={<Register />} />
        </Routes>
      </Router>
      <ToastContainer
        position='top-center'
        autoClose={2000}
        theme={'dark'}
        hideProgressBar={false}
        newestOnTop={false}
        limit={2}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        style={{ borderColor: 'red' }}
        transition={Slide}
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
