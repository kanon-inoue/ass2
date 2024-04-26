import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }
  const handlePassword = (event) => {
    setPassword(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://4.237.58.241:3000/user/login")
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={ handleSubmit }>
        <input 
          type="email"
          id="email" 
          name="email"  
          value={email} 
          onChange={ handleEmail }
        />
        <input 
          type="password"
          id="password" 
          name="password"  
          value={password} 
          onChange={ handlePassword }
        />
        <button type="submit">Signin</button>
      </form>
    </div>
  )
}