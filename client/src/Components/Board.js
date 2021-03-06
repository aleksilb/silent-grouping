import {fabric} from 'fabric';
import {useEffect, useState} from "react";
import {generateTexts} from '../Text';
import {Button} from "@mui/material";
import * as Server from '../scripts/server';
import Box from "@mui/material/Box";
import Title from "./Title";
import {KeyboardArrowRight} from "@mui/icons-material";

const width = 1500;
const height = 1000;

function Board({grouper, finishFunction}) {
    const [texts, setTexts] = useState([]);

    useEffect(() => {
        let canvas = new fabric.Canvas('canvas');

        Server.getItems(grouper.grouping.id).then(items => {
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
        <Title grouper={grouper}>Group items</Title>
        Drag the items that you think belong together close to each other and then click continue
        <Box sx={{m: 4}}>
            <Box sx={{border: 1, borderColor: "black", boxShadow: 3, width: {width}, margin: "auto"}}>
                <canvas id="canvas" width={width} height={height}/>
            </Box>
        </Box>
        <Button variant="contained" onClick={sendPositions} sx={{my: 3, ml: 3}} endIcon={<KeyboardArrowRight/>}>Continue</Button>
    </Box>;
}

export default Board;
