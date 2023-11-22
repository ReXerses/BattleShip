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
