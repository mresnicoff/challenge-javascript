// ----- IMPORTANTE -----

// IMPORTANTE!: Para este checkpoint se les brindarán las
// implementaciones ya realizadas en las homeworks de
// Queue, LinkedList y BinarySearchTree.
// Sobre dichas implementaciónes van a tener que agregar nuevos
// métodos o construir determinadas funciones explicados más abajo.
// Pero todos los métodos ya implementados en las homeowrks no es
// necesario que los vuelvan a definir.

const { Queue, LinkedList, Node, BinarySearchTree } = require("./DS.js");

// ----- Closures -----

// EJERCICIO 1
// Implementar la funcion 'exponencial' que recibe un parametro entero 'exp'
// y retorna una una funcion, nos referiremos a esta ultima como funcion hija,
// y a 'exponencial' como la funcion padre, la funcion hija debe de recibir
// un parametro y retornar dicho parametro elevado al parametro 'exp' de
// la funcion padre original 'exponencial'
// Ejemplo:
// > var sqrt = exponencial(2);
// > sqrt(2);
// < 4
// > sqrt(3);
// < 9
// > sqrt(4);
// < 16

function exponencial(exp) {
  function hija(x) {
    return Math.pow(x, exp);
  }

  return hija;
}

// ----- Recursión -----

// EJERCICIO 2
// Crear la funcion 'direcciones':
// La funcion debe retornar un string de los movimientos Norte(N), Sur(S), Este(E), Oeste(O)
// que se deben realizar, para llegar al destino de un laberinto dado.
//
// Ejemplo: dado el siguiente laberinto:
// let laberintoExample = { // direccion = ""
//     N: 'pared',
//     S: { // direccion = "S"
//         N: 'pared',
//         S: 'pared',
//         E: { // direccion = "SE"
//             N: 'destino', // direccion = "SEN"
//             S: 'pared',
//             E: 'pared',
//             O: 'pared'
//         },
//         O: { // direccion = "SO"
//             N: 'pared',
//             S: 'pared',
//             E: 'pared',
//             O: 'pared'
//         }
//     },
//     E: 'pared',
//     O: 'pared'
// }
// El retorno de la funcion 'direcciones' debe ser 'SEN', ya que el destino se encuentra
// haciendo los movimientos SUR->ESTE->NORTE
// Aclaraciones: el segundo parametro que recibe la funcion ('direccion') puede ser pasado vacio (null)
function direcciones(laberinto) {
  if (typeof laberinto === "undefined") {
    return "";
  }
  var direcciones = ["N", "S", "E", "O"];
  var direccion = "";

  var temp = laberinto;

  var a = 0;
  do {
    for (var i = 0; i < 4; i++) {
      console.log(i);

      if (typeof temp[direcciones[i]] == "object") {
        temp = temp[direcciones[i]];

        direccion = direccion + direcciones[i];
        console.log(direccion);
        break;
      }

      if (temp[direcciones[i]] == "destino") {
        return direccion + direcciones[i];
      }
    }
    if (i == 4) {
      return "";
    }
  } while (a == 0);
}

// EJERCICIO 3
// Crea la funcion 'deepEqualArrays':
// Dado que las comparaciones en javascript aveces son un problema como con el siguiente ejemplo:
// [0,1,2] === [0,1,2] => false // puede probarlo en la consola
// con objetos o arrays identicos surge la necesidad de comparar en 'profundidad' arrays u objetos
// en este caso la funcion solo va a ser pensada para recibir arrays,
// pero estos pueden tener multiples niveles de anidacion, y la funcion deepEqualArrays debe
// comparar cada elemento, sin importar la profundidad en la que este
// Ejemplos:
// deepEqualArrays([0,1,2], [0,1,2]) => true
// deepEqualArrays([0,1,2], [0,1,2,3]) => false
// deepEqualArrays([0,1,[[0,1,2],1,2]], [0,1,[[0,1,2],1,2]]) => true

function deepEqualArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (typeof arr1[i] !== typeof arr2[i]) {
      return false;
    }
    if (typeof arr1[i] == "number") {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    if (!deepEqualArrays(arr1[i], arr2[i])) {
      return false;
    }
  }
  return true;
}

// ----- LinkedList -----

