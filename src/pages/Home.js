import React, {useState} from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
export default function Home() {
  const [error, setError] = useState("")
  const {currentUser, logout} = useAuth()
  const history = useHistory()

  async function handleLogout() {

    setError('')
    try {
      await logout() 
      history.push('/login')
    } catch {
      setError('Failed to log out')
    }

  }
  return (
    <div className='home'>
      <h1>Home</h1>
      <button onClick={handleLogout}> Log Out </button>
    </div>
  );
}

