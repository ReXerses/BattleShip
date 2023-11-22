import { hit , Ship} from "./sandbox";


test('creazione Ship' , () => {
    expect(Ship(5)).toEqual({
      hit : expect.any(Function) ,
      isSunk : expect.any(Function),
      length: 5,
      receivedHit : 0,
      isSunked : false,
      
    });
});

//jest.spyOn(Ship, 'hit').mockReturnValue('1');
/*test('hitting the Ship' , () => {
    expect(hit()).toBe(1);
});*/