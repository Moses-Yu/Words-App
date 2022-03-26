import React, { useState } from 'react';
import './App.css';

function App() {

  let word = ["apple", "watermelon"];
  let discription = ["사과", "수박"];
  let [words, edit] = useState(word, "edit");
  let [disc, edit1] = useState(discription, "edit");
  
  return (
    <div className="App">
      <div className='list'>
        <div>{ words[0] }</div>
        <div>{ disc[0] }</div>
      </div>
    </div>
  );
}

export default App;
