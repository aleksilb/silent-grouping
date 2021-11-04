import {fabric} from 'fabric';
import {useEffect, useState} from "react";
import {generateTexts} from '../Text';
import {Button} from "@mui/material";
import * as Server from '../scripts/server';
import Box from "@mui/material/Box";
import Title from "./Title";

const width = 1500;
const height = 1000;

function Board(props) {
    const [texts, setTexts] = useState([]);

    useEffect(() => {
        let canvas = new fabric.Canvas('canvas');

        Server.getTerms(props.groupingId).then(items => {
            let genTexts = generateTexts(items, width, height);
            console.log(genTexts);
            for (let text of genTexts) {
                canvas.add(text);
            }
            setTexts(genTexts);
        })
    }, [props.groupingId])

    function sendPositions() {
        Server.sendPositions(props.voterId, getPositions()).then(() => {
            props.finishFunction();
        });
    }

    function getPositions() {
        let positions = [];
        for (let text of texts) {
            positions.push([
                text.get('left'),
                text.get('top')
            ])
        }
        return positions;
    }

    return <Box className="Board">
        <Title>Group items</Title>
        <Box sx={{border: 1, borderColor: "black", m:2, boxShadow: 3}}>
            <canvas id="canvas" width={width} height={height}/>
        </Box>
        <Button variant="contained" onClick={sendPositions}>Finished</Button>
    </Box>;
}

export default Board;
