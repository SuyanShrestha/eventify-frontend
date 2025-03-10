

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'

const SuccessPage = () => {
  
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const ticket_id = searchParams.get("ticket_id");
  const [message,setMessage] = useState('')
  const navigate = useNavigate()
  useEffect(()=>{
    const successApi = async()=>{
        try{    
            const response = await axios.post('http://localhost:8000/api/payments/verify/',{
                session_id,
                ticket_id
            },{
                headers:{
                    Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQyMjI4ODMxLCJpYXQiOjE3NDE2MjQwMzEsImp0aSI6IjA5YmIwZmNhZjFkNDQ5NTVhZjQyZGI5NDUxNDA0M2JhIiwidXNlcl9pZCI6MX0.QWZR_5029J73UK0Hgnx06930vFNH2874rdAMeGtBUZQ`
                }
            })
            if(response.data){
                setMessage('success')
                setTimeout(()=>{navigate('/')},4000)
            }
        }catch(error){
            setMessage(`error occured ${error}`)
            setTimeout(()=>{navigate('/')},4000)
        }
    }
    successApi()
  })
  return (
    <div className='pt-[90px]'>{message}</div>
  )
}

export default SuccessPage