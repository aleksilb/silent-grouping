import './App.css';
import {fabric} from 'fabric';
import {useEffect, useState} from "react";
import {generateTexts} from './Text';
const width = 1500;
const height = 1000;
const API = 'http://localhost:5000'

function App() {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    let canvas = new fabric.Canvas('canvas');

    let genTexts = generateTexts(width, height);
    for (let text of genTexts) {
        canvas.add(text);
    }
    setTexts(genTexts);
  }, []);

  function sendPositions() {
      let positions = [];
      for(let text of texts) {
          positions.push([
              text.get('left'),
              text.get('top')
          ])
      }
      console.log(positions);
      fetch(API + '/positions', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(positions)
      }).then(result => {
          console.log(result)
      });
  }

  return (
    <div className="App">
      <canvas id="canvas" width={width} height={height}></canvas>
      <button onClick={sendPositions}>send</button>
      <div>

      </div>
    </div>
  );
}

export default App;
