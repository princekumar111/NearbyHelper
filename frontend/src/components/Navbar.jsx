


import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Search,
  User
} from "lucide-react";

import API from '../utils/axios';
import './Navbar.css';


const Navbar = ({ role }) => {

const navigate = useNavigate();

const [search,setSearch] = useState("");
const [suggestions,setSuggestions] = useState([]);

const dropdownRef = useRef(null);


/* ---------- PROFILE CLICK ---------- */


const handleProfile = ()=>{

 const token = localStorage.getItem("token");

 if(token){

   navigate("/profile");

 }
 else{

   navigate("/login");

 }

};




/* ---------- LOGOUT ---------- */


const handleLogout = ()=>{

localStorage.clear();

navigate("/");

};





/* ---------- SEARCH SUGGESTION ---------- */


useEffect(()=>{


const fetchSuggestions = async()=>{


if(!search.trim()){

setSuggestions([]);
return;

}


try{

const res = await API.get(
 `/providers/suggest?q=${search}`
);

setSuggestions(res.data);


}
catch(err){

console.log(err);

}


};


const timer=setTimeout(
fetchSuggestions,
400
);


return ()=>clearTimeout(timer);


},[search]);





const handleSelect=(value)=>{

navigate(`/providers/${value}`);

setSearch("");

setSuggestions([]);

};





useEffect(()=>{


const close=(e)=>{


if(
dropdownRef.current &&
!dropdownRef.current.contains(e.target)
){

setSuggestions([]);

}

};


document.addEventListener(
"mousedown",
close
);


return ()=>document.removeEventListener(
"mousedown",
close
);



},[]);






return(


<nav className="nh-navbar">


<div className="container nav-box">



{/* LOGO */}


<Link 
 to="/"
 className="logo-wrapper"
>

<img
 src="/service_images/logo.webp"
 className="logo"
 alt="logo"
/>

</Link>





{/* LOCATION*/}


<div className="location-box">


<MapPin size={20}/>


<span>

H37, Block H - Saket - New Delhi

</span>


</div>






{/* SEARCH */}



<div
className="search-box"
ref={dropdownRef}
>


<Search size={22}/>


<input

type="text"

placeholder="Search for AC service"

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

/>




{
suggestions.length>0 &&

<ul className="suggest-box">


{

suggestions.map((item,index)=>(


<li

key={index}

onClick={()=>handleSelect(item)}

>

{item}

</li>


))

}


</ul>

}





</div>














{/* PROFILE ICON */}


<div

className="profile-icon"

onClick={handleProfile}

>


<User/>


</div>





</div>



</nav>


);


};



export default Navbar;