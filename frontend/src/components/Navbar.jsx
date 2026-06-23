import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  MapPin,
  Search,
  User
} from "lucide-react";

import API from '../utils/axios';
import './Navbar.css';





/* ---------- SEARCH PLACEHOLDER WORDS ---------- */

const words = [

"Search for Plumber",

"Search for Electrician",

"Search for Carpenter",

"Search for Mechanic",

"Search for Cleaner",

"Search for Painter"

];





const Navbar = ({ role }) => {


const navigate = useNavigate();


const [search,setSearch] = useState("");

const [suggestions,setSuggestions] = useState([]);
const [location,setLocation] = useState(
"Add Location"
);


const dropdownRef = useRef(null);





/* ---------- TYPING PLACEHOLDER ---------- */



const [placeholder,setPlaceholder] = useState("");

const [wordIndex,setWordIndex] = useState(0);

const [charIndex,setCharIndex] = useState(0);

const [deleting,setDeleting] = useState(false);

/* ---------- LOAD USER LOCATION FROM LOCAL STORAGE ---------- */

useEffect(()=>{

const savedUser = JSON.parse(
localStorage.getItem("user")
);


if(savedUser?.location){

setLocation(savedUser.location);

}


},[]);


const handleLocationClick = ()=>{


const token = localStorage.getItem("token");


if(token){


navigate("/profile");


}

else{


navigate("/login");


}


};


useEffect(()=>{


const currentWord = words[wordIndex];



const timer = setTimeout(()=>{



if(!deleting){


setPlaceholder(

currentWord.substring(
0,
charIndex + 1
)

);



setCharIndex(
charIndex + 1
);




if(charIndex === currentWord.length){


setTimeout(()=>{


setDeleting(true);


},1200);


}



}



else{


setPlaceholder(

currentWord.substring(
0,
charIndex - 1
)

);



setCharIndex(
charIndex - 1
);




if(charIndex === 0){


setDeleting(false);


setWordIndex(

(prev)=>

(prev + 1) % words.length

);


}


}




}, deleting ? 50 : 100);




return ()=>clearTimeout(timer);



},[
charIndex,
deleting,
wordIndex
]);









/* ---------- SEARCH SUGGESTION ---------- */


useEffect(()=>{


const fetchSuggestions = async()=>{


const query = search.trim().toLowerCase();



console.log(
"Typed:",
query
);



if(!query){


setSuggestions([]);

return;


}




try{


const res = await API.get(

`/providers/suggest?q=${encodeURIComponent(query)}`

);




console.log(
"API RESPONSE:",
JSON.stringify(res.data)
);




if(Array.isArray(res.data)){


setSuggestions(res.data);


}

else{


setSuggestions([]);


}




}

catch(err){


console.log(

"SEARCH ERROR:",

err.response?.data || err.message

);



setSuggestions([]);


}



};





const timer = setTimeout(()=>{


fetchSuggestions();


},400);




return ()=>clearTimeout(timer);



},[search]);










/* ---------- SELECT SEARCH ---------- */


const handleSelect=(value)=>{


navigate(

`/providers/${value.toLowerCase()}`

);



setSearch("");

setSuggestions([]);


};











/* ---------- CLOSE DROPDOWN ---------- */


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










/* ---------- PROFILE ---------- */


const handleProfile = ()=>{


const token = localStorage.getItem("token");



if(token){


navigate("/profile");


}

else{


navigate("/login");


}



};










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










{/* LOCATION */}


<div 
className="location-box"
onClick={handleLocationClick}
>


<MapPin size={20}/>


<span>

{location}

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

placeholder={placeholder}

value={search}

onChange={(e)=>

setSearch(e.target.value)

}

/>






{


suggestions.length > 0 &&


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











{/* PROFILE */}



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