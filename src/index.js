import scheletroPagina from './scheletroPagina';

scheletroPagina();

const tavoloUmano = document.getElementById('human');
const tavoloBot = document.getElementById('bot');
const CLASSE_VALIDA = 'valid';
const CLASSE_INVALIDA = 'invalid';
const MAX_COLONNE = 10;
const infoCollocamento = document.querySelector('.info');


let turnoUmano = true;
let statoRuotaNave = 'orizzontale';

function aggiornaTabella (casella, i, j , giocatore) {

    if(giocatore.tabella.griglia[i][j].status === 'hit') {
        casella.classList.remove('ship');
        casella.classList.add('hit');
    } else if (giocatore.tabella.griglia[i][j].status === 'miss'){
        casella.classList.add('miss');
    }
}

function makeGridDOM(giocatore) {
    if(giocatore.id === 1) { // al player aggiungere le classi - al bot no
        for (let i = 0; i < giocatore.tabella.dimensioneGriglia; i++) {
            const row = document.createElement('div');

            row.className = 'row';
            row.dataset.row=i;
            tavoloUmano.appendChild(row);
            
            for (let j = 0; j < giocatore1.tabella.dimensioneGriglia; j++) {
                const col = document.createElement('div');
                col.className = 'col';
                col.dataset.row=i;
                col.dataset.col=j;
                col.classList.add('casellaGiocatore');
                
                if (giocatore.tabella.griglia[i][j].status === 'ship') {
                    col.classList.add('ship');
                } else {
                    col.classList.add('empty');
                }

                row.appendChild(col);
            }
        }
    } else {
        for (let i = 0; i < giocatore.tabella.dimensioneGriglia; i++) {
            const row = document.createElement('div');
            row.className = 'row';
            row.dataset.row=i;
            tavoloBot.appendChild(row);
    
            for (let j = 0; j < giocatore.tabella.dimensioneGriglia; j++) {
                const col = document.createElement('div');
                col.className = 'col';
                col.dataset.row=i;
                col.dataset.col=j;
                col.classList.add('casellaBot');

                row.appendChild(col);
    
            }
        }
    }
}

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

const Gameboard =  () => {

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
                if (cella.shipPart.isSunk()) {
                    // La nave è completamente affondata
                    if (this.areAllShipsSunk()) {
                    // Tutte le navi sono state distrutte,  gestire la vittoria
                        console.log('Hai distrutto tutte le navi!');
                    }
                }
            } else if (cella.status === 'empty') {
                cella.status = 'miss';
            }
        },
    };
};

