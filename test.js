// function sq(n){
//     console.log("computing");
//     return n*n;  
// }
// const value=sq();
// sq(5);
// sq(5);


// use of memomization
// function sq(){
//     const cache={};
//     return function(n){
//         if(n in cache){
//             console.log("fetching from cache");
//             return cache[n];
//         }
//          else {
//             console.log("computing");
//              cache[n]=n*n;
//              return cache[n];
//          }
//     };
// }
// const val=sq();
// val(5);
// val(5);

//shallow copy creates same reference for nested objects
// const obj1={
//     name:"abc",
//     address:{city:"delhi"}
// }

// const shallocopy={...obj1};
// obj1.address.city="mumbai";
// console.log("shallow copy:",shallocopy);

//deep copy create different reference for nested objects;
// const obj1={
//     name:"abc",
//     address:{city:"delhi"}
// }
// // const deepcopy=JSON.parse(JSON.stringify(obj1));
// const deepcopy=structuredClone(obj1);
// obj1.address.city="mumbai";
// console.log("deep copy:",deepcopy);


// var a = 10;
// function test() {
//   var b = 20;
//   console.log(a, b);
// }
// test();

// function outer(){
//     cnt=0;
//     return function inner(){
//         cnt++;
//         console.log(cnt);
//     }
// }
// const val=outer();
// val();
// val();
