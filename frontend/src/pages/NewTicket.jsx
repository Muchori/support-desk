import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

import { createTicket, reset } from '../features/tickets/ticketSlice'

function NewTicket() {
  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      dispatch(reset())
      navigate('/tickets')
    }

    dispatch(reset())
  }, [isError, isLoading, isSuccess, message, dispatch, navigate])

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createTicket({ product, description }))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' className='form-control' value={name} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input type='text' className='form-control' value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product Name</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value='iPhone'>iPhone</option>
              <option value='Macbook Pro'>Macbook Pro</option>
              <option value='Samsung'>Samsung</option>
              <option value='iPad'>iPad</option>
              <option value='Google Plus'>Google Plus</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description of the issue</label>
            <textarea
              id='description'
              name='description'
              className='form-control'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket
