import React, {  useState } from 'react'
import App from '../../App';


const Login = (e) => {

    

    const [login,setLogin] = useState({
        username: "",
        password: "",
        isLogin : localStorage.getItem("accessToken") != null
    })

    const handleChange = (e)=>{
        const value = e.target.value;
        setLogin({...login,[e.target.name]: value});
    }

    const actlogin =  (e) =>{
        e.preventDefault();
        var myHeader =  new Headers();
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
        

         fetch("http://localhost:8100/api/auth/signin",requestOptions)
            .then(response => {console.log(response)
                    if(response.ok){
                        setLogin(pre => ({...pre,isLogin:true}) )
                        return response.json(); 
                    }
                    throw Error(response.status)
                })
            .then(result => 
                {console.log(result)
                    localStorage.setItem("accessToken",result.accessToken);
                    localStorage.setItem("id",result.id)
                })
            .catch(error => 
                {console.log('error',error)
                        alert("username or password is wrong");
                 }
            )
        
         
          
    }

  return ( 
    <>
        {login.isLogin ? <App key={login.isLogin}/> :
    
    <div className='px-8 py-8'>
        <div className="text-blue-800 justify-center mx-auto flex text-5xl">Login</div>
        <div className="py-5 px-5 border-x-8 justify-center flex">
            <div>
                <div className='text-blue-950 py-2'> 
                    Username:
                    <input
                    name="username"
                    value={login.username}
                    onChange={(e) =>handleChange(e)} type='text' className='border-black mx-3 border-y-2'></input>
                </div>
                <div className='py-2'>
                    Password:
                    <input 
                    name="password"
                    value={login.password} 
                    onChange={(e) =>handleChange(e)} type='password' className='border-black mx-4 border-y-2'></input>
                </div>
                <button onClick={(e) => actlogin(e)} className='bg-green-500 rounded-md px-3 mx-3 my-3'>Login</button>
                <button className='bg-red-300 rounded-md px-3'>Register</button>
            
            </div>
        </div>

    </div>
  
    }   
    </>
  )
}

export default Login;