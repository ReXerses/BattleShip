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