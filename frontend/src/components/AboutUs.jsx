
// import React, { useState, useEffect } from 'react';
// import "./AboutUs.css"; 

// const AboutUs = () => {
//   const [stats, setStats] = useState({
//     customers: 0,
//     professionals: 0,
//     categories: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [animatedStats, setAnimatedStats] = useState({
//     customers: 0,
//     professionals: 0,
//     categories: 0,
//   });

//   // Fetch real-time stats from API
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await fetch('/api/stats');
//         const data = await response.json();

//         setStats({
//           customers: data.totalCustomers || 10000,
//           professionals: data.totalProfessionals || 500,
//           categories: data.totalCategories || 50,
//         });
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching stats:', error);
//         setStats({
//           customers: 10000,
//           professionals: 500,
//           categories: 50,
//         });
//         setLoading(false);
//       }
//     };

//     fetchStats();
//     const interval = setInterval(fetchStats, 5 * 60 * 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // Animate numbers
//   useEffect(() => {
//     if (!loading) {
//       const duration = 2000;
//       const steps = 60;
//       const increment = {
//         customers: stats.customers / steps,
//         professionals: stats.professionals / steps,
//         categories: stats.categories / steps,
//       };

//       let currentStep = 0;
//       const timer = setInterval(() => {
//         currentStep++;
//         if (currentStep <= steps) {
//           setAnimatedStats({
//             customers: Math.floor(increment.customers * currentStep),
//             professionals: Math.floor(increment.professionals * currentStep),
//             categories: Math.floor(increment.categories * currentStep),
//           });
//         } else {
//           setAnimatedStats(stats);
//           clearInterval(timer);
//         }
//       }, duration / steps);

//       return () => clearInterval(timer);
//     }
//   }, [loading, stats]);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');

//         body {
//           font-family: 'Poppins', sans-serif;
//           background: white;
//         }

//         .about-hero {
//           background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
//           position: relative;
//           overflow: hidden;
//           padding: 120px 0 80px;
//         }

//         .about-hero::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23e65c00" fill-opacity="0.1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>') no-repeat bottom;
//           background-size: cover;
//         }

//         .about-hero::after {
//           content: '';
//           position: absolute;
//           top: 0;
//           right: 0;
//           width: 300px;
//           height: 300px;
//           background: #e65c00;
//           opacity: 0.1;
//           border-radius: 50%;
//           filter: blur(80px);
//         }

//         .hero-title {
//           font-size: 4rem;
//           font-weight: 800;
//           color: white;
//           margin-bottom: 1.5rem;
//           text-shadow: 2px 4px 10px rgba(230, 92, 0, 0.3);
//           animation: fadeInUp 0.8s ease;
//           position: relative;
//         }

//         .hero-title::after {
//           content: '';
//           position: absolute;
//           bottom: -15px;
//           left: 50%;
//           transform: translateX(-50%);
//           width: 100px;
//           height: 4px;
//           background: #e65c00;
//           border-radius: 2px;
//         }

//         .hero-subtitle {
//           font-size: 1.4rem;
//           color: hsl(0, 0%, 90%);
//           font-weight: 300;
//           animation: fadeInUp 1s ease;
//         }

//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .story-section {
//           background: hsl(0, 0%, 90%);
//           padding: 80px 0;
//           position: relative;
//         }

//         .story-card {
//           background: white;
//           border-radius: 20px;
//           padding: 50px;
//           box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
//           border-left: 5px solid #e65c00;
//           position: relative;
//           overflow: hidden;
//         }

//         .story-card::before {
//           content: '';
//           position: absolute;
//           top: -50%;
//           right: -50%;
//           width: 200px;
//           height: 200px;
//           background: #e65c00;
//           opacity: 0.05;
//           border-radius: 50%;
//         }

//         .section-title {
//           font-size: 3rem;
//           font-weight: 700;
//           color: #000000;
//           margin-bottom: 2rem;
//           position: relative;
//           display: inline-block;
//         }

