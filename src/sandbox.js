export const Ship = (lunghezza) => {

    return {
        length : lunghezza,
        receivedHit : 0,
        isSunked : false,
        hit () {
            return this.receivedHit += 1;
        },
        isSunk () {
            if((this.length === this.receivedHit)) {
                return this.isSunked = true;
            }else {
                return this.isSunked = false;
            }
        },
    };
};

export function inizializzaGriglia (griglia=[], dimensioneGriglia=10) {
    for (let i = 0; i < dimensioneGriglia; i++) {
        griglia[i] = [];
        for (let j = 0; j < dimensioneGriglia; j++) {
            griglia[i][j] = {
                status: 'empty', // Stato iniziale della casella (empty, ship, hit, miss, etc.)
                shipPart: null // Parte della nave presente nella casella (null se la casella è vuota o contiene una nave non colpita)
            };
        }
    }
    return griglia;
}

export const Gameboard =  () => {

    return {
        dimensioneGriglia : 10,
        griglia :  inizializzaGriglia() ,
        pezziDiNavi : 0,
        // creazione della griglia di gioco

        posizionamentoGrigliaValido (ship, riga, colonna,  orientation) {
            
            if (orientation === 'orizzontale') {
                if ((colonna + ship.length > 9) || ( ship.length - colonna < 0)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                if ((riga + ship.length > 9) || (ship.length - riga < 0)) {
                    return false;
                } else {
                    return true;
                }
            }
        },

        sovrapposizioneNaviValido (ship, riga, colonna,  orientation) {
            if (orientation === 'orizzontale') {
                for(let i = colonna; i < ship.length; i++) {
                    if(this.griglia[riga][i].status != 'empty') {
                        return false;
                    }
                }
                return true;
            } else {
                for(let i = riga; i < ship.length; i++) {
                    if(this.griglia[i][colonna].status != 'empty') {
                        return false;
                    }
                }
                return true;
            }
        },

        placeShip (ship, riga, colonna,  orientation) {
            if (this.posizionamentoGrigliaValido(ship, riga, colonna,  orientation) && this.sovrapposizioneNaviValido(ship, riga, colonna,  orientation)) {
                for (let i = 0; i < ship.length; i++) {
                    if (orientation === 'orizzontale') {
                        this.griglia[riga][colonna + i].status = 'ship';
                        this.griglia[riga][colonna + i].shipPart = ship;
                        this.pezziDiNavi++;
                    } else {
                        this.griglia[riga + i][colonna].status = 'ship';
                        this.griglia[riga + i][colonna].shipPart = ship;
                        this.pezziDiNavi++;
                    }
                }
            } else {
                return ('Posizionamento non valido');
            }
        },

        areAllShipsSunk() {
            return this.pezziDiNavi === 0;
        },

        receiveAttack (riga, colonna) {
            if(this.griglia[riga][colonna].status === 'ship') {
                this.griglia[riga][colonna].status = 'hit';
                this.griglia[riga][colonna].shipPart.hit();
                this.pezziDiNavi--;
                if (this.griglia[riga][colonna].shipPart.isSunk()) {
                    // La nave è completamente affondata
                    if (this.areAllShipsSunk()) {
                    // Tutte le navi sono state distrutte,  gestire la vittoria
                        console.log('Hai distrutto tutte le navi!');
                    }
                }
            } else if (this.griglia[riga][colonna].status === 'empty') {
                this.griglia[riga][colonna].status = 'miss';
            }
        },
    };
};


export const Player = (idGiocatore) => {

    return {
        id : idGiocatore,
        tabella : Gameboard (),
        naviDisponibili : [Ship(1), Ship(1), Ship(2), Ship(3), Ship(3), Ship(4), Ship(5)],

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
                        console.log('Nave posizionata con successo');
                        controllo = false;
                    }
                }
        
                // Chiamata ricorsiva con l'array senza l'ultima nave
                this.autoPosizionamentoNavi(this.naviDisponibili);
            }
        }
    };
};


function stampaTabella(tabella) {
    for (let riga = 0; riga < tabella.length; riga++) {
        let rigaStampata = '';

        for (let colonna = 0; colonna < tabella[riga].length; colonna++) {
            const cella = tabella[riga][colonna];
            let simbolo = '';

            switch (cella.status) {
                case 'ship':
                    simbolo = 'x';
                    break;
                case 'empty':
                    simbolo = '-';
                    break;
                case 'miss':
                    simbolo = 'o';
                    break;
                default:
                    simbolo = '?';
            }

            rigaStampata += simbolo + ' ';
        }

        console.log(rigaStampata.trim()); // Stampa la riga senza spazio finale
    }
}