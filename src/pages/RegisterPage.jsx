import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";

export default function RegisterPage () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const navigate = useNavigate();

  const register = (email, password) => {
    return fetch(
      "http://4.237.58.241:3000/user/register",
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
    register(email, password)
      .catch((err) => setError(err.message));
  }

  return (
    <Container>
      <h1>Register</h1>
      {error ? (
        <div class="alert alert-danger" role="alert">Error! {error}</div>
      ) : null}
      <form className="form" onSubmit={ handleSubmit }>
        <div className="formSection">
          <label className="d-block">Email:</label>
          <input 
            className="d-block"
            type="email"
            id="email" 
            name="email"  
            value={email} 
            onChange={ handleEmail }
            style={{width: "350px"}}
            placeholder="email@example.com"
            alt="user registration input for their email address"
          />
        </div>
        <div className="formSection">
          <label className="d=block">Password:</label>
          <input 
            className="d-block"
            type="password"
            id="password" 
            name="password"  
            value={password} 
            onChange={ handlePassword }
            style={{width: "350px"}}
            placeholder="Password"
            alt="user registration input for their password"
          />
        </div>
        <div className="submitButtons">
          <button type="submit" className="btn btn-outline-primary submitbtn" accesskey="R">Register</button>
        </div>
      </form>
    </Container>
  )
}
