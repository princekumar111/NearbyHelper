import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import { Star } from "lucide-react";
import "./MyReviews.css";


const MyReviews = () => {


const [reviews,setReviews] = useState([]);

const [loading,setLoading] = useState(true);



useEffect(()=>{


const fetchReviews = async()=>{


try{


const res = await API.get(
"/reviews/my-reviews"
);


// console.log(
//  "FIRST PROVIDER:",
//  res.data[0].provider
// );

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


return (

<h3 className="text-center mt-5">

Loading reviews...

</h3>

);

}








return(

<div className="container mt-5">


<h2>

My Reviews

</h2>




{

reviews.length === 0 ? (


<div className="review-card mt-4">


<h5>No reviews yet</h5>


<p>

Your service reviews will appear here.

</p>


</div>


)


:


(

reviews.map((review)=>(


<div

className="review-card mt-3"

key={review._id}

>


<h5>

👤 {

review.provider?.userId?.name
||
"Service Provider"

}

</h5>



<p>

🛠 Service: {

review.provider?.category
||
"Service"

}

</p>



<p>

📞 Contact: {

review.provider?.contact
||
"Not available"

}

</p>





<div className="review-stars">


{

[1,2,3,4,5].map((star)=>(


<Star

key={star}

size={20}

fill={

star <= review.rating

? "currentColor"

: "none"

}

/>


))

}



<span>

{review.rating}/5

</span>



</div>





<p className="review-comment">

"{review.comment}"

</p>



</div>

))


)


}




</div>

);


};



export default MyReviews;