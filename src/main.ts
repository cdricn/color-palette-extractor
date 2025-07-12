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

function getColors() {
  let imageColorData = ctx!.getImageData(0, 0, 100, 100)
  let colorDataArray = [];

  for(let i=0; i<imageColorData.data.length; i+=4) {
    let r = imageColorData.data[i];
    let g = imageColorData.data[i+1];
    let b = imageColorData.data[i+2];
    colorDataArray.push([r, g, b])
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
  let K = chooseCentroid(5)
  kMeans(K);
}

function chooseCentroid(centroid:number) {
  let centroids = [centroid] 
  for(let i=0; i<centroid; ++i) {
    centroids[i] = Math.floor(Math.random() * 9999)
  }
  return centroids
}

function kMeans(K:Array<number>) {
  colorArray = getColors()
  let clusterArray: number[][] = Array.from({ length: K.length }, () => []);

  for (let i=0; i<colorArray.length-1; ++i) {
  let current = 0;
  let centroid = Infinity;

    for (let j=0; j<K.length; ++j) {
      let x = Math.pow((colorArray[K[j]][0]-colorArray[i][0]), 2);
      let y = Math.pow((colorArray[K[j]][1]-colorArray[i][1]), 2);
      let z = Math.pow((colorArray[K[j]][2]-colorArray[i][2]), 2);
      let distance = Math.sqrt(x+y+z);
      
      if (distance < centroid) {
        centroid = distance;
        current = j
      }
      if (j == K.length-1){
        clusterArray[current].push(distance)
      }
    }
  }

  console.log("HI", clusterArray)
    
}





setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