//         .section-title::after {
//           content: '';
//           position: absolute;
//           bottom: -10px;
//           left: 0;
//           width: 80px;
//           height: 4px;
//           background: #e65c00;
//           border-radius: 2px;
//         }

//         .mission-vision-card {
//           background: white;
//           border-radius: 25px;
//           padding: 45px;
//           height: 100%;
//           transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//           border: 2px solid hsl(0, 0%, 90%);
//           box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
//           position: relative;
//           overflow: hidden;
//         }

//         .mission-vision-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(90deg, transparent, rgba(230, 92, 0, 0.1), transparent);
//           transition: all 0.6s;
//         }

//         .mission-vision-card:hover::before {
//           left: 100%;
//         }

//         .mission-vision-card:hover {
//           transform: translateY(-15px);
//           border-color: #e65c00;
//           box-shadow: 0 20px 50px rgba(230, 92, 0, 0.2);
//         }

//         .icon-box {
//           width: 90px;
//           height: 90px;
//           border-radius: 20px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 3rem;
//           margin-bottom: 25px;
//           position: relative;
//           z-index: 1;
//         }

//         .icon-box.orange {
//           background: linear-gradient(135deg, #e65c00 0%, #ff7f2a 100%);
//           box-shadow: 0 10px 25px rgba(230, 92, 0, 0.3);
//         }

//         .icon-box.dark {
//           background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
//           box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
//         }

//         .card-title {
//           font-size: 2rem;
//           font-weight: 700;
//           color: #000000;
//           margin-bottom: 20px;
//         }

//         .card-text {
//           color: #4a4a4a;
//           line-height: 1.8;
//           font-size: 1.05rem;
//         }

//         .values-section {
//           padding: 100px 0;
//           background: white;
//         }

//         .value-item {
//           text-align: center;
//           padding: 40px 30px;
//           border-radius: 20px;
//           transition: all 0.3s ease;
//           background: white;
//           border: 2px solid hsl(0, 0%, 90%);
//           height: 100%;
//           position: relative;
//           overflow: hidden;
//         }

//         .value-item::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           height: 4px;
//           background: #e65c00;
//           transform: scaleX(0);
//           transition: transform 0.3s ease;
//         }

//         .value-item:hover::before {
//           transform: scaleX(1);
//         }

//         .value-item:hover {
//           transform: translateY(-10px) scale(1.02);
//           box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
//           border-color: #e65c00;
//         }

//         .value-item.reliability:hover {
//           background: linear-gradient(135deg, hsl(0, 0%, 90%) 0%, white 100%);
//         }

//         .value-item.transparency:hover {
//           background: linear-gradient(135deg, rgba(230, 92, 0, 0.05) 0%, white 100%);
//         }

//         .value-item.innovation:hover {
//           background: linear-gradient(135deg, rgba(0, 0, 0, 0.03) 0%, white 100%);
//         }

//         .value-emoji {
//           font-size: 4rem;
//           margin-bottom: 20px;
//           display: inline-block;
//           animation: bounce 2s infinite;
//         }

//         @keyframes bounce {
//           0%, 100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }

//         .value-title {
//           font-size: 1.5rem;
//           font-weight: 700;
//           color: #000000;
//           margin-bottom: 15px;
//         }

//         .stats-section {
//           background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
//           padding: 80px 0;
//           position: relative;
//           overflow: hidden;
//         }

//         .stats-section::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: radial-gradient(circle at 50% 50%, rgba(230, 92, 0, 0.1) 0%, transparent 70%);
//         }

//         .stats-section::after {
//           content: '';
//           position: absolute;
//           bottom: -50%;
//           left: -50%;
//           width: 100%;
//           height: 100%;
//           background: radial-gradient(circle, rgba(230, 92, 0, 0.1) 0%, transparent 70%);
//           animation: rotate 20s linear infinite;
//         }

//         @keyframes rotate {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         .stat-card {
//           background: rgba(255, 255, 255, 0.05);
//           backdrop-filter: blur(10px);
//           border-radius: 20px;
//           padding: 45px 30px;
//           text-align: center;
//           border: 2px solid rgba(230, 92, 0, 0.3);
//           transition: all 0.3s ease;
//           position: relative;
//           z-index: 1;
//         }

