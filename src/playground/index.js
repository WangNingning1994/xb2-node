class Car {
  constructor(engine) {
    this.engine = engine;
    console.log('一辆崭新的汽车');
  }

  engine;
}

const c1 = new Car('V8');
const c2 = new Car('V12');

class PickUpTruck extends Car {

}

const c3 = new PickUpTruck('V12');

console.log(c1);
console.log(c2);

console.log(c3);