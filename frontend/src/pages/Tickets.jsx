import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import TicketItem from '../components/TicketItem'
import { getTickets, reset } from '../features/tickets/ticketSlice'

function Tickets() {
  const { tickets, isLoading, isSucccess } = useSelector(
    (state) => state.tickets
  )

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSucccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSucccess])

  useEffect(() => {
    dispatch(getTickets())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <BackButton url='/' />
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}

export default Tickets
