import React, { useState } from "react";
import API from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";


const LoginPage = () => {


const [formData,setFormData] = useState({

 email:"",
 password:""

});


const [error,setError] = useState("");


const navigate = useNavigate();





// INPUT CHANGE

const handleChange = (e)=>{


setFormData({

 ...formData,

 [e.target.name]:e.target.value

});


};







// LOGIN FUNCTION

const handleSubmit = async(e)=>{


e.preventDefault();


setError("");



try{


const res = await API.post(
 "/users/login",
 formData
);



const {token,user} = res.data;




// SAVE TOKEN

localStorage.setItem(
 "token",
 token
);



// SAVE USER FOR PROFILE PAGE

localStorage.setItem(
 "user",
 JSON.stringify(user)
);




console.log(
 "Logged user:",
 user
);





// ROLE BASE NAVIGATION


if(user.role === "admin"){


navigate(
 "/admin/dashboard"
);


}

else if(user.role === "provider"){


navigate(
 "/provider/dashboard"
);


}

else{


navigate(
 "/user/dashboard"
);


}



}


catch(err){


setError(

err.response?.data?.message ||
"Invalid credentials"

);


}



};










return(

<>



{/* BACK BUTTON */}


<button

type="button"

onClick={()=>navigate("/")}

className="btn btn-light position-fixed top-0 start-0 m-4 shadow-sm fw-bold"

style={{

borderRadius:"12px",

zIndex:1000

}}

>

← Back to Home

</button>










<div

className="d-flex align-items-center justify-content-center vh-100"

style={{

backgroundColor:"#f8fafc",

backgroundImage:
"radial-gradient(#cbd5e1 1px, transparent 1px)",

backgroundSize:"30px 30px"

}}

>



<div

className="card border-0 p-4 p-md-5 shadow-lg"


style={{


width:"100%",

maxWidth:"440px",

borderRadius:"2rem",

background:"rgba(255,255,255,0.8)",

backdropFilter:"blur(10px)"


}}

>





{/* TITLE */}



<div className="text-center mb-4">


<h1

className="fw-bold mb-1"

style={{

color:"#1e293b",

fontSize:"2.5rem"

}}

>

NearbyHelper

</h1>



<p className="text-secondary small fw-medium">

Sign in to access your dashboard

</p>



</div>










{/* ERROR */}



{

error &&

<div

className="alert alert-danger text-center"

>

{error}

</div>


}









<form onSubmit={handleSubmit}>





{/* EMAIL */}


<div className="mb-3">


<label className="form-label fw-bold">

Email Address

</label>



<input

type="email"

name="email"

className="form-control form-control-lg"

placeholder="name@example.com"

value={formData.email}

onChange={handleChange}

required

/>

</div>










{/* PASSWORD */}



<div className="mb-4">



<label className="form-label fw-bold">

Password

</label>



<input

type="password"

name="password"

className="form-control form-control-lg"

placeholder="••••••••"

value={formData.password}

onChange={handleChange}

required

/>


</div>









{/* LOGIN BUTTON */}



<button

type="submit"

className="btn btn-primary w-100 py-3 fw-bold"

style={{


background:"#1e293b",

borderRadius:"1rem",

border:"none"


}}

>

Login

</button>




</form>









<div className="text-center mt-4">


<p>

Don't have an account?


<Link

to="/register"

className="fw-bold text-decoration-none ms-1"

>

Register Now

</Link>


</p>


</div>






</div>


</div>



</>

);


};



export default LoginPage;