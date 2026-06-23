import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
/* ---------- API IMPORT ---------- */

import API from "../utils/axios";

/* ---------- LEAFLET IMPORT ---------- */

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap
} from "react-leaflet";


import "leaflet/dist/leaflet.css";


/* ---------- MARKER ICON FIX ---------- */

import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";

import markerShadow from "leaflet/dist/images/marker-shadow.png";


/* ---------- CSS ---------- */

import "./UserProfile.css";


/* ---------- ICON ---------- */

import {
  CalendarCheck,
  Star
} from "lucide-react";





/* ---------- FIX DEFAULT MARKER ---------- */

const DefaultIcon = L.icon({

iconUrl:markerIcon,

shadowUrl:markerShadow,

iconSize:[25,41],

iconAnchor:[12,41]

});


L.Marker.prototype.options.icon = DefaultIcon;








/* ---------- MAP CLICK LOCATION ---------- */

function LocationMarker({setPosition,setUser}){


useMapEvents({


click:async(e)=>{


const {lat,lng}=e.latlng;



setPosition({

lat,

lng

});



try{


const response = await API.get(

`/location/reverse?lat=${lat}&lng=${lng}`

);


const data = response.data;

setUser(prev=>({

...prev,

location:data.address

}));
}

catch(err){

console.log(err);

}


}


});



return null;


}









/* ---------- MOVE MAP ---------- */

function ChangeMapView({position}){


const map = useMap();


useEffect(()=>{


map.setView(position,16);


},[position,map]);



return null;


}











