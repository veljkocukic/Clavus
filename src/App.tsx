import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Slide, ToastContainer } from 'react-toastify'
import { Loading } from './components/Loading'
import { SharedLayout, Login, Error, ProtectedRoute } from './views'
import 'react-toastify/dist/ReactToastify.css'
import { adminRoutes, workerRoutes } from 'utils/data'

function App() {

  const user: any = JSON.parse(localStorage.getItem('user'))
  const routes = user?.role === 'ADMIN' ? adminRoutes : workerRoutes

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
          <Route path='login' element={<Login />} />
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