const Player = (idGiocatore) => {

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


let giocatore1 = Player(1);
let bot = Player(2);

bot.autoPosizionamentoNavi();
makeGridDOM(bot);
tavoloBot.style.pointerEvents = 'none'; //disattivo il tavolo del bot
const ruotaBtn = document.getElementById('rotate');

ruotaBtn.addEventListener('click',  () => {
    if(statoRuotaNave === 'orizzontale') {
        statoRuotaNave = 'verticale';
    } else {
        statoRuotaNave = 'orizzontale';
    }
});

makeGridDOM(giocatore1);

function aggiornaGriglia (giocatore) {
    let caselleGriglia = document.querySelectorAll('.casellaGiocatore');
    caselleGriglia.forEach( casella => {
        let riga = casella.getAttribute('data-row');
        let colonna = casella.getAttribute('data-col');
        if(giocatore.tabella.griglia[riga][colonna].status === 'ship') {
            casella.classList.add('ship');
        }
    });
}

let caselleGriglia = document.querySelectorAll('.casellaGiocatore');
let caselleGrigliaBot = document.querySelectorAll('.casellaBot');
caselleGriglia.forEach( casella => {
    casella.addEventListener('click', event =>  aggiungiEventoCasellaInserisciNave(event, casella));
});

function aggiungiEventoCasellaInserisciNave (event, casella) {
    if(giocatore1.naviDisponibili.length != 0) {
        let riga = parseInt(casella.getAttribute('data-row'));
        let colonna = parseInt(casella.getAttribute('data-col'));
        let nave = giocatore1.naviDisponibili[giocatore1.naviDisponibili.length-1];
        if((giocatore1.tabella.posizionamentoGrigliaValido(nave, riga, colonna, statoRuotaNave)) &&
          (giocatore1.tabella.sovrapposizioneNaviValido(nave, riga, colonna, statoRuotaNave))) {
            
            let nave = giocatore1.naviDisponibili.pop();
            giocatore1.tabella.placeShip(nave, riga, colonna, statoRuotaNave);
            aggiornaGriglia(giocatore1);
        }
    }
    if (giocatore1.naviDisponibili.length === 0)  {
        rimuoviEventoDaTutteLeCaselle();
        tavoloUmano.innerHTML = '';
        makeGridDOM(giocatore1);
        infoCollocamento.style.display = 'none';
        tavoloBot.addEventListener('click', gestisciClicElementoTavolo);
        tavoloUmano.addEventListener('click', gestisciClicElementoTavolo);
    }
}

function rimuoviEventoDaTutteLeCaselle() {
    caselleGriglia.forEach(casella => {
        casella.removeEventListener('click', aggiungiEventoCasellaInserisciNave);
    });
}


function rimuoviClassi() {
    let caselleGriglia = document.querySelectorAll('.casellaGiocatore');
    caselleGriglia.forEach(c => {
        c.classList.remove(CLASSE_VALIDA, CLASSE_INVALIDA);
    });
}

caselleGriglia.forEach(casella => {
    casella.addEventListener('mouseover', () => {
        rimuoviClassi();

        let nave = giocatore1.naviDisponibili[giocatore1.naviDisponibili.length - 1];
        let riga = parseInt(casella.getAttribute('data-row'));
        let colonna = parseInt(casella.getAttribute('data-col'));

        let tutteValide = true;

        for (let i = 0; i < nave.length; i++) {
            let col = statoRuotaNave === 'orizzontale' ? colonna + i : colonna;
            let row = statoRuotaNave === 'verticale' ? riga + i : riga;

            let quadrato = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

            if (!quadrato || quadrato.classList.contains('ship') || (statoRuotaNave === 'verticale' && row >= MAX_COLONNE) || (statoRuotaNave === 'orizzontale' && col >= MAX_COLONNE)) {
                tutteValide = false;
            }
        }

        let classeAggiunta = tutteValide ? CLASSE_VALIDA : CLASSE_INVALIDA;

        for (let i = 0; i < nave.length; i++) {
            let col = statoRuotaNave === 'orizzontale' ? colonna + i : colonna;
            let row = statoRuotaNave === 'verticale' ? riga + i : riga;

            let quadrato = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            quadrato.classList.add(classeAggiunta);
        }
    });
});
// bot table
caselleGrigliaBot.forEach(casella => {
    casella.addEventListener('click', () => {
        let riga = parseInt(casella.getAttribute('data-row'));
        let colonna = parseInt(casella.getAttribute('data-col'));
        
        if(bot.tabella.griglia[riga][colonna].status != 'miss' && bot.tabella.griglia[riga][colonna].status != 'hit') {
            bot.tabella.receiveAttack(riga, colonna);
            aggiornaTabella(casella,riga,colonna, bot);
            turnoUmano= false;
            if(bot.tabella.areAllShipsSunk()) {
                gestisciVittoria('HUMAN');
                //alert('Human wins the game'); //fa comparire una finistra modale annuncia il vincitore e fai scegliere se ricominciare la partita.
            } else {
                gestisciClicElementoTavolo();
            }
        }
    });
});



function gestisciClicElementoTavolo() {
    if (turnoUmano) {
        tavoloBot.style.pointerEvents = 'auto';
    } else {

        tavoloBot.style.pointerEvents = 'none';
        let controllo = true;
        while(controllo) {
            let riga = Math.floor(Math.random() * 10);
            let colonna = Math.floor(Math.random() * 10);
            if(giocatore1.tabella.griglia[riga][colonna].status === 'ship' || giocatore1.tabella.griglia[riga][colonna].status === 'empty') {
                let quadrato = document.querySelector(`[data-row="${riga}"][data-col="${colonna}"]`);
                giocatore1.tabella.receiveAttack(riga, colonna);
                aggiornaTabella(quadrato, riga, colonna, giocatore1);
                controllo = false;
            }
        }
        if(giocatore1.tabella.areAllShipsSunk()) {
            gestisciVittoria('BOT');
        } else {
            turnoUmano = true;
            gestisciClicElementoTavolo();
        }

    }
}

function gestisciVittoria (stringaVincitore) {
    const overlay = document.getElementById('modalOverlay');
    const mainContainer = document.querySelector('.mainContainer');
    const finestraVittoria = document.createElement('div');
    finestraVittoria.classList.add('modale');
    
    const nomeVincitore = document.createElement('span');
    nomeVincitore.textContent = `${stringaVincitore} WINS!`;
    finestraVittoria.appendChild(nomeVincitore);

    const ricominciaBtn = document.createElement('button');
    ricominciaBtn.textContent = 'Restart';
    finestraVittoria.appendChild(ricominciaBtn);
    mainContainer.appendChild(finestraVittoria);
    overlay.classList.add('modal-overlay');

    ricominciaBtn.addEventListener('click' , () => {
        tavoloUmano.style.pointerEvents = 'auto';
        overlay.classList.remove('modal-overlay');
        finestraVittoria.style.display = 'none';
        giocatore1 = Player(1);
        bot = Player(2);
        bot.autoPosizionamentoNavi();
        tavoloBot.innerHTML= '';
        tavoloUmano.innerHTML= '';
        makeGridDOM(bot);
        tavoloBot.style.pointerEvents = 'none'; //disattivo il tavolo del bot
        infoCollocamento.style.display = 'flex';
        //gestire il restart del game
        makeGridDOM(giocatore1);
        let caselleGriglia = document.querySelectorAll('.casellaGiocatore');
        let caselleGrigliaBot = document.querySelectorAll('.casellaBot');

        caselleGriglia.forEach( casella => {
            casella.addEventListener('click', event =>  aggiungiEventoCasellaInserisciNave(event, casella));
        });

        caselleGriglia.forEach(casella => {
            casella.addEventListener('mouseover', () => {
                rimuoviClassi();
                let nave = giocatore1.naviDisponibili[giocatore1.naviDisponibili.length - 1];
                let riga = parseInt(casella.getAttribute('data-row'));
                let colonna = parseInt(casella.getAttribute('data-col'));
        
                let tutteValide = true;
        
                for (let i = 0; i < nave.length; i++) {
                    let col = statoRuotaNave === 'orizzontale' ? colonna + i : colonna;
                    let row = statoRuotaNave === 'verticale' ? riga + i : riga;
                    let quadrato = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        
                    if (!quadrato || quadrato.classList.contains('ship') || (statoRuotaNave === 'verticale' && row >= MAX_COLONNE) || (statoRuotaNave === 'orizzontale' && col >= MAX_COLONNE)) {
                        tutteValide = false;
                    }
                }
        
                let classeAggiunta = tutteValide ? CLASSE_VALIDA : CLASSE_INVALIDA;
        
                for (let i = 0; i < nave.length; i++) {
                    let col = statoRuotaNave === 'orizzontale' ? colonna + i : colonna;
                    let row = statoRuotaNave === 'verticale' ? riga + i : riga;
        
                    let quadrato = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                    quadrato.classList.add(classeAggiunta);
                }
            });
        });
        // bot table
        caselleGrigliaBot.forEach(casella => {
            casella.addEventListener('click', () => {
                let riga = parseInt(casella.getAttribute('data-row'));
                let colonna = parseInt(casella.getAttribute('data-col'));
                
                if(bot.tabella.griglia[riga][colonna].status != 'miss' && bot.tabella.griglia[riga][colonna].status != 'hit') {
                    bot.tabella.receiveAttack(riga, colonna);
                    aggiornaTabella(casella,riga,colonna, bot);
                    turnoUmano= false;
                    if(bot.tabella.areAllShipsSunk()) {
                        gestisciVittoria('HUMAN');
                        //alert('Human wins the game'); //fa comparire una finistra modale annuncia il vincitore e fai scegliere se ricominciare la partita.
                    } else {
                        gestisciClicElementoTavolo();
                    }
                }
            });
        });
    });

    /*finestraVittoria.appendChild(ricominciaBtn);
    mainContainer.appendChild(finestraVittoria);
    overlay.classList.add('modal-overlay');*/


}


