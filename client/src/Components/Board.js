import {fabric} from 'fabric';
import {useEffect, useState} from "react";
import {generateTexts} from '../Text';
import {Button} from "@mui/material";
import * as Server from '../scripts/server';
import Box from "@mui/material/Box";
import Title from "./Title";

const width = 1500;
const height = 1000;

function Board({grouper, finishFunction}) {
    const [texts, setTexts] = useState([]);

    useEffect(() => {
        let canvas = new fabric.Canvas('canvas');

        Server.getTerms(grouper.id).then(items => {
            let genTexts = generateTexts(items, width, height);
            console.log(genTexts);
            for (let text of genTexts) {
                canvas.add(text);
            }
            setTexts(genTexts);
        })
    }, [grouper])

    function sendPositions() {
        Server.sendPositions(grouper.id, getPositions()).then(() => {
            finishFunction();
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
        Drag the items that you think belong together close to each other
        <Box sx={{m: 4}}>
            <Box sx={{border: 1, borderColor: "black", boxShadow: 3, width: {width}, margin: "auto"}}>
                <canvas id="canvas" width={width} height={height}/>
            </Box>
        </Box>
        <Button variant="contained" onClick={sendPositions}>Finished</Button>
    </Box>;
}

export default Board;
