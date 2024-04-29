import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const navigate = useNavigate();

  const login = (email, password) => {
    return fetch(
      "http://4.237.58.241:3000/user/login",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        method: "POST"
      })
      .then(res => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message)
        } else {
          localStorage.setItem("token", data.token);
        }
      })
      .then(() => navigate("/"));
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }
  const handlePassword = (event) => {
    setPassword(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password)
      .catch((err) => setError(err.message));
  }
  console.log(localStorage.getItem("token"))
  return (
    <div>
      <h1>Login</h1>
      {error ? (
        <div>Error! {error}</div>
      ) : null}
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