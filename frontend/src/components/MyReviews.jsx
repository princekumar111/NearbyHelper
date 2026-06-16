import React, { useEffect, useState } from "react";
import API from "../utils/axios";


const MyReviews = () => {


const [reviews,setReviews] = useState([]);

const [loading,setLoading] = useState(true);



useEffect(()=>{


const fetchReviews = async()=>{


try{


const res = await API.get(
"/reviews/my-reviews"
);


setReviews(res.data);



}

catch(err){


console.log(
"Review error:",
err
);


}

finally{


setLoading(false);


}


};



fetchReviews();



},[]);







if(loading){

return <h3 className="text-center mt-5">
Loading reviews...
</h3>

}






return(

<div className="container mt-5">


<h2>

⭐ My Reviews

</h2>




{

reviews.length===0 ?


<div className="card p-3 mt-4">

<h5>No reviews yet</h5>

<p>Your service reviews will appear here.</p>

</div>



:


reviews.map((review)=>(


<div

className="card p-3 mt-3 shadow-sm"

key={review._id}

>


<h5>

{review.providerName || "Service Provider"}

</h5>



<p>

⭐ {review.rating}/5

</p>



<p>

"{review.comment}"

</p>



</div>


))


}



</div>


);


};


export default MyReviews;