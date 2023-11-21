import { hit , Ship} from "./sandbox";


test('creazione Ship' , () => {
    expect(Ship(5)).toEqual({
      /*hit () {
        this.receivedHit += 1;
      },
      isSunk () {
        return (this.length === this.receivedHit) ? true : false;
      },*/
      length: 5,
      receivedHit : 0,
      isSunked : false,
      
    });
});

/*test('hitting the Ship' , () => {
    expect(hit()).toBe(1);
});*/