import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthService from './Service/AuthService'; 


const Signup = (e) => {

    const [account, setAccount] = useState({
        username: "",
        email: "",
        password: "",
        firstname: "",
        lastname: ""

    })

    const handleChange = (e) => {
        const value = e.target.value;
        setAccount({ ...account, [e.target.name]: value });
    }
    const navigate = useNavigate();


    const SignUp = (e) => {
        e.preventDefault();

        AuthService.signUp(account).then((response) => {

            console.log(response.data)

            navigate('/login');

        }).catch(error => {
            console.log(error)
        })
    }




    return (
        <>
            <section class="">

                <div class="px-4 py-5 px-md-5 text-center text-lg-start">
                    <div class="container">
                        <div class="row gx-lg-5 align-items-center">
                            <div class="col-lg-6 mb-5 mb-lg-0">
                                <h1 class="my-5 display-3 fw-bold ls-tight">
                                    Website <br />
                                    <span class="text-primary">batdongsan</span>
                                </h1>
                                <p>
                                    
                                </p>
                            </div>

                            <div class="col-lg-6 mb-5 mb-lg-0">
                                <div class="card">
                                    <div class="card-body py-5 px-md-5">
                                        <form>

                                            <div class="row">
                                                <div class="row">
                                                    
                                                    <div class="col-md-6 mb-4">

                                                        <div class="form-outline">
                                                            <label class="form-label" for="form3Example1">First name</label>
                                                            <input type="text" id="form3Example1" class="form-control"
                                                                name="firstname"
                                                                value={account.firstname}
                                                                onChange={(e) => handleChange(e)}
                                                            />

                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 mb-4">
                                                        <div class="form-outline">
                                                            <label class="form-label" for="form3Example2">Last name</label>
                                                            <input type="text" id="form3Example2" class="form-control"
                                                                name="lastname"
                                                                value={account.lastname}
                                                                onChange={(e) => handleChange(e)} />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-outline mb-4">
                                                <label class="form-label" for="form3Example3">Username</label>
                                                <input type="text" id="form3Example3" class="form-control"
                                                    name="username"
                                                    value={account.username}
                                                    onChange={(e) => handleChange(e)} />

                                            </div>


                                            <div class="form-outline mb-4">
                                                <label class="form-label" for="form3Example3">Email address</label>
                                                <input type="email" id="form3Example3" class="form-control"
                                                    name="email"
                                                    value={account.email}
                                                    onChange={(e) => handleChange(e)} />

                                            </div>


                                            <div class="form-outline mb-4">
                                                <label class="form-label" for="form3Example4">Password</label>
                                                <input type="password" id="form3Example4" class="form-control"
                                                    name="password"
                                                    value={account.password}
                                                    onChange={(e) => handleChange(e)} />

                                            </div>

                                            <button onClick={SignUp} type="submit" className="btn btn-primary btn-block mb-4">
                                                Sign up
                                            </button>
                                            <div>
                                                <span>You have a account!</span><a href='/login'> Sign In</a>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>


        </>
    )
}

export default Signup;