function Profile(){



const navigate = useNavigate();




/* ---------- STATES ---------- */

const [edit,setEdit]=useState(false);


const [showMap,setShowMap]=useState(false);



const [position,setPosition]=useState({


lat:28.4744,

lng:77.5040


});




const [user,setUser]=useState({


name:"",

phone:"",

email:"",

location:"",

image:""


});









/* ---------- LOAD USER ---------- */

useEffect(()=>{


const saved = localStorage.getItem("user");


if(saved){


setUser(JSON.parse(saved));


}


},[]);









/* ---------- GET CURRENT LOCATION ---------- */

const getCurrentLocation = () => {


navigator.geolocation.getCurrentPosition(


async(pos)=>{


const lat = pos.coords.latitude;

const lng = pos.coords.longitude;




/* ---------- OPEN MAP ---------- */

setShowMap(true);




/* ---------- MOVE MARKER ---------- */

setPosition({

lat,

lng

});




try{


/* ---------- LAT LNG TO REAL ADDRESS ---------- */

const response = await API.get(

`/location/reverse?lat=${lat}&lng=${lng}`

);


const data = response.data;

console.log("CURRENT ADDRESS:",data);




if(data && data.address){



setUser(prev=>({


...prev,


location:data.address


}));



}

else{


setUser(prev=>({


...prev,


location:"Address not found"


}));


}



}


catch(error){


console.log("Address error:",error);



setUser(prev=>({


...prev,


location:"Unable to fetch address"


}));


}



},




(error)=>{


console.log(error);


alert("Please allow location permission");


},



{

enableHighAccuracy:true,

timeout:15000,

maximumAge:0

}


);


};




/* ---------- PROFILE IMAGE UPLOAD ---------- */

const handleImageUpload=(e)=>{


const file = e.target.files[0];


if(file){


const reader = new FileReader();


reader.onloadend=()=>{


setUser(prev=>({


...prev,


image:reader.result


}));


};


reader.readAsDataURL(file);


}


};



/* ---------- INPUT CHANGE ---------- */

const handleChange=async(e)=>{


const {name,value}=e.target;



setUser(prev=>({

...prev,

[name]:value

}));




/* ---------- ADDRESS SEARCH TO MAP ---------- */

if(name==="location" && value.length > 5){


try{


const response = await fetch(

`https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&q=${encodeURIComponent(value)}`

);


const data = await response.json();



if(data.length > 0){


setPosition({

lat:Number(data[0].lat),

lng:Number(data[0].lon)

});


}


}

catch(error){

console.log(error);

}


}



};


/* ---------- SAVE ---------- */

const handleSave=()=>{


localStorage.setItem(

"user",

JSON.stringify(user)

);



setEdit(false);


alert("Profile updated successfully");


};










/* ---------- LOGOUT ---------- */

const handleLogout=()=>{


localStorage.clear();


navigate("/login");


};










return(

<div className="profile-page">





{/* ---------- PROFILE CARD ---------- */}

<div className="profile-card">

{/* ---------- PROFILE IMAGE ---------- */}

<div className="avatar">


{

user.image ?

<img

src={user.image}

alt="profile"

className="profile-img"

/>

:

<span>👤</span>


}


</div>


<div>


<h2>{user.name}</h2>


<p>{user.phone}</p>


<p>

📍 {user.location || "Location not added"}

</p>



<button

className="edit-btn"

onClick={()=>setEdit(true)}

>

✏ Edit Profile

</button>


</div>


</div>









{/* ---------- INFO ---------- */}

<div className="section">


<h3>Personal Information</h3>


<p>

📧 {user.email}

</p>


</div>









{/* ---------- SERVICES ---------- */}

<div className="section">


<h3>My Services</h3>



<p

className="profile-option"

onClick={()=>navigate("/user/bookings")}

>

<CalendarCheck size={20}/>

 My Bookings

</p>




<p className="profile-option">


<Star size={20}/>

 Saved Helpers


</p>




<p

className="profile-option"

onClick={()=>navigate("/user/reviews")}

>

<Star size={20}/>

 My Reviews

</p>


</div>










{/* ---------- SETTINGS ---------- */}

<div className="section">


<h3>Settings</h3>


<p>🔔 Notifications</p>


<p>🌐 Language</p>



<button

className="logout-btn"

onClick={handleLogout}

>

🚪 Logout

</button>


</div>










{/* ---------- EDIT MODAL ---------- */}

{

edit &&


<div className="modal">


<div className="edit-box">



<h2>Edit Profile</h2>



{/* ---------- PROFILE PHOTO UPLOAD ---------- */}

<input

type="file"

accept="image/*"

onChange={handleImageUpload}

/>


<input

name="name"

value={user.name}

onChange={handleChange}

placeholder="Name"

/>




<input

name="phone"

value={user.phone}

onChange={handleChange}

placeholder="Phone"

/>




<input

name="email"

value={user.email}

onChange={handleChange}

placeholder="Email"

/>







{/* ---------- LOCATION INPUT ---------- */}

<input

name="location"

value={user.location}

onClick={()=>setShowMap(true)}

onChange={handleChange}

placeholder="Select Location"

/>






{/* ---------- CURRENT LOCATION ---------- */}

<button

type="button"

onClick={getCurrentLocation}

>

📍 Use my current location

</button>








{

showMap &&


<MapContainer

center={position}

zoom={16}

style={{

height:"300px",

width:"100%",

marginTop:"15px"

}}

>


<TileLayer

url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

/>





<ChangeMapView

position={position}

/>






{/* ---------- DRAGGABLE MARKER ---------- */}

<Marker

position={position}

draggable={true}

eventHandlers={{


dragend:async(e)=>{


const pos=e.target.getLatLng();



setPosition({


lat:pos.lat,

lng:pos.lng


});


const response = await API.get(

`/location/reverse?lat=${pos.lat}&lng=${pos.lng}`

);





const data = response.data;

setUser(prev=>({

...prev,

location:data.address

}));

}


}}

/>





<LocationMarker

setPosition={setPosition}

setUser={setUser}

/>



</MapContainer>

}







<button

className="save"

onClick={handleSave}

>

Save Changes

</button>





<button

className="cancel"

onClick={()=>setEdit(false)}

>

Cancel

</button>



</div>


</div>


}



</div>

);


}


export default Profile;