import './style.css'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas id="canvas" width="800" height="800"></canvas>
    <div class="hidden">
      <img 
        id="source"
        src="testimage.png"
        >
      </img>
    </div>
  </div>
`
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const image = document.getElementById("source") as HTMLImageElement;
let colorArray;

const getData = () => {
  let imageColorData = ctx!.getImageData(0, 0, 100, 100)
  let colorDataArray = new Array(10000);

  for(let i=0; i<imageColorData.data.length; i+=4) {
    let r = imageColorData.data[i];
    let g = imageColorData.data[i+1];
    let b = imageColorData.data[i+2];
    colorDataArray[i] = [r, g, b]
  }
  return colorDataArray;
}

if (image && ctx) {
  if (image.complete) {
    ctx.drawImage(image, 0, 0, 100, 100);
    getPalette()
  }
  image.addEventListener("load", () => {
    ctx.drawImage(image, 0, 0, 100, 100);
    getPalette()
  })
}

function getPalette() {
  colorArray = getData()
  chooseCentroid()
}

function chooseCentroid() {
  let centroid = 3;
  for(let i=0; i<centroid; ++i) {
    let test = Math.floor(Math.random() * 9999)
  }
}




setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
