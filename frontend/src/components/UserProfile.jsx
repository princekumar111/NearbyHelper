import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import {
  CalendarCheck,
  Star,
  Bell,
  Globe,
  LogOut
} from "lucide-react";
function Profile() {
    const navigate = useNavigate();


    const handleLogout = () => {

     localStorage.removeItem("token");
     localStorage.removeItem("user");

     navigate("/login");

   };

  const [edit, setEdit] = useState(false);

  const [user,setUser] = useState({
    name:"",
    phone:"",
    email:"",
    location:""
});

useEffect(()=>{

 const savedUser = localStorage.getItem("user");

 if(savedUser){

   setUser(JSON.parse(savedUser));

 }

},[]);

  const handleChange = (e)=>{

 const {name,value} = e.target;

 setUser((prev)=>({

   ...prev,

   [name]:value

 }));

};

const handleSave = () => {


 const updatedUser = {

   ...user

 };


 // profile update
 setUser(updatedUser);



 // save in localStorage
 localStorage.setItem(
   "user",
   JSON.stringify(updatedUser)
 );



 // close edit popup
 setEdit(false);



 alert(
   "Profile updated successfully"
 );


};

  return (

    <div className="profile-page">


      {/* USER CARD */}

      <div className="profile-card">

        <div className="avatar">
          👤
        </div>

        <div>

          <h2>
            {user.name}
          </h2>

          <p>
            {user.phone}
          </p>

          <p>
            📍 {user.location || "Location not added"}
          </p>


          <button
 className="edit-btn"
 onClick={()=>{
   console.log("edit clicked");
   setEdit(true);
 }}
>
 ✏ Edit Profile
</button>


        </div>

      </div>



      {/* INFO */}


      <div className="section">

        <h3>
          Personal Information
        </h3>


        <p>
          📧 {user.email}
        </p>




      </div>



      <div className="section">

        <h3>
          My Services
        </h3>

         <p
 className="profile-option"
 onClick={()=>navigate("/user/bookings")}
>
 <CalendarCheck size={20}/> My Bookings
</p>


<p className="profile-option">
 <Star size={20}/> Saved Helpers
</p>


<p
 className="profile-option"
 onClick={()=>navigate("/user/reviews")}
>
 <Star size={20}/> My Reviews
</p>

      </div>




      <div className="section">

        <h3>
          Settings
        </h3>


        <p>🔔 Notifications</p>

        <p>🌐 Language</p>

        <button
 onClick={handleLogout}
 className="logout-btn"
>

 🚪 Logout

</button>


      </div>




      {/* EDIT MODAL */}


      {
        edit && (

        <div className="modal">


          <div className="edit-box">


            <h2>
              Edit Profile
            </h2>



            <input
             name="name"
             value={user.name}
             onChange={handleChange}
             placeholder="Full Name"
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


            <input
             name="location"
             value={user.location}
             onChange={handleChange}
             placeholder="Location"
            />



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

        )
      }



    </div>
  );
}


export default Profile;