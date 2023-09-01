import React, { useRef } from "react";
import './login.css'

function Login() {
  const email = useRef();
  const phone = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiUrl = "http://localhost:8081/CarCus/";
    const response = await fetch(apiUrl);
    const data = await response.json();

    const user = data.find(
      (item) =>
        item.email === email.current.value && item.phone === phone.current.value
    );

    if (user) {
      localStorage.setItem("emailData", user.email);
      localStorage.setItem("passwordData", user.phone); // Using phone as password

      window.location.href = "/AdminTable";
    }
  };

  return (
    <div className="content">
      <form className="text-center p-40" onSubmit={handleSubmit}>
        <div className="p-10">
          <h3>Login</h3>
        </div>
        <div>
          <input
            type="text"
            className="w-60 p-2 border rounded-md focus:outline-none focus:ring focus:border-purple-500 bg-rose-600"
            ref={email}
          />
        </div>
        <div>
          <input
            type="text"
            className="my-4 w-60 p-2 border rounded-md focus:outline-none focus:ring focus:border-purple-500 bg-rose-600"
            ref={phone}
          />
        </div>
        <button className="w-44 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300">
          Login
        </button>
      </form>
      {/* <section>
        <div className="form-box">
          <div className="form-value">
            <form onsubmit="{handleSubmit}">
              <h2>Login</h2>
              <div className="inputbox">
                <ion-icon name="mail-outline" ref={email}/>
                <input type="email" required />
                <label htmlFor>Email</label>
              </div>
              <div className="inputbox">
                <ion-icon name="lock-closed-outline" />
                <input type="password" required ref={phone}/>
                <label htmlFor>Phone</label>
              </div>
              <div className="forget">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <label>
                  <a href="#">Forgot password?</a>
                </label>
              </div>
              <button>Log in</button>
              <div className="register">
                <p>
                  Don't have a account ? <a href="#">Register</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default Login;
