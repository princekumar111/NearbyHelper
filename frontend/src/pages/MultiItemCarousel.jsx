// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import "./MultiItemCarousel.css";


// const MultiItemCarousel = ({ items = [], auto = true, interval = 3000 }) => {
//   const [visible, setVisible] = useState(3); // slides per view
//   const [index, setIndex] = useState(0);
//   const timerRef = useRef(null);

//   // Decide how many items to show per viewport size
//   const computeVisible = useCallback(() => {
//     const w = window.innerWidth;
//     if (w >= 1200) return 3;
//     if (w >= 768) return 2;
//     return 1;
//   }, []);

//   useEffect(() => {
//     const update = () => setVisible(computeVisible());
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, [computeVisible]);

//   const maxIndex = Math.max(0, items.length - visible);

//   const next = useCallback(() => {
//     setIndex((i) => (i >= maxIndex ? 0 : i + 1));
//   }, [maxIndex]);

//   const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));

//   // Auto slide
//   useEffect(() => {
//     if (!auto || items.length === 0) return;
//     timerRef.current = setInterval(next, interval);
//     return () => clearInterval(timerRef.current);
//   }, [auto, interval, next, items.length, visible]);

//   const pause = () => timerRef.current && clearInterval(timerRef.current);
//   const resume = () => {
//     if (auto) timerRef.current = setInterval(next, interval);
//   };

//   return (
//     <div className="nh-carousel my-5" onMouseEnter={pause} onMouseLeave={resume}>
//       <button className="nh-arrow left" aria-label="Previous" onClick={prev}>
//         <FaChevronLeft />
//       </button>

//       <div className="nh-viewport">
//         <div
//           className="nh-track"
//           style={{ transform: `translateX(-${(index * 100) / visible}%)` }}
//         >
//           {items.map((item, i) => (
//             <div className="nh-slide" style={{ width: `${100 / visible}%` }} key={i}>
//               <div className="nh-card">
//                 <img
//                   src={item.image || item.img}
//                   alt={item.title || `slide-${i}`}
//                   loading="lazy"
//                 />
//                 {(item.title || item.desc) && (
//                   <div className="nh-caption">
//                     {item.title && <h5>{item.title}</h5>}
//                     {item.desc && <p>{item.desc}</p>}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <button className="nh-arrow right" aria-label="Next" onClick={next}>
//         <FaChevronRight />
//       </button>
//     </div>
//   );
// };

// export default MultiItemCarousel;







import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./MultiItemCarousel.css";

const MultiItemCarousel = ({ items = [], auto = true, interval = 2000 }) => {
  const [visible, setVisible] = useState(3); // slides per view
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  // Decide how many items to show per viewport size
  const computeVisible = useCallback(() => {
    const w = window.innerWidth;
    if (w >= 1200) return 3;
    if (w >= 768) return 2;
    return 1;
  }, []);

  useEffect(() => {
    const update = () => setVisible(computeVisible());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [computeVisible]);

  const maxIndex = Math.max(0, items.length - visible);

  const next = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));

  // Auto slide
  useEffect(() => {
    if (!auto || items.length === 0) return;
    timerRef.current = setInterval(next, interval);
    return () => clearInterval(timerRef.current);
  }, [auto, interval, next, items.length, visible]);

  const pause = () => timerRef.current && clearInterval(timerRef.current);
  const resume = () => {
    if (auto) timerRef.current = setInterval(next, interval);
  };

  // Calculate number of "dot groups"
  const totalDots = maxIndex + 1;

  return (
    <div className="nh-carousel my-5" onMouseEnter={pause} onMouseLeave={resume}>
      <button className="nh-arrow left" aria-label="Previous" onClick={prev}>
        <FaChevronLeft />
      </button>

      <div className="nh-viewport">
        <div
          className="nh-track"
          style={{ transform: `translateX(-${(index * 100) / visible}%)` }}
        >
          {items.map((item, i) => (
            <div className="nh-slide" style={{ width: `${100 / visible}%` }} key={i}>
              <div className="nh-card">
                <img
                  src={item.image || item.img}
                  alt={item.title || `slide-${i}`}
                  loading="lazy"
                />
                {(item.title || item.desc) && (
                  <div className="nh-caption">
                    {item.title && <h5>{item.title}</h5>}
                    {item.desc && <p>{item.desc}</p>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="nh-arrow right" aria-label="Next" onClick={next}>
        <FaChevronRight />
      </button>

      {/* Dots Navigation */}
      <div className="nh-dots">
        {Array.from({ length: totalDots }).map((_, i) => (
          <span
            key={i}
            className={`nh-dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default MultiItemCarousel;

