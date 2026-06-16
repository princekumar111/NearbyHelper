import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../utils/axios";
import { getAddressFromCoordinates } from "../utils/geocode";
import "./ProvidersList.css";



const formatTitle = (str) =>
  str
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c)=>c.toUpperCase());






const ProviderSkeleton = ()=>(
<div className="col-lg-4 col-md-6 col-sm-12 mb-4">

<div className="provider-card card shadow-sm h-100 skeleton-wrapper">

<div className="skeleton skeleton-img"></div>


<div className="p-3">

<div className="skeleton skeleton-text skeleton-title"></div>

<div className="skeleton skeleton-text"></div>

<div className="skeleton skeleton-btn mt-3"></div>

</div>


</div>

</div>
);







const RatingStars = ({rating=0})=>(

<div className="rating">


{
[1,2,3,4,5].map((i)=>(

<span

key={i}

className={
i <= Math.round(rating)
? "star filled"
: "star"
}

>

★

</span>

))

}


<span className="rating-text">

{rating.toFixed(1)}

</span>


</div>

);









const ProvidersList = ()=>{


const {serviceName}=useParams();

const navigate=useNavigate();



const [providers,setProviders]=useState([]);

const [loading,setLoading]=useState(true);

const [error,setError]=useState("");








const loadProviders = async(lat,lng)=>{


const res = await API.post(
"/providers/nearby",
{
lat,
lng,
serviceName
}
);





const list = await Promise.all(

res.data.map(async(p)=>{


if(p.location?.coordinates?.length===2){



const [lng,lat] =
p.location.coordinates;




const address =
await getAddressFromCoordinates(
lat,
lng
);




return{

...p,

formattedAddress:address

};


}



return p;


})


);




setProviders(list);


};










useEffect(()=>{



navigator.geolocation.getCurrentPosition(





// LOCATION ALLOW


async(pos)=>{


try{


await loadProviders(

pos.coords.latitude,

pos.coords.longitude

);


}

catch(err){


setError(
"Failed to load providers."
);


}


finally{


setLoading(false);


}


},








// LOCATION DENY -> PROFILE LOCATION


async()=>{


try{


const savedUser =
JSON.parse(
localStorage.getItem("user")
);




if(savedUser?.location){



const geoRes = await fetch(

`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(savedUser.location)}&format=json`

);



const data =
await geoRes.json();






if(data.length > 0){



await loadProviders(

Number(data[0].lat),

Number(data[0].lon)

);



setError("");



}


else{


setError(
"Profile location not found."
);


}



}



else{


setError(
"Please add location in profile."
);


}




}


catch(err){



console.log(err);



setError(
"Failed to use profile location."
);


}



finally{


setLoading(false);


}




}




);



},[serviceName]);









return(

<>


<Navbar role="user"/>



<div className="container py-4">



<h4>

Providers for "{formatTitle(serviceName)}"

</h4>






{
error &&

<div className="alert alert-danger">

{error}

</div>

}








<div className="row">



{


loading ?



[...Array(6)].map((_,i)=>(


<ProviderSkeleton key={i}/>


))



:



providers.length === 0 ? (

<div className="col-12 text-center mt-5">

<h4>
😕 No helpers available nearby
</h4>

<p className="text-muted">

We couldn't find any {formatTitle(serviceName)} near your location.
Try updating your profile location.

</p>


<button
className="btn btn-secondary mt-3"
onClick={()=>navigate("/profile")}
>

Change Location

</button>


</div>


)

:

providers.map((provider)=>(



<div

className="col-lg-4 col-md-6 mb-4"

key={provider._id}

>



<div className="provider-card card shadow-sm h-100">



<img

src={
provider.image ||
"https://www.sprintdiagnostics.in/images/user.jpg"
}

className="provider-img"

alt="Provider"

/>





<div className="p-3">


<h5>

{provider.userId?.name || "Provider"}

</h5>




<RatingStars

rating={
provider.averageRating || 0
}

/>




<p>

Service: {provider.category}

</p>




<p>

Location: {

provider.formattedAddress ||
"Unknown"

}

</p>





{

provider.distance &&

<p>

Distance: {

(provider.distance/1000).toFixed(2)

} km

</p>


}






<button

className="btn btn-primary w-100"

onClick={()=>navigate(
`/book/${provider._id}`
)}

>

Book

</button>




</div>


</div>


</div>



))


}




</div>


</div>


</>

);


};




export default ProvidersList;