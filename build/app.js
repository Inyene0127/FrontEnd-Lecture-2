import React from "react";
import ReactDOM from 'react-dom/client';
class Display extends React.Component {
  render() {
    <div className="display">
      <input type="text" placeholder="First Name"/>
      <button className="begin" onClick={function() {
        console.log('click');
      }}>Begin Game</button>
    </div>
  }
}

const root = document.getElementById('root');
root.render(<Display />)