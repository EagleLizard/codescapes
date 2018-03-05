
module.exports = carFactory;

class Car{
  constructor(chassis){
    this.chassis = chassis;
  }

  getWheels(){
    return this.chassis.wheels;
  }

  getEngine(){
    return this.chassis.engine;
  }
}

class Chassis{
  constructor(numWheels, strength){
    this.numWheels = numWheels;
    this.strength = strength;
    this.wheels = Array(this.numWheels).fill(null);
    this.engine = null;
  }

  addWheels(wheelCtor){
    this.wheels = this.wheels.map(v=>new wheelCtor());
  }

  addEngine(engineCtor){
    this.engine = new engineCtor();
  }
}

class Engine{
  constructor(cylinders, displacement, horsepower){
    this.cylinders = cylinders;
    this.displacement = displacement;
    this.horsepower = horsepower;
  }
}

class Wheel{
  constructor(diameter, width){
    this.diameter = diameter;
    this.width = width;
  }
}

class SedanWheel extends Wheel{
  constructor(){
    super(16, 6.5);
  }
}

class SedanEngine extends Engine{
  constructor(){
    super(4, 1.8, 132);
  }
}

class SedanChassis extends Chassis{
  constructor(){
    super(4, 50);
    this.addEngine(SedanEngine);
    this.addWheels(SedanWheel);
  }
}

class Corolla extends Car{
  constructor(){
    super(new SedanChassis());
  }
}

function carFactory(type){
  switch(type){
    case 'Corolla':
      return new Corolla();
  }
}