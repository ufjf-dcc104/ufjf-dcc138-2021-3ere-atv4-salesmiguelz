import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Sprite from "./Sprite.js";

const img1 = new Image();
img1.src = "assets/garota.png";

const img2 = new Image();
img2.src = "assets/skelly.png";

const img3 = new Image();
img3.src = "assets/orc.png";

document.body.appendChild(img1, img2, img3);

const assets = new AssetManager();

const canvas = document.querySelector("canvas");
const cena1 = new Cena(canvas, assets);
const pc = new Sprite({vx: 10});
const en1 = new Sprite({
    x: 140,
    w: 30,
    color: "red"
});


cena1.adicionar(pc);
cena1.adicionar(en1);
cena1.adicionar(new Sprite({
    y: 40,
    w: 30,
    color: "red"
}));

//Daqui pra cima tudo entendido
//Dificuldade esta sendo na parte da animacao
cena1.iniciar();

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "s":
            cena1.iniciar();
            break;
        case "S":
            cena1.parar();
            break;
        default:
            break;
    }
});