//         .stat-card:hover {
//           background: rgba(230, 92, 0, 0.1);
//           transform: translateY(-10px);
//           box-shadow: 0 20px 40px rgba(230, 92, 0, 0.3);
//           border-color: #e65c00;
//         }

//         .stat-number {
//           font-size: 4rem;
//           font-weight: 800;
//           color: white;
//           margin-bottom: 10px;
//           text-shadow: 2px 2px 8px rgba(230, 92, 0, 0.5);
//         }

//         .stat-label {
//           font-size: 1.2rem;
//           color: hsl(0, 0%, 90%);
//           font-weight: 500;
//         }

//         .loading-pulse {
//           animation: pulse 1.5s ease-in-out infinite;
//         }

//         @keyframes pulse {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.5;
//           }
//         }

//         .why-choose-section {
//           padding: 100px 0;
//           background: hsl(0, 0%, 90%);
//           position: relative;
//         }

//         .why-choose-section::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           right: 0;
//           width: 400px;
//           height: 400px;
//           background: #e65c00;
//           opacity: 0.03;
//           border-radius: 50%;
//           filter: blur(100px);
//         }

//         .feature-badge {
//           display: inline-block;
//           padding: 15px 30px;
//           margin: 8px;
//           background: white;
//           border-radius: 50px;
//           font-weight: 600;
//           color: #000000;
//           box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
//           transition: all 0.3s ease;
//           border: 2px solid transparent;
//         }

//         .feature-badge:hover {
//           background: #e65c00;
//           color: white;
//           transform: translateY(-5px) scale(1.05);
//           box-shadow: 0 10px 30px rgba(230, 92, 0, 0.4);
//           border-color: #e65c00;
//         }

//         @media (max-width: 768px) {
//           .hero-title {
//             font-size: 2.5rem;
//           }
//           .hero-subtitle {
//             font-size: 1.1rem;
//           }
//           .section-title {
//             font-size: 2rem;
//           }
//           .stat-number {
//             font-size: 3rem;
//           }
//           .about-hero {
//             padding: 80px 0 60px;
//           }
//         }
//       `}</style>

