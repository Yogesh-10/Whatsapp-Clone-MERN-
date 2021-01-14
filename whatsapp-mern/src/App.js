import React from 'react'
// import Pusher from 'pusher-js'
import './App.css'
import Chat from './Chat'
import Sidebar from './Sidebar'
// import axios from './axios'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login'
import { useStateValue } from './StateProvider'
import UseWindowDimensions from './UseWindowDimensions'

function App() {
  // const [user, setUser] = useState(null)
  // const [messages, setMessages] = useState([])

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     const { data } = await axios.get('/api/messages/sync')
  //     setMessages(data)
  //   }
  //   fetchMessages()
  // }, [])

  // useEffect(() => {
  //   const pusher = new Pusher('7027176c6e97d7bdbb74', {
  //     cluster: 'ap2',
  //   })

  //   const channel = pusher.subscribe('messages')
  //   channel.bind('inserted', (newMessage) => {
  //     setMessages([...messages, newMessage])
  //   })

  //   // cleanup function
  //   return () => {
  //     channel.unbind_all()
  //     channel.unsubscribe()
  //   }
  // }, [messages])

  // console.log(messages)

  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue()
  // eslint-disable-next-line
  const { width } = UseWindowDimensions()
  const uid =
    localStorage.getItem('uid') !== undefined
      ? localStorage.getItem('uid')
      : null

  return (
    <div className='app'>
      {!user && !uid ? (
        <Login />
      ) : (
        <div className='app__body'>
          <Router>
            <Sidebar />
            <Switch>
              <Route path='/rooms/:roomId'>
                <Chat />
              </Route>

              {/* <Route> */}
              <Route path='/'>
                <Chat />
              </Route>
              {/* </Route> */}
            </Switch>
          </Router>
        </div>
      )}
    </div>
  )
}

export default App
