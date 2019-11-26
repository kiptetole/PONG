class bola{
    
    constructor(x ,y ,velx ,vely ,radio ,color){
        this.x = x;
        this.y = y;
        this.velx = velx;
        this.vely = vely;
        this.color = color;
        this.r = radio;
        this.tag = document.createElementNS("http://www.w3.org/2000/svg","circle")
        this.tag.setAttribute("cx", this.x);
        this.tag.setAttribute("cy", this.y);
        this.tag.setAttribute("r", this.r);
        this.tag.setAttribute("fill", this.color);
        document.getElementById("caja").appendChild(this.tag);
    }

    mover(jugador1, jugador2){
        if(this.x + this.velx - this.r < 0 || this.x + this.velx + this.r > 1000){
            this.velx *= -1;
        }

        if(this.y + this.vely - this.r < 0 || this.y + this.vely + this.r > 800){
            this.vely *= -1;
        }

        this.colision(jugador1);
        this.colision(jugador2);

        this.x += this.velx;
        this.y += this.vely;
    }

    pintar(){
        this.tag.setAttribute("cx", this.x);
        this.tag.setAttribute("cy", this.y);
    }

    colision(barra){
        // Puntos de colision de la barra introdicida por parametro.
        var puntosBarrax = [barra.x, barra.x+barra.ancho];
        var puntosBarray = [barra.y, barra.y+barra.alto];

        // Puntos de colision de la pelota.
        var puntosCirculox = [this.x, this.x+this.r, this.x, this.x-this.r, this.x+(Math.cos(45)*this.r), this.x+(Math.cos(45)*this.r), this.x-(Math.cos(45)*this.r), this.x-(Math.cos(45)*this.r)];
        var puntosCirculoy = [this.y-this.r, this.y, this.y+this.r, this.y, this.y-(Math.sin(45)*this.r), this.y+(Math.sin(45)*this.r), this.y+(Math.sin(45)*this.r), this.y-(Math.sin(45)*this.r)];
        var cont = 0;
        var colision = false;

        do{
            if (puntosCirculox[cont] > puntosBarrax[0] && puntosCirculox[cont] < puntosBarrax[1]){
                if (puntosCirculoy[cont] > puntosBarray[0] && puntosCirculoy[cont] < puntosBarray[1]){
                    this.velx*=-1;
                    colision = true;
                }
            }
            cont++;
        }while((puntosCirculox.length==0 && puntosCirculoy.length==0)||(colision = false));
        // si nos hemos quedado sin puntos o si hemos colisionado salimos del bucle.
    }
}

class rectangulo{
    constructor(x ,y ,alt ,ach ,color){
        this.marcador = 0;
        this.x = x;
        this.y = y;
        this.color = color;
        this.alto = alt;
        this.ancho = ach;
        this.tag = document.createElementNS("http://www.w3.org/2000/svg","rect");
        this.tag.setAttribute("x", this.x);
        this.tag.setAttribute("y", this.y);
        this.tag.setAttribute("width", this.ancho);
        this.tag.setAttribute("height", this.alto);
        this.tag.setAttribute("fill", this.color);
        document.getElementById("caja").appendChild(this.tag);
    }

    moverArriba(){
        if(this.y > 0){
            this.y = this.y - 5;
        }
    }

    moverAbajo(){
        if(this.y + this.alto < 800){
            this.y = this.y + 5;
        }
    }

    pintar(){
        this.tag.setAttribute("y", this.y);
    }

}



class juego{
    
    empezar(){
        document.addEventListener("keydown", (e) => {this.mover(e)});
        document.addEventListener("keyup", (e) => {this.parar(e)});

        // Creamo la bola del juego.
        this.pelota = new bola(100,100,1,1,10,"red");
        
        // Creamos los jugadores.
        this.jugador1 = new rectangulo(50,50,200,10,"black");
        this.jugador2 = new rectangulo(940,50,200,10,"black");
    
        setInterval( () => {
            //movimiento de la pelota.
            this.pelota.mover(this.jugador1, this.jugador2);
            this.pelota.pintar();

            //

            // Movimiento del jugador 1.
            if (this.arriba1)
                this.jugador1.moverArriba();
            if (this.abajo1)   
                this.jugador1.moverAbajo();

            // Movimiento del jugador 2.
            if (this.arriba2)
                this.jugador2.moverArriba();
            if(this.abajo2)
                this.jugador2.moverAbajo();

            // Movimiento de los jugadores.
            this.jugador1.pintar();
            this.jugador2.pintar();
            this.marcador();
        }, 1);
    }
        
        mover(e){
            //Jugador 1.
            if(e.keyCode == 87)
                this.arriba1 = true;
            if(e.keyCode == 83)
                this.abajo1 = true;
            
                //Jugador 2.
            if(e.keyCode == 38)
                this.arriba2 = true;
            if(e.keyCode == 40)
                this.abajo2 = true;
        }

        parar(e){
            //Juegador 1.
            if(e.keyCode == 87)
                this.arriba1 = false;
            if(e.keyCode == 83)
                this.abajo1 = false;
            
            //Juegador 2.
            if(e.keyCode == 38)
                this.arriba2 = false;
            if(e.keyCode == 40)
                this.abajo2 = false;
        }

        marcador(){
            if(this.pelota.x + this.pelota.velx - this.pelota.r < 0){
                this.jugador2.marcador++;
            }

            if (this.pelota.x + this.pelota.velx - this.pelota.r > 1000){
                this.jugador1.marcador++;
            }
        }
}


// Para crear la bola.
juego = new juego();
window.onload = () => {
    juego.empezar();
}