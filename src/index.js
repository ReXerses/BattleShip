const Ship = (lunghezza) => {

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

const Gameboard = () => {
    const dimensioneGriglia = 10;
    const griglia = [];
    let pezziDiNavi = 0;
    // creazione della griglia di gioco

    function posizionamentoGrigliaValido (ship, riga, colonna,  orientation) {
        if (orientation === 'orizzontale') {
            if ((riga + ship.length > 9) || (riga - ship.length < 0)) {
                return false;
            } else {
                return true;
            }
        } else {
            if ((colonna + ship.length > 9) || (colonna - ship.length < 0)) {
                return false;
            } else {
                return true;
            }
        }
    }

    function sovrapposizioneNaviValido (ship, riga, colonna,  orientation) {
        if (orientation === 'orizzontale') {
            for(let i = colonna; i < ship.length; i++) {
                if(griglia[riga][i].status != 'empty') {
                    return false;
                }
            }
            return true;
        } else {
            for(let i = riga; i < ship.length; i++) {
                if(griglia[i][colonna].status != 'empty') {
                    return false;
                }
            }
            return true;
        }
    }

    function placeShip (ship, riga, colonna,  orientation) {
        if (posizionamentoGrigliaValido(ship, riga, colonna,  orientation) && sovrapposizioneNaviValido(ship, riga, colonna,  orientation)) {

            for (let i = 0; i < ship.length; i++) {
                if (orientation === 'orizzontale') {
                  griglia[riga][col + i].status = 'ship';
                  griglia[riga][col + i].shipPart = ship;
                  pezziDiNavi++;
                } else {
                  griglia[riga + i][col].status = 'ship';
                  griglia[riga + i][col].shipPart = ship;
                  pezziDiNavi++;
                }
            }
        }
    }

    function areAllShipsSunk() {
        return pezziDiNavi === 0;
    }

    function receiveAttack (riga, colonna) {
        if(griglia[riga][colonna].status === 'ship') {
            griglia[riga][colonna].status = 'hit';
            Ship.hit();
            pezziDiNavi--;
            if (Ship.isSunk()) {
                // La nave è completamente affondata
                if (areAllShipsSunk()) {
                  // Tutte le navi sono state distrutte,  gestire la vittoria
                  console.log('Hai distrutto tutte le navi!');
                }
            }
        } else if (griglia[riga][colonna].status === 'empty') {
            griglia[riga][colonna].status = 'miss';
        }
    }

    for (let i = 0; i < dimensioneGriglia; i++) {
        griglia[i] = [];
        for (let j = 0; j < dimensioneGriglia; j++) {
          griglia[i][j] = {
            status: 'empty', // Stato iniziale della casella (empty, ship, hit, miss, etc.)
            shipPart: null // Parte della nave presente nella casella (null se la casella è vuota o contiene una nave non colpita)
          };
        }
    }

    return {
        placeShip,
        receiveAttack
    };

}
