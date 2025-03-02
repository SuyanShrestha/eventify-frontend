import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import EventsList from '../components/events/EventsList'

const Dashboard: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user)

  return (
    <div className='mt-[4rem]'>
      <EventsList isDashboard={true} />
    </div>
  )
}

export default Dashboard