//       {/* Hero Section */}
//       <div className="about-hero">
//         <div className="container position-relative">
//           <div className="row justify-content-center">
//             <div className="col-lg-10 text-center">
//               <h1 className="hero-title">About Us</h1>
//               <p className="hero-subtitle">
//                 Connecting communities with trusted local service professionals since our inception
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Story Section */}
//       <div className="story-section">
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-lg-10">
//               <div className="story-card">
//                 <h2 className="section-title mb-4">Our Story</h2>
//                 <p className="lead" style={{ fontSize: '1.15rem', lineHeight: '1.9', color: '#4a4a4a' }}>
//                   We started with a simple observation: finding reliable local service providers shouldn't be a challenge. 
//                   Whether you need a plumber at midnight or an electrician on the weekend, quality help should be just a tap away. 
//                   Today, we're proud to be the bridge between skilled professionals and customers who need them, creating opportunities 
//                   and building trust in communities across the region.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mission & Vision */}
//       <div className="container my-5 py-5">
//         <div className="row g-4">
//           <div className="col-md-6">
//             <div className="mission-vision-card">
//               <div className="icon-box orange">
//                 <span>🎯</span>
//               </div>
//               <h3 className="card-title">Our Mission</h3>
//               <p className="card-text">
//                 Our mission is to simplify everyday life by connecting users with reliable service providers—plumbers, 
//                 electricians, carpenters, and more. We aim to bridge the gap between workers and customers by offering 
//                 a transparent, affordable, and efficient platform that benefits everyone in the community.
//               </p>
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div className="mission-vision-card">
//               <div className="icon-box dark">
//                 <span>👁️</span>
//               </div>
//               <h3 className="card-title">Our Vision</h3>
//               <p className="card-text">
//                 We envision becoming the most trusted platform for local services, empowering skilled workers with 
//                 consistent opportunities while giving customers instant access to verified, affordable, and high-quality 
//                 help whenever and wherever they need it.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Core Values */}
//       <div className="values-section">
//         <div className="container">
//           <div className="text-center mb-5">
//             <h2 className="section-title">Our Core Values</h2>
//           </div>
//           <div className="row g-4">
//             <div className="col-md-4">
//               <div className="value-item reliability">
//                 <span className="value-emoji">✅</span>
//                 <h5 className="value-title">Reliability</h5>
//                 <p className="card-text">
//                   Every service provider on our platform is thoroughly verified and background-checked to ensure 
//                   trustworthiness and quality service delivery.
//                 </p>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="value-item transparency">
//                 <span className="value-emoji">🤝</span>
//                 <h5 className="value-title">Transparency</h5>
//                 <p className="card-text">
//                   Clear, upfront pricing with no hidden fees. What you see is what you pay—honest services, 
//                   honest prices, every time.
//                 </p>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="value-item innovation">
//                 <span className="value-emoji">🚀</span>
//                 <h5 className="value-title">Innovation</h5>
//                 <p className="card-text">
//                   We leverage cutting-edge technology to make service booking faster, smarter, and more 
//                   convenient than ever before.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="stats-section">
//         <div className="container">
//           <div className="row g-4">
//             <div className="col-md-4">
//               <div className="stat-card">
//                 <div className={`stat-number ${loading ? 'loading-pulse' : ''}`}>
//                   {loading ? '...' : `${animatedStats.customers.toLocaleString()}+`}
//                 </div>
//                 <div className="stat-label">Happy Customers</div>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="stat-card">
//                 <div className={`stat-number ${loading ? 'loading-pulse' : ''}`}>
//                   {loading ? '...' : `${animatedStats.professionals.toLocaleString()}+`}
//                 </div>
//                 <div className="stat-label">Verified Professionals</div>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="stat-card">
//                 <div className={`stat-number ${loading ? 'loading-pulse' : ''}`}>
//                   {loading ? '...' : `${animatedStats.categories}+`}
//                 </div>
//                 <div className="stat-label">Service Categories</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Why Choose Us */}
//       <div className="why-choose-section">
//         <div className="container position-relative">
//           <div className="row justify-content-center">
//             <div className="col-lg-10 text-center">
//               <h2 className="section-title mb-4">Why Choose Us?</h2>
//               <p className="lead mb-5" style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#4a4a4a' }}>
//                 We're not just a service platform—we're a movement to create opportunities for skilled workers 
//                 while giving customers the peace of mind that comes with reliable, professional help. Trusted by 
//                 thousands of users and service providers, we are transforming the way communities access local services.
//               </p>
//               <div>
//                 <span className="feature-badge">24/7 Support</span>
//                 <span className="feature-badge">Instant Booking</span>
//                 <span className="feature-badge">Verified Providers</span>
//                 <span className="feature-badge">Secure Payments</span>
//                 <span className="feature-badge">Quality Assurance</span>
//                 <span className="feature-badge">Best Prices</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AboutUs;
















import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AboutUs.css"; // <-- make sure path is correct

