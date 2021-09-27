import items from './items.json'
import {fabric} from "fabric";

export function generateTexts(canvasWidth, canvasHeight) {
    const widthPadding = 70;
    const heightPadding = 20;
    let texts = [];
    for(let item of items) {
        const x = Math.round(Math.random() * (canvasWidth - widthPadding));
        const y = Math.round(Math.random() * (canvasHeight - heightPadding));
        texts.push(new fabric.Text(item,{
            left : x,
            top : y
        }));
    }
    return texts;
}