// Deben completar la siguiente implementacion 'OrderedLinkedList'(OLL)
// que es muy similar a las LinkedList vistas en clase solo que
// los metodos son distintos y deben de estar pensados para conservar la lista
// ordenada de mayor a menor.
// ejemplos:
// head --> 5 --> 3 --> 2 --> null
// head --> 4 --> 3 --> 1 --> null
// head --> 9 --> 3 --> -1 --> null
// Las dos clases principales ya van a estar implementadas a continuacion:
function OrderedLinkedList() {
  this._length = 0;
  this.head = null;
}
// notar que Node esta implementado en el archivo DS

// Y el metodo print que permite visualizar la lista:
OrderedLinkedList.prototype.print = function () {
  let print = "head";
  let pointer = this.head;
  while (pointer) {
    print += " --> " + pointer.value;
    pointer = pointer.next;
  }
  print += " --> null";
  return print;
};

// EJERCICIO 4
// Crea el metodo 'add' que debe agregar nodos a la OLL de forma que la misma se conserve ordenada:
// Ejemplo:
// > LL.print()
// < 'head --> null'
// > LL.add(1)
// > LL.print()
// < 'head --> 1 --> null'
//    2       c
// > LL.add(5)
// > LL.print()
// < 'head --> 5 --> 1 --> null'
// > LL.add(4)
// > LL.print()
// < 'head --> 5 --> 3 --> 1 --> null'
//               4

