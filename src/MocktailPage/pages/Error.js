import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <section style={{textAlign:'center', color:'red'}}>
      <h1>Oops! an error occured. Navigated to wrong page.</h1>
      <h3>Please return back to Home!</h3>
        <Link to='/' className='btn-primary'>
        Home Page</Link>
    </section>
  )
}

export default Error
