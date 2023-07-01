import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import App from '../../App';
import Signup from './Signup';


const Login = (e) => {

    const navigate = useNavigate();

    const [login, setLogin] = useState({
        username: "",
        password: "",
        isLogin: localStorage.getItem("accessToken") != null
    })

    const handleChange = (e) => {
        const value = e.target.value;
        setLogin({ ...login, [e.target.name]: value });
    }

    const actlogin = (e) => {
        e.preventDefault();
        var myHeader = new Headers();
        myHeader.append("Content-Type", "application/json");

        // var urlencoded = new URLSearchParams();
        // urlencoded.append("username","map");
        // urlencoded.append("password","12345678");

        //  setLogin({
        //     username : "map",
        //     password : "12345678"
        //  })


        var requestOptions = {
            method: "POST",
            headers: myHeader,
            body: JSON.stringify(login)

        }


        fetch("http://localhost:8100/api/auth/signin", requestOptions)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    setLogin(pre => ({ ...pre, isLogin: true }))
                    return response.json();
                }
                throw Error(response.status)
            })
            .then(result => {
                console.log(result)
                localStorage.setItem("accessToken", result.accessToken);
                localStorage.setItem("id", result.id)
                localStorage.setItem("role", result.roles)
                navigate('/');
            })
            .catch(error => {
                console.log('error', error)
                alert("username or password is wrong");
            }
            )



    }

    return (
        <>
            {login.isLogin ? <App key={login.isLogin} /> :

                <div className='px-8 py-8'>
                    
                    <div>
                        <section class="">

                            <div class="px-4 py-5 px-md-5 text-center text-lg-start">
                                <div class="container">
                                    <div class="row gx-lg-5 align-items-center">
                                        <div class="col-lg-6 mb-5 mb-lg-0">
                                            <h1 class="my-5 display-3 fw-bold ls-tight">
                                                The best website <br />
                                                <span class="text-primary">Real Estate</span>
                                            </h1>
                                            <p>
                                                
                                            </p>
                                        </div>

                                        <div class="col-lg-6 mb-5 mb-lg-0">
                                            <div class="card">
                                                <div class="card-body py-5 px-md-5">
                                                    <form>

                                                        <div class="form-outline mb-4">
                                                            <label class="form-label" for="form3Example3">Username</label>
                                                            <input type="text" id="form3Example3" class="form-control"
                                                                name="username"
                                                                value={login.username}
                                                                onChange={(e) => handleChange(e)}/>

                                                        </div>


                                                        <div class="form-outline mb-4">
                                                            <label class="form-label" for="form3Example3">Password</label>
                                                            <input type="password" id="form3Example3" class="form-control"
                                                                name="password"
                                                                value={login.password}
                                                                onChange={(e) => handleChange(e)}/>

                                                        </div>


                                                    
                                                        <button onClick={(e) => actlogin(e)} type="submit" className="btn btn-primary btn-block mb-4">
                                                            Login
                                                        </button>
                                                        <div>
                                                            <span>You have a account?</span><a href='/signup'> Sign Up</a>

                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>
                    </div>
                </div >

            }
        </>
    )
}

export default Login;