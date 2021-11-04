import {fabric} from "fabric";

export function generateTexts(items, canvasWidth, canvasHeight) {
    const widthPadding = 70;
    const heightPadding = 20;
    let texts = [];
    for(let item of items) {
        const x = Math.round(Math.random() * (canvasWidth - widthPadding));
        const y = Math.round(Math.random() * (canvasHeight - heightPadding) + heightPadding);
        let text = new fabric.Text(item,{
            left : x,
            top : y,
            fontFamily: "Arial"
        });
        text.setControlsVisibility({ mtr: false, ml: false, mr: false, mb: false, mt: false, tl: false, tr: false, bl: false, br: false });
        texts.push(text);
    }
    return texts;
}
