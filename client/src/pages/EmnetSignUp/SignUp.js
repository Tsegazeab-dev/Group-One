import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../CONTEXT/UserContext';
import "./SignUp.css"
const SignUp = () => {
  const [userData, setUserData] = useContext(UserContext);
 const  navigate = useNavigate()
const [form, setForm] = useState({})

  const handleChange = (e) =>{
    setForm({...form, [e.target.name]:e.target.value})
}

const handleSubmit = async(e) =>{
  e.preventDefault();
  try{ //sending data to be registered in database
     await axios.post("http://localhost:3500/api/users", form)

     // once registered the login automatically send the new user infoto be logged in 
     const loginRes = await axios.post("http://localhost:3500/api/users/login",
      {
          email: form.email,
          password: form.password
      })

      //updating global state with response from backend(user-info)
      setUserData({
          token: loginRes.data.token,
          user:loginRes.data.user
      })

      //setting localstorage with the token
      localStorage.setItem("auth-token", loginRes.data.token)
      navigate("/") //navigating user to homepage

  }catch (err){
console.log("problem==>", err.response.data.msg);
alert(err.response.data.msg)
  }
}
  return (
    <div>
    <div className='signup'>
    <div className='signup__container'>
      <div className='signup__title'>
        <h2>Join the network</h2>
        <p>Already have an account? <Link className='account__link'  to="/login">Sign in</Link></p>
        
        <form  className='signup__form' aonSubmit={handleSubmit}>
            <input type="email" name ="email" placeholder='Email' onChange={handleChange}/> <br />

          <div className='signup__FLname'>
            <input type="text" name ="firstName" placeholder='First Name' onChange={handleChange}/> <br /> 

            <input id='lastname' type="text" name='lastName'  placeholder='Last Name'onChange={handleChange}/><br />
            </div>

            <input type="text" name='userName'  placeholder='User Name'onChange={handleChange}/><br />

            <input type="password" name='password' placeholder='Password' onChange={handleChange}/><br />
            <button>Agree and Join</button>
        </form>
        <p>I agree to the <a href="">privacy policy</a> and <a href="">terms of service</a></p>
        <Link className='account__link' to = "/login">Already have an ccount?</Link>
        </div>

    </div>
 
        <div className="signup__about">
          <p id='about'>About</p>
      <h1>Evangadi Networks Q&A</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, molestias! Expedita ex nostrum officia harum quos numquam pariatur quas sequi nulla itaque molestias ullam fugit aut voluptatem at, laudantium reprehenderit.</p> 
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates porro quidem maxime in nostrum asperiores quos totam quia, molestias facere, consectetur dolores quod soluta aspernatur obcaecati, ipsam mollitia? Assumenda, fugiat?</p> <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis obcaecati corporis a reiciendis vitae repellat. Repellendus voluptatum et sapiente possimus, reiciendis, necessitatibus voluptas laudantium accusamus totam eligendi consectetur dolorem quae.
      </p>

      <button>HOW IT WORKS</button>
      </div>
      </div>

      <div className="footer">
            <div>
            <img className="footer__image" src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-footer.png"
        alt=""
      />
      <div className="footer_socialLink">
      <span><a href="">facebook</a></span> 
      <span className="footer__instagram"><a href="">insta</a></span> 
      <span><a href="">youtube</a></span>
      </div>
      </div>

<div className="footer__linkList">
    <div className="footer__linkUseful">
      <h3>Useful Link</h3>
      <ul>
        <li>How it works</li>
        <li>Terms of Service</li>
        <li>Privacy policy</li>
      </ul>
      </div>
<div className="footer__linkContact">
      <h3>Contact Info</h3>
      <ul>
        <li>Evangadi Networks</li>
        <li>support@evangadi.com</li>
        <li>+1-202-386-2702</li>
      </ul>
      </div>

      </div>

        </div>
    
    </div>
  )
}

export default SignUp