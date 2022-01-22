import Sprite from "./Sprite.js";

export default class Cena{
    constructor(canvas, assets = null){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.sprites = [];
        this.aRemover = [];
        this.t0 = 0;
        this.dt = 0;
        this.idAnim = null;
        this.assets = assets;

        this.spawn = 0;

        this.mapa = null;

        this.contaInimigos = 0;
    }
    
    desenhar(){
        this.ctx.fillStyle = "lightblue";
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);

        this.mapa?.desenhar(this.ctx);

        if(this.assets.acabou()){
            for(let i = 0; i < this.sprites.length; i++){
                const sprite = this.sprites[i];
                sprite.desenhar(this.ctx);
                sprite.aplicaRestricoes();
            }
        }
        

        this.ctx.fillStyle = "yellow";
        this.ctx.fillText(this.assets?.progresso(), 10, 20);
    }

    adicionar(sprite){
        sprite.cena = this;
        this.sprites.push(sprite);
    }

    passo(dt){
        //So comeco a contar o passo a partir de quando as imagens estao carregadas
        if(this.assets.acabou()){
            for (const sprite of this.sprites) {
                sprite.passo(dt);
            }
        }

        this.spawn += dt;

        if(this.spawn >= 3.0){
            this.spawn = 0;

            this.criaInimigo();
        }
    }

    quadro(t){
        this.t0 = this.t0 ?? t;
        this.dt = (t - this.t0)/1000;

        //Passo altera a posicao dos sprites, baseado no dt (equacao do espaco). (lembra que as animacoes tem que ser baseadas no dt para nao ter bugs visuais)
        this.passo(this.dt);

        //Desenha o "fundo" (canvas) e os sprites na tela, ja com seus estados (posicoes) modificados pelo passo
        this.desenhar();
        this.checaColisao();
        this.removerSprites();

        //Rodo o iniciar novamente para refazer todo esse processo
        this.iniciar();
        this.t0 = t;
    }

    iniciar(){
        this.idAnim = requestAnimationFrame(
            (t) => {this.quadro(t);}
        );
    }

    parar(){
        cancelAnimationFrame(this.idAnim);
        this.t0 = null;
        this.dt = 0;
    }

    checaColisao(){
        for(let a = 0; a < this.sprites.length - 1; a++){
            const spriteA = this.sprites[a];

            for(let b = a+1; b < this.sprites.length; b++){
                const spriteB = this.sprites[b];
                
                if(spriteA.colidiuCom(spriteB)){
                    this.quandoColidir(spriteA, spriteB);
                }
            }
        }
    }

    quandoColidir(a, b){
        if(!this.aRemover.includes(a)){
            this.aRemover.push(a);
        } 

        if(!this.aRemover.includes(b)){
            this.aRemover.push(b);
        }
        //É necessario o usuario interagir com a pagina para que o asset pode ser tocado
        this.assets.play('hit');
    }

    removerSprites(){
        for (const alvo of this.aRemover) {
            //Pega o indice do elemento a remover dentro do array original de sprites
            const i = this.sprites.indexOf(alvo);
            if(i >= 0){
                this.sprites.splice(i, 1);
            }
        }

        this.aRemover = [];
    }

    configuraMapa(mapa){
        this.mapa = mapa;
        this.mapa.cena = this;
    }

    criaInimigo(){
        if(this.contaInimigos < 20){
            let sl = 0;
            let sc = 0;
    
            while(this.mapa.tiles[sl][sc] != 0){
                sl = Math.floor(Math.random() * (14 - 1 - 1) + 1);
                sc = Math.floor(Math.random() * (18 - 1 - 1) + 1);
            }
    
            const en1 = new Sprite({
                x: sc * 32 + 32/2,
                y: sl * 32 + 32/2,
                color: "red"
            });
    
            this.adicionar(en1);
            this.contaInimigos++;
            
        } else{
            for(const sprite of this.sprites){
                if(sprite.color == 'red'){
                    this.aRemover.push(sprite);
                }
            }
        }
       
    }
}