const AboutUs = () => {
  const [stats, setStats] = useState({
    customers: 0,
    professionals: 0,
    categories: 0,
  });
  const [loading, setLoading] = useState(true);
  const [animatedStats, setAnimatedStats] = useState({
    customers: 0,
    professionals: 0,
    categories: 0,
  });

  // Fetch real-time stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats");
        const data = await response.json();

        setStats({
          customers: data.totalCustomers || 10000,
          professionals: data.totalProfessionals || 500,
          categories: data.totalCategories || 50,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats({
          customers: 10000,
          professionals: 500,
          categories: 50,
        });
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Animate numbers
  useEffect(() => {
    if (!loading) {
      const duration = 2000;
      const steps = 60;
      const increment = {
        customers: stats.customers / steps,
        professionals: stats.professionals / steps,
        categories: stats.categories / steps,
      };

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setAnimatedStats({
            customers: Math.floor(increment.customers * currentStep),
            professionals: Math.floor(increment.professionals * currentStep),
            categories: Math.floor(increment.categories * currentStep),
          });
        } else {
          setAnimatedStats(stats);
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [loading, stats]);

  return (
    <>
      {/* Hero Section */}
      <div className="about-hero">
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h1 className="hero-title">About Us</h1>
              <p className="hero-subtitle">
                Connecting communities with trusted local service professionals since our inception
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="story-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="story-card">
                <h2 className="section-title mb-4">Our Story</h2>
                <p className="lead story-text" style={{ fontSize: '1.15rem', lineHeight: '1.9', color: '#4a4a4a' }}>
                  We started with a simple observation: finding reliable local service providers shouldn't be a challenge. 
                  Whether you need a plumber at midnight or an electrician on the weekend, quality help should be just a tap away. 
                  Today, we're proud to be the bridge between skilled professionals and customers who need them, creating opportunities 
                  and building trust in communities across the region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container my-5 py-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="mission-vision-card">
              <div className="icon-box orange">
                <span>🎯</span>
              </div>
              <h3 className="card-title">Our Mission</h3>
              <p className="card-text">
                Our mission is to simplify everyday life by connecting users with reliable service providers—plumbers, 
                electricians, carpenters, and more. We aim to bridge the gap between workers and customers by offering 
                a transparent, affordable, and efficient platform that benefits everyone in the community.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mission-vision-card">
              <div className="icon-box dark">
                <span>👁️</span>
              </div>
              <h3 className="card-title">Our Vision</h3>
              <p className="card-text">
                We envision becoming the most trusted platform for local services, empowering skilled workers with 
                consistent opportunities while giving customers instant access to verified, affordable, and high-quality 
                help whenever and wherever they need it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="values-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="value-item reliability">
                <span className="value-emoji">✅</span>
                <h5 className="value-title">Reliability</h5>
                <p className="card-text">
                  Every service provider on our platform is thoroughly verified and background-checked to ensure 
                  trustworthiness and quality service delivery.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="value-item transparency">
                <span className="value-emoji">🤝</span>
                <h5 className="value-title">Transparency</h5>
                <p className="card-text">
                  Clear, upfront pricing with no hidden fees. What you see is what you pay—honest services, 
                  honest prices, every time.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="value-item innovation">
                <span className="value-emoji">🚀</span>
                <h5 className="value-title">Innovation</h5>
                <p className="card-text">
                  We leverage cutting-edge technology to make service booking faster, smarter, and more 
                  convenient than ever before.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="stat-card">
                <div className={`stat-number ${loading ? 'loading-pulse' : ''}`}>
                  {loading ? '...' : `${animatedStats.customers.toLocaleString()}+`}
                </div>
                <div className="stat-label">Happy Customers</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card">
                <div className={`stat-number ${loading ? 'loading-pulse' : ''}`}>
                  {loading ? '...' : `${animatedStats.professionals.toLocaleString()}+`}
                </div>
                <div className="stat-label">Verified Professionals</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card">
                <div className={`stat-number ${loading ? 'loading-pulse' : ''}`}>
                  {loading ? '...' : `${animatedStats.categories}+`}
                </div>
                <div className="stat-label">Service Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="why-choose-section">
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h2 className="section-title mb-4">Why Choose Us?</h2>
              <p className="lead why-text" style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#4a4a4a' }}>
                We're not just a service platform—we're a movement to create opportunities for skilled workers 
                while giving customers the peace of mind that comes with reliable, professional help. Trusted by 
                thousands of users and service providers, we are transforming the way communities access local services.
              </p>
              <div>
                <span className="feature-badge">24/7 Support</span>
                <span className="feature-badge">Instant Booking</span>
                <span className="feature-badge">Verified Providers</span>
                <span className="feature-badge">Secure Payments</span>
                <span className="feature-badge">Quality Assurance</span>
                <span className="feature-badge">Best Prices</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
