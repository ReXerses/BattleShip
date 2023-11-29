import { Ship } from "./Ship";
import { Gameboard } from "./Gameboard";

export const Player = (idGiocatore) => {

    return {
        id : idGiocatore,
        tabella : Gameboard (),
        naviDisponibili : [Ship(1), Ship(2), Ship(3), Ship(3), Ship(4), Ship(5)],

        autoPosizionamentoNavi() {
            if (this.naviDisponibili.length === 0) {
                return;
            } else {
                let nave = this.naviDisponibili.pop(); // Ottieni l'ultima nave senza rimuoverla dall'array
                let controllo = true;
        
                while (controllo) {
                    let riga = Math.floor(Math.random() * 10);
                    let colonna = Math.floor(Math.random() * 10);
                    let opzioni = ['orizzontale', 'verticale'];
                    let direzione = opzioni[Math.floor(Math.random() * opzioni.length)];
        
                    if (this.tabella.placeShip(nave, riga, colonna, direzione)) {
                        controllo = false;
                    }
                }
        
                // Chiamata ricorsiva con l'array senza l'ultima nave
                this.autoPosizionamentoNavi(this.naviDisponibili);
            }
        }
    };
};