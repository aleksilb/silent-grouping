import {fabric} from 'fabric';
import {useEffect, useState} from "react";
import {generateTexts} from '../Text';
import {Button} from "@mui/material";
import * as Server from '../scripts/server';
const width = 1500;
const height = 1000;

function Board(props) {
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
        Server.sendPositions(getPositions()).then(() => {
            props.finishFunction();
        });
    }

    function getPositions() {
        let positions = [];
        for(let text of texts) {
            positions.push([
                text.get('left'),
                text.get('top')
            ])
        }
        return positions;
    }

    return (
        <div className="Board">
            <canvas id="canvas" width={width} height={height}/>
            <Button onClick={sendPositions}>send</Button>
        </div>
    );
}

export default Board;