OrderedLinkedList.prototype.add = function (val) {
  let newNode = new Node(val);
  if (!this.head) {
    this.head = newNode;
  } else {
    let pointer = this.head;
    let previous = null;
    while (pointer && pointer.value > val) {
      previous = pointer;
      pointer = pointer.next;
    }
    if (previous) {
      previous.next = newNode;
      newNode.next = pointer;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }
};

// EJERCICIO 5
// Crea el metodo 'removeHigher' que deve devolver el valor mas alto de la linked list
// removiendo su nodo corresponidente:
// Ejemplo:
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'
// > LL.removeHigher()
// < 5
// > LL.removeHigher()
// < 4
// > LL.removeHigher()
// < 1
// > LL.removeHigher()
// < null

OrderedLinkedList.prototype.removeHigher = function () {
  if (this.head == null) {
    return null;
  }
  var temps2 = this.head.value;

  temp = this.head.next;
  this.hed = null;
  this.head = temp;
  return temps2;
};

// EJERCICIO 6
// Crea el metodo 'removeLower' que deve devolver el valor mas bajo de la linked list
// removiendo su nodo corresponidente:
// Ejemplo:
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'
// > LL.removeHigher()
// < 1
// > LL.removeHigher()
// < 4
// > LL.removeHigher()
// < 5
// > LL.removeHigher()
// < null

OrderedLinkedList.prototype.removeLower = function () {
  if (!this.head) {
    return null;
  }
  if (!this.head.next) {
    temp = this.head.value;
    this.head = null;
    return temp;
  }
  temp = this.head;
  while (temp.next) {
    prev = temp;
    temp = temp.next;
  }
  temp = temp.value;
  prev.next = null;
  return temp;
};

// ----- QUEUE -----

// EJERCICIO 7
// Implementar la funcion multiCallbacks:
// la funcion multiCallbacks recibe dos arrays de objetos cuyas propiedades son dos,
// 'cb' que es una funcion, y 'time' que es el tiempo estimado de ejecucion de dicha funcion
// este ultimo representado con un integer como se muestra acontinuacion:
// let cbsExample = [
//     {cb:function(){}, time: 2},
//     {cb:function(){}, time: 3}
// ]
// De manera que lo que nuestra funcion 'multiCallbacks' debe de ir ejecutando las funciones
// sin pasarle parametros pero debe ir alternando las funciones de cbs1 y cbs2
// segun cual de estas se estima que tarde menos, retornando un arreglo de resultados
// de las mismas en el orden que fueron ejecutadas
// Ejemplo:
// > let cbs1 = [
//       {cb:function(){return '1-1'}, time: 2},
//       {cb:function(){return '1-2'}, time: 3}
//   ];
// > let cbs2 = [
//       {cb:function(){return '2-1'}, time: 1},
//       {cb:function(){return '2-2'}, time: 4}
//   ];
// > multiCallbacks(cbs1, cbs2);
// < ["2-1", "1-1", "1-2", "2-2"];

let arr = []
        const cbs1 = [
            {cb:()=>(arr.push('1-1'),'1-1'), time: 2},
            {cb:()=>(arr.push('1-2'),'1-2'), time: 3}
        ];
        const cbs2 = [
            {cb:()=>(arr.push('2-1'),'2-1'), time: 1},
            {cb:()=>(arr.push('2-2'),'2-2'), time: 4}
        ];

function multiCallbacks(cbs1, cbs2){
    let i=0
    let j=0
    let orden=[]
    let resultados=[]
while( i<cbs1.length && j<cbs2.length){
    if(cbs1[i].time<cbs2[j].time) {orden.push(cbs1[i])
i=i+1}
else {orden.push(cbs2[j])
j=j+1}}
if (i==cbs1.length){
for(let z=j;z<cbs2.length;z++){
    orden.push(cbs2[z])}}
    else{for(let z=i;z<cbs1.leng;z++){
        orden.push(cbs1[z])}}
        console.log(orden.length)
for (let w=0; w<orden.length;w++){


resultados.push(orden[w].cb())
}
return resultados
}
console.log(multiCallbacks(cbs1, cbs2))

// ----- BST -----

// EJERCICIO 8
// Implementar el metodo 'toArray' en el prototype del BinarySearchTree
// que devuelva los valores del arbol en una array ordenado
// Ejemplo:
//     32
//    /  \
//   8   64
//  / \
// 5   9
// resultado:[5,8,9,32,64]

BinarySearchTree.prototype.toArray = function () {
  lista = [];
  ordenar = function (root) {
    if (root !== null) {
      ordenar(root.right);
      lista.push(root.value);
      ordenar(root.left);
    }
  };
  root = this;

  ordenar(root);
  return lista;
};

// ----- Algoritmos -----

// Ejercicio 9
// Implementar la funcion 'primalityTest' que dado un valor numerico entero
// debe de retornar true or false dependiendo de si este es primo o no.
// Puede que este es un algoritmo que ya hayan implementado pero entenderan
// que es un algoritmo que segun la implementacion puede llegar a ser muy costoso
// para numeros demasiado grandes, asi que vamos a implementarlo mediante un metodo
// derivado de Trial Division como el que se muestra aca:
// https://en.wikipedia.org/wiki/Primality_test
// Si bien esta no es la mejor implementacion existente, con que uds puedan
// informarse sobre algoritmos, leerlos de un pseudocodigo e implemnterlos alcanzara

function primalityTest(n) {
  if (num == 2 || num == 3) return true;
  if (num <= 1 || num % 2 == 0 || num % 3 == 0) return false;
  for (let i = 5; i * i <= num; i += 6)
    if (num % i == 0 || num % (i + 2) == 0) return false;
  return true;
}

// EJERCICIO 10
// Implementa el algoritmo conocido como 'quickSort', que dado un arreglo de elemntos
// retorn el mismo ordenado de 'mayor a menor!'
// https://en.wikipedia.org/wiki/Quicksort

function quickSort(arr) {
  if (arr.length <= 1) {
    return Arr;
  }

  const pivot = arr[arr.length - 1];
  const leftArr = [];
  const rightArr = [];

  for (let i = 0; i < arr.length - 1; i++) {
    arr[i] < pivot ? rightArr.push(arr[i]) : leftArr.push(arr[i]);
  }

  return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
}

// QuickSort ya lo conocen solo que este
// ordena de mayor a menor
// para esto hay que unir como right+mid+left o cambiar el
// signo menor en la comparacion con el pivot

// ----- EXTRA CREDIT -----

// EJERCICIO 11
// Implementa la función 'reverse', que recibe un numero entero como parametro
// e invierte el mismo.
// Pero Debería hacer esto sin convertir el número introducido en una cadena, o un array
// Ejemplo:
// > reverse(123);
// < 321
// > reverse(95823);
// < 32859

function reverse(num) {}
// la grandiosa resolucion de Wilson!!!
// declaran una variable donde
// almacenar el el numero invertido
// y van multiplicando por 10 la
// porcion del numero que ya invirtieron
// deforma que esta se corra hacia la izq
// para agregar el ultimo numero de la
// porcion no revertida
// y luego le quitan a la porcion
// no revertida el ultimo numero

module.exports = {
  exponencial,
  direcciones,
  deepEqualArrays,
  OrderedLinkedList,
  multiCallbacks,
  primalityTest,
  quickSort,
  reverse,
  Queue,
  LinkedList,
  Node,
  BinarySearchTree,
};
