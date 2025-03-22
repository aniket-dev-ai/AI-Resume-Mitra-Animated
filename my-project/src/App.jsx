import React from 'react' 
import { ToastContainer } from 'react-toastify'
import ThemeToggle from './components/themetoggle'
import AuthPage from './components/AuthPage'
import HomePage from './components/HomePage'

function App() {
  return (
    <div>
      <ThemeToggle />
      {/* <AuthPage /> */}
      <HomePage/>
       <ToastContainer position="top-center" autoClose={3000} />
    </div>
  )
}

export default App