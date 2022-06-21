// import React, {useState} from 'react'
// import ReactDOM from 'react-dom/client';
// import Button from "./Button";


// const Round = () => {
//   const [round, setRound] = useState(3);
//   let handleChange = (event) => {
//     event.preventDefault();
//     const updatedRound = event.target.value;
//     setRound(updatedRound);
//     if (updatedRound <= 20){
//       // console.log('Hello'); 
//     }
    
//   }
//   return (
//     <div className="round">
//       <p>Number of rounds: </p>
//         <form id="inputForm">
//         <input id="form" type='number' defaultValue={round} min="1" max="20" onKeyDown={handleChange}/>
//         </form>              
//     </div>
//   )
// }

// export default Round
// //conditional statement if user pick round <= 20 game start
// //else round > 20, alert choose a round between 1-20
