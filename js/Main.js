import Mapa from "./Mapa.js";
import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa1.js";
import Mixer from "./Mixer.js";

const mixer = new Mixer(10);
const assets = new AssetManager(mixer);
assets.carregaImagem("garota", "assets/garota.png");
assets.carregaImagem("esqueleto", "assets/skelly.png");
assets.carregaImagem("orc", "assets/orc.png");
assets.carregaAudio("moeda", "assets/coin.wav");
assets.carregaAudio("boom", "assets/boom.wav");
assets.carregaAudio("hit", "assets/hit.wav");



const canvas = document.querySelector("canvas");
const cena1 = new Cena(canvas, assets);
canvas.width = 18*32;
canvas.height = 14*32;

const mapa1 = new Mapa(14, 18, 32);
mapa1.carregaMapa(modeloMapa1);
cena1.configuraMapa(mapa1);


const pc = new Sprite({x: 150, vx: 10});
const en1 = new Sprite({
    x:30,
    y: 50,
    vx: -10,
    color: "red"
});


cena1.adicionar(pc);
cena1.adicionar(en1);
cena1.adicionar(new Sprite({
    x: 180,
    y: 50,
    vy: 10,
    color: "green"
}));

cena1.adicionar(new Sprite({
    x: 115,
    y: 110,
    vy: -10,
    color: "red"
}));

cena1.iniciar();

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "s":
            cena1.iniciar();
            break;
        case "S":
            cena1.parar();
            break;
        case "c":
            assets.play("moeda");
            break;
        case "b":
            assets.play("boom");
        default:
            break;
    }
});
