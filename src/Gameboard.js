function inizializzaGriglia (griglia=[], dimensioneGriglia=10) {
    for (let i = 0; i < dimensioneGriglia; i++) {
        griglia[i] = [];
        for (let j = 0; j < dimensioneGriglia; j++) {
            griglia[i][j] = {
                status: 'empty', // Stato iniziale della casella (empty, ship, hit, miss, etc.)
                hipPart: null // Parte della nave presente nella casella (null se la casella è vuota o contiene una nave non colpita)
            };
        }
    }
    return griglia;
}

export const Gameboard =  () => {

    return {
        dimensioneGriglia : 10,
        griglia :  inizializzaGriglia() , // si puo espandere la griglia se necessario
        pezziDiNavi : 0,
        // creazione della griglia di gioco

        posizionamentoGrigliaValido (ship, riga, colonna,  orientation) {
            
            if (orientation === 'orizzontale') {
                if ((colonna + ship.length-1 > 9)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                if ((riga + ship.length-1 > 9)) {
                    return false;
                } else {
                    return true;
                }
            }
        },

        sovrapposizioneNaviValido (ship, riga, colonna,  orientation) {
            if (orientation === 'orizzontale') {
                for(let i = colonna; i < colonna + ship.length; i++) {
                    if(this.griglia[riga][i].status != 'empty') {
                        return false;
                    }
                }
                return true;
            } else {
                for(let i = riga; i < riga + ship.length; i++) {
                    if(this.griglia[i][colonna].status != 'empty') {
                        return false;
                    }
                }
                return true;
            }
        },

        placeShip (ship, riga, colonna,  orientation) {
            if ((this.posizionamentoGrigliaValido(ship, riga, colonna,  orientation)) && (this.sovrapposizioneNaviValido(ship, riga, colonna,  orientation))) {
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
                return true;
            } else {
                return false;
            }
        },

        areAllShipsSunk() {
            return this.pezziDiNavi === 0;
        },

        receiveAttack (riga, colonna) {
            const cella = this.griglia[riga][colonna];
            if(cella.status === 'ship') {
                cella.status = 'hit';
                cella.shipPart.hit();
                this.pezziDiNavi--;
                
            } else if (cella.status === 'empty') {
                cella.status = 'miss';
            }
        },
    };
};