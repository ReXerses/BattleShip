import scheletroPagina from './scheletroPagina';
import { Player } from './Player';

scheletroPagina();

const tavoloUmano = document.getElementById('human');
const tavoloBot = document.getElementById('bot');
const CLASSE_VALIDA = 'valid';
const CLASSE_INVALIDA = 'invalid';
const MAX_COLONNE = 10;
const infoCollocamento = document.querySelector('.info');
const ruotaBtn = document.getElementById('rotate');


let turnoUmano = true; // Per evitare i doppi click
let statoRuotaNave = 'orizzontale';

let giocatore1 = Player(1);
let bot = Player(2);

let infoNave = document.getElementById('dimensioniNave');
aggiornaInfoNaveDOM ();

bot.autoPosizionamentoNavi();
makeGridDOM(bot);
makeGridDOM(giocatore1);
tavoloBot.style.pointerEvents = 'none'; //disattivo il tavolo del bot

let caselleGriglia = document.querySelectorAll('.casellaGiocatore');
let caselleGrigliaBot = document.querySelectorAll('.casellaBot');

aggiungiEventoInserisciNaveAdOgniCasella(caselleGriglia); // Aggiunge la possibilità di collocare la nave in quella casella qualora le restrizioni vengano rispettate.
previewCollacamentoNavi(caselleGriglia); // Per visualizzare una preview della nave nella griglia e se la sua eventuale posizione sia valida o meno.
gestioneAttaccoCaselleBot(caselleGrigliaBot); // Aggiunge l'evento attacco alle caselle della griglia del Bot.

function aggiornaInfoNaveDOM () {
    if (giocatore1.naviDisponibili[0]) {
        infoNave.textContent = `Nave\u00A0\u00A0 di\u00A0\u00A0 dimensione:\u00A0\u00A0 ${giocatore1.naviDisponibili[giocatore1.naviDisponibili.length - 1].length}`;
    }
}

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

function aggiungiEventoInserisciNaveAdOgniCasella (caselle) {
    caselle.forEach( casella => {
        casella.addEventListener('click', event =>  aggiungiEventoCasellaInserisciNave(event, casella));
    });
}

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
            aggiornaInfoNaveDOM();
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

function previewCollacamentoNavi (caselle) {
    caselle.forEach(casella => {
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

                if (quadrato) {
                    quadrato.classList.add(classeAggiunta);
                }
            }
        });
    });
}

function gestioneAttaccoCaselleBot (caselleBot) {
    caselleBot.forEach(casella => {
        casella.addEventListener('click', () => {
            let riga = parseInt(casella.getAttribute('data-row'));
            let colonna = parseInt(casella.getAttribute('data-col'));
            
            if(bot.tabella.griglia[riga][colonna].status != 'miss' && bot.tabella.griglia[riga][colonna].status != 'hit') {
                bot.tabella.receiveAttack(riga, colonna);
                aggiornaTabella(casella,riga,colonna, bot);
                if(bot.tabella.areAllShipsSunk()) {
                    gestisciVittoria('HUMAN');
                } else {
                    turnoUmano= false;
                    gestisciClicElementoTavolo();
                }
            }
        });
    });
}

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
            turnoUmano = true;
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
    nomeVincitore.textContent = `${stringaVincitore}\u00A0\u00A0 WINS!`;
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
        makeGridDOM(giocatore1);
        let caselleGriglia = document.querySelectorAll('.casellaGiocatore');
        let caselleGrigliaBot = document.querySelectorAll('.casellaBot');

        aggiornaInfoNaveDOM ();
        aggiungiEventoInserisciNaveAdOgniCasella(caselleGriglia);
        previewCollacamentoNavi(caselleGriglia);
        gestioneAttaccoCaselleBot(caselleGrigliaBot);
    });

}

ruotaBtn.addEventListener('click',  () => {
    if(statoRuotaNave === 'orizzontale') {
        statoRuotaNave = 'verticale';
    } else {
        statoRuotaNave = 'orizzontale';
    }
});
