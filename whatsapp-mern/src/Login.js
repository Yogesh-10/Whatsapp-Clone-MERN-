import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebase'
import './Login.css'
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'

const Login = () => {
  // eslint-disable-next-line
  const [{}, dispatch] = useStateValue()

  const signIn = async () => {
    try {
      const result = await auth.signInWithPopup(provider)
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
      })

      dispatch({
        type: actionTypes.SET_SESSION,
        uid: result.user.uid,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='login'>
      <div className='login__container'>
        {/* <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/897px-WhatsApp.svg.png'
          alt='Whatsapp Icon'
        /> */}
        {/* <div className='login__text'>
          <h1>Sign in to Whatsapp</h1>
        </div> */}

        <Button className='resButton' type='submit' onClick={signIn}>
          Sign in with Google
        </Button>
      </div>
      <p className='basetext__p'>
        &copy; This clone App is developed and Mainted by{' '}
        <a
          className='basetext__a'
          rel='noreferrer'
          href='https://github.com/Yogesh-10'
          target='_blank'
        >
          Yogesh
        </a>
      </p>
    </div>
  )
}

export default Login
