import { inizializzaGriglia , Ship , Gameboard, Player} from "./sandbox";


test('creazione Ship' , () => {
  const nave = Ship(5);

    expect(nave).toEqual({
      hit : expect.any(Function) ,
      isSunk : expect.any(Function),
      length: 5,
      receivedHit : 0,
      isSunked : false,
      
    });
  nave.hit();
  expect(nave.receivedHit).toBe(1);
});

test('test hitting the ship' , () => {
  const nave = Ship(5);
  nave.hit();
  expect(nave.receivedHit).toBe(1);
});

test('test is the ship sunken? No' , () => {
  const nave = Ship(5);
  nave.hit();
  nave.hit();
  nave.isSunk();
  expect(nave.isSunked).toBe(false);
});

test('test is the ship sunken? yes' , () => {
  const nave = Ship(5);
  for(let i=0; i < nave.length; i++) {
    nave.hit();
  }
  nave.isSunk();
  expect(nave.isSunked).toBe(true);
});

test('inizializza griglia' , () => {
  let griglia = inizializzaGriglia()
  expect(griglia[0][0].status).toBe('empty');
});

test('inizializza griglia 2' , () => {
  let griglia = inizializzaGriglia()
  expect(griglia[2][2].status).toBe('empty');
});

test('creazione oggetto gameboard' , () => {
    const tabella = Gameboard()
    expect(tabella).toEqual({
    areAllShipsSunk: expect.any(Function) ,
    dimensioneGriglia: 10,
    griglia: [
      [
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          }
      ],
      [
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          }
      ],
      [
          {
              "status": "empty",
              "shipPart": null
          },
          {
            "status": "empty",
            "shipPart": null
          },
          {
            "status": "empty",
            "shipPart": null
          },
          {
            "status": "empty",
            "shipPart": null
          },
          {
            "status": "empty",
            "shipPart": null
          },
          {
            "status": "empty",
            "shipPart": null
          },
          {
            "status": "empty",
            "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          }
      ],
      [
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          }
      ],
      [
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          }
      ],
      [
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          }
      ],
      [
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          }
      ],
      [
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          }
      ],
      [
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          }
      ],
      [
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          },
          {
              "status": "empty",
              "shipPart": null
          }
      ]
  ],
    pezziDiNavi: 0,
    placeShip : expect.any(Function) ,
    posizionamentoGrigliaValido : expect.any(Function) ,
    receiveAttack : expect.any(Function) ,
    sovrapposizioneNaviValido : expect.any(Function) ,
  });
});

test('posizionamento nave valido' , () => {
  const nave = Ship(5);
  const tabella = Gameboard();
  tabella.placeShip (nave, 2, 2,  'orizzontale');
  for(let i=2; i < 7; i++) {
    expect(tabella.griglia[2][i].status).toBe('ship');
  };
});

test('posizionamento nave NON valido' , () => {
  const nave = Ship(5);
  const tabella = Gameboard();
  expect(tabella.placeShip (nave, 8, 8,  'orizzontale')).toBe('Posizionamento non valido');
});

test('posizionamento nave NON valido sovraopposizione' , () => {
    const nave = Ship(5);
    const barca = Ship(3);
    const tabella = Gameboard();
    tabella.placeShip (nave, 2, 3,  'orizzontale')
    expect(tabella.placeShip (barca, 1, 3,  'verticale')).toBe('Posizionamento non valido');
});

test('test receiveAttack' , () => {
  const nave = Ship(5);
  const tabella = Gameboard();
  tabella.placeShip (nave, 2, 3,  'orizzontale')
  tabella.receiveAttack(2,3);
  expect(tabella.griglia[2][3].status).toBe('hit');
});

test('test affonda una nave' , () => {
    const nave = Ship(3);
    const tabella = Gameboard();
    tabella.placeShip (nave, 2, 2,  'orizzontale')
    tabella.receiveAttack(2,2);
    tabella.receiveAttack(2,3);
    tabella.receiveAttack(2,4);
    expect(nave.isSunk()).toBe(true);
  });

  test('test affonda tutte le navi' , () => {
    const zattera = Ship(1);
    const peschereccio = Ship(2)
    const tabella = Gameboard();
    tabella.placeShip (zattera, 2, 2,  'orizzontale')
    tabella.placeShip (peschereccio, 3, 3,  'orizzontale')
    tabella.receiveAttack(2,2);
    tabella.receiveAttack(3,3);
    tabella.receiveAttack(3,4);
    expect(tabella.areAllShipsSunk()).toBe(true);
  });

  test('crea un oggetto player ed attacca una nave' , () => {
    const peschereccio = Ship(2)
    const giocatore = Player();
    //giocatore.autoPosizionamentoNavi();
    giocatore.tabella.placeShip (peschereccio, 0, 0,  'orizzontale');
    giocatore.tabella.receiveAttack(0,0);
    expect(giocatore.tabella.griglia[0][0].status).toBe('hit');
  });