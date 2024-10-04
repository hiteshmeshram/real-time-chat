import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [socket,setSocket] = useState<WebSocket | null>(null);
  const [messages,setMessages] = useState<string[]>([])
  const [message,setMessage] = useState("")

  useEffect(()=>{
    const socket = new WebSocket('ws://localhost:8081');
    socket.onopen = () => {
      console.log('Connection established');
      setSocket(socket);
    }
    socket.onmessage = (message) => {
      setMessages(m=>[...m,message.data])
    }
    return () => socket.close();
  },[])

  if (!socket) {
    return <div>
      establishing connection
    </div>
  }
  return (
    <div className='bg-slate-100 min-h-screen'>
      <div className='w-1/4 h-96 border bg-white   relative top-6 left-4 rounded-2xl shadow-xl'>
      <div className='flex justify-center mt-2'>Group chat</div>
        <div className='mt-5 max-h-72 overflow-y-scroll   scroll-auto ml-4'>
          {messages.map((message)=>{
            return <p className='border-b pb-2 mr-4 '>{message}</p>
          })}
          
          
        </div>
        <div className='flex justify-between absolute bottom-2'>
          <div className='ml-5 '>
            <input 
              onKeyDown={(e)=>{
                if(e.key==="Enter") {
                  socket.send(message)
                  
                }
              }}
              onChange={(e)=>setMessage(e.target.value)} 
              type='text' placeholder='type message'
              className='border border-black px-2 py-1 rounded-md w-64'>
            </input>
          </div>
          <div>
              <button onClick={()=>{
                socket.send(message)
                
                setMessage("")
              }} className='bg-white border border-black py-1 px-4 rounded-2xl mr-5 ml-1'>send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
