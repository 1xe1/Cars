import React, { useRef } from 'react';

function Login() {
    const email = useRef();
    const phone = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const apiUrl = 'http://localhost:8081/CarCus/';
        const response = await fetch(apiUrl);
        const data = await response.json();

        const user = data.find(item => item.email === email.current.value && item.phone === phone.current.value);
        
        if (user) {
            localStorage.setItem("emailData", user.email);
            localStorage.setItem("passwordData", user.phone); // Using phone as password
            
            window.location.href="/AdminTable"
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
                    <input type="text" className='my-4 w-60 p-2 border rounded-md focus:outline-none focus:ring focus:border-purple-500 bg-rose-600' ref={phone} />
                </div>
                <button className='w-44 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300'>Login</button>
            </form>
        </div>
    );
}

export default Login;
