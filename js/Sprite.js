export default class Sprite{
    //Responsavel por modelar algo que se move na tela.
    constructor({x=100, y=100, vx=0, vy=0, w=20, h=20, color="white"}={}){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.w = w;
        this.h = h;
        this.color = color;
        this.cena = null;

        //Posicao no mapa, e nao no canvas todo como o x  e o y originais
        this.mx = 0;
        this.my = 0;
    }
    desenhar(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.w/2, this.y - this.h/2,this.w, this.h);
        ctx.strokeStyle = "blue";
        ctx.strokeRect(this.mx * this.cena.mapa.SIZE, this.my * this.cena.mapa.SIZE, this.cena.mapa.SIZE, this.cena.mapa.SIZE);
    }
    passo(dt){
        this.x = this.x + this.vx * dt;
        this.y = this.y + this.vy * dt;
        this.mx = Math.floor(this.x / this.cena.mapa.SIZE);
        this.my = Math.floor(this.y/ this.cena.mapa.SIZE);

        if(this.color == "blue"){
            console.log(this.mx);
        }
    }

    colidiuCom(outro){
        return !(
            (this.x - this.w/2 > outro.x + outro.w/2) || (this.x + this.w/2 < outro.x - outro.w/2) ||  (this.y - this.h/2 > outro.y + outro.h/2) || (this.y + this.h/2 < outro.y - outro.h/2)
        )
    }
}