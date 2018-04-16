import "babel-polyfill";
import "./app.sass";

class Rectangle {
  constructor(hauteur, largeur) {
    this.hauteur = hauteur;
    this.largeur = largeur;
  }
 
  get area() {
    return this.calcArea();
  }

  calcArea() {
    return this.largeur * this.hauteur;
  }
}

const carre = new Rectangle(10, 10);

console.log(carre.area);
