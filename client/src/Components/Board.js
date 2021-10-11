import {fabric} from 'fabric';
import {useEffect, useRef, useState} from "react";
import {generateTexts} from '../Text';
import {Button} from "@mui/material";
import * as Server from '../scripts/server';
const width = 1500;
const height = 1000;

function Board(props) {
    const [texts, setTexts] = useState([]);
    const [waiting, setWaiting] = useState(true);

    const pollWait = function (){
        timerRef.current = setTimeout(checkStage, 500);
    };

    const pollWaitRef = useRef(pollWait);
    const timerRef = useRef(0);

    useEffect(() => {
        pollWaitRef.current();

        return () => {
            clearTimeout(timerRef.current);
        }
    }, []);

    function setUpBoard() {
        let canvas = new fabric.Canvas('canvas');

        Server.getTerms(props.groupingId).then(items => {
            let genTexts = generateTexts(items, width, height);
            console.log(genTexts);
            for (let text of genTexts) {
                canvas.add(text);
            }
            setTexts(genTexts);
        })
    }

    function checkStage() {
        Server.getGrouping(props.groupingId)
            .then(grouping => {
                if(grouping.stage === 'Grouping') {
                    setWaiting(false);
                    clearTimeout(timerRef.current);
                    setUpBoard();
                } else {
                    pollWait();
                }
            })
    }

    function sendPositions() {
        Server.sendPositions(props.voterId, getPositions()).then(() => {
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
            {waiting ?
                <div>Waiting...</div>
                :
                <div>
                    <canvas id="canvas" width={width} height={height}/>
                    <Button onClick={sendPositions}>send</Button>
                </div>
            }
        </div>
    );
}

export default Board;
