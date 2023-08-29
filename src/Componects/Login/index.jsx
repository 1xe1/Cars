import React, { useRef } from 'react';

function Login() {
    const email = useRef();
    const password = useRef();
    const getEmail = localStorage.getItem('emailData');
    const getPassword = localStorage.getItem('passwordData');
    

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email.current.value === "641463021@crru.ac.th" && password.current.value === "123456") {
            localStorage.setItem("emailData", "641463021@crru.ac.th");
            localStorage.setItem("passwordData", "123456");

            window.location.reload();

        }
    };

    return (
        <div>
            <form className='text-center p-40' onSubmit={handleSubmit}>
                <div className='p-10'><h3>Login</h3></div>
                <div>
                    <input type="text" className='w-60 p-2 border rounded-md focus:outline-none focus:ring focus:border-purple-500 bg-rose-600' ref={email} />
                </div>
                <div>
                    <input type="password" name="" id="" className='my-4 w-60 p-2 border rounded-md focus:outline-none focus:ring focus:border-purple-500 bg-rose-600' ref={password} />
                </div>
                <button className='w-44 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 '>Login</button>
            </form>
            
        </div>
    );
}

export default Login;
