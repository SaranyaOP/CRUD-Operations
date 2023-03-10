import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import login_img from '../images/login_img.png';
const Login = () =>{
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[lemail,setLEmail] = useState("");
    const[lpassword,setLPassword] = useState("");
    const[userData,setUdata] = useState([]);
    const[msg,setMsg] = useState("");

    const userLogin = () =>{

        let formstatus = true;
        var epattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(! epattern.test(email)){
            formstatus= false;
        }else    
         if(password == ""){
            formstatus= false;
        }

        if(formstatus == true){

            fetch(`http://localhost:1234/user?email=${email}&password=${password}`)
            .then(response => response.json())
            .then(data =>{
               
                if(data.length > 0){
                 
                    localStorage.setItem("id", data[0].id);
                    localStorage.setItem("name", data[0].name);
                    window.location.href="#/dashboard";
                    window.location.reload();
                  
                }
                else{
                    setMsg("This email & password does not exist..!")
                    setEmail('')
                    setPassword('')
                }
               
            })
        }else{
            setMsg("Please Enter valid email & password");
        }

    }
    
 
    return(
        <>
        {/* <a href="https://lovepik.com/images/png-account.html">Account Png vectors by Lovepik.com</a> */}
        <div className="container-fluid mybody">
            <div className="log-container shadow">
                <div className="row">
                   <div className="col-lg-6">
                        <div className="image_section">
                            <a href="https://lovepik.com/images/png-account.html">
                            <img src={login_img} alt="Account Png vectors by Lovepik.com" className='Limage'/>
                            </a>
                        </div>
                   </div>
                   <div className="col-lg-6">
                        <div className="login-forms">
                            <div className='login-content'>
                                <h3 className='pb-1'>Login
                                <i className="fa fa-lock m-1 login-icon" aria-hidden="true"></i>
                                </h3>
                                <p className='text-center text-danger'>{msg}</p>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" placeholder='Enter email'
                                    onChange={obj=>setEmail(obj.target.value)}
                                    value={email}/>
                                   
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder='Enter Password'
                                    onChange={obj=>setPassword(obj.target.value)}
                                    value={password}/>
                                   
                                </div>
                                <div className='form-group'>
                                    <button className='btn btn-block login-btn' onClick={userLogin}>Login</button>
                                </div>
                                <div className='form-group'>
                                    <span className='ms-3'>
                                    <input type="checkbox" className='form-check-input'/>Remember me
                                    </span>
                                    <span className='float-end'>
                                        Forgott password?
                                    </span>
                                </div>
                                <div className='form-group'>
                                    <p className='text-center'>Do you have Account? 
                                    <Link to ="/register" className='reg-link ms-1'>Register </Link> here</p>
                                </div>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Login;