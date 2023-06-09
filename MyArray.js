"use strict";

class MyArray {
  constructor(...elements) {
    this.length = 0;
    this.push(...elements);
  }

  reverse() {
    /*
      1. если массив пустой выйдем
      2. запомним копию старого массива
      3. запишем старые значения на новых индексах
    */

    if (this.length === 0) {
      return;
    }

    const copyMyArray = this.map((x) => x);

    let n = 0;
    for (let i = copyMyArray.length - 1; i >= 0; i--) {
      this[n] = copyMyArray[i];
      n++;
    }
  }

  foreach(callBack, thisArg) {
    let newCallBack = callBack;
    if (thisArg !== undefined) {
      newCallBack = callBack.bind(thisArg);
    }

    for (let i = 0; i < this.length; i++) {
      newCallBack(this[i], i, this);
    }
  }

  map(callBack, thisArg) {
    let newCallBack = callBack;
    if (thisArg !== undefined) {
      newCallBack = callBack.bind(thisArg);
    }
    const newMyArray = new MyArray();
    for (let i = 0; i < this.length; i++) {
      newMyArray.push(newCallBack(this[i], i, this));
    }
    return newMyArray;
  }

  filter(callBack, thisArg) {
    let newCallBack = callBack;
    if (thisArg !== undefined) {
      newCallBack = callBack.bind(thisArg);
    }

    const newMyArray = new MyArray();
    for (let i = 0; i < this.length; i++) {
      if (newCallBack(this[i], i, this)) {
        newMyArray.push(this[i]);
      }
    }
    return newMyArray;
  }

  static isMyArray(obj) {
    return obj instanceof MyArray;
  }

  shift() {
    /*
      1. если массив пустой вернем undefined
      2. запомним удаляемый элемент
      3. запомним копию старого
      4. удаляем первое свойство 
      5. удаляем последнее свойство 
      6. запишем старые значения начиная со второго на новых индексах
      7. вернуть удаляемый элемент
    */

    if (this.length === 0) {
      return undefined;
    }

    const deletedElem = this[0];

    const copyMyArray = this.map((x) => x);

    delete this[0];
    delete this[this.length - 1];

    for (let i = 1; i < copyMyArray.length; i++) {
      this[i] = copyMyArray[i];
    }

    this.length--;

    return deletedElem;
  }

  unshift(...elements) {
    /*
      1. нужно принять неограниченное количество значений
      2. если на входе пусто, возвращаем старую длину
      3. запоминаем старый размер массива
      4. запоминаем размер на входе, он же сдвиг
      5. запомним копию старого массива
      6. запишем новые значения в начало 
      7. запишем старые значения со сдвигом
      8. посчетаем новую длину равную старый размер плюс размер сдвига и запишем
      9. возвращаем новую длину 
    */

    if (elements.length === 0) {
      return this.length;
    }

    const oldLength = this.length;
    const shiftIndex = elements.length;
    const copyMyArray = this.map((x) => x);
    elements.forEach((x, i) => (this[i] = x));

    for (let i = 0; i < copyMyArray.length; i++) {
      this[shiftIndex + i] = copyMyArray[i];
    }

    this.length = oldLength + shiftIndex;

    return this.length;
  }

  push(...elements) {
    /*
      1. нужно принять неограниченное количество значений
      2. для каждого входящего параметра функции:
        2.1 создаем в массиве новый элемент с индексом, равным старому значению длины массива
        2.2 кладем туда входящее значение
        2.3 увеличиваем значение длины массива
        2.4 повторяем пункты 2.1 - 2.3 до тех пор пока не закончатся входные параметры
      3. возвращаем новую дину массива
    */

    for (let i = 0; i < elements.length; i++) {
      this[this.length] = elements[i];
      this.length++;
    }

    return this.length;
  }

  pop() {
    /*
      1. если массив пустой (длина = 0) 
        1.1 вернуть undefined
      2. если массив не пустой:
        2.1 сохранить удаляемый элемент
        2.2 удаляем последнее свойство 
        2.3 уменшить длину на 1
        2.4 вернуть удаляемый элемент
    */

    if (this.length === 0) {
      return undefined;
    }

    const deletedElem = this[this.length - 1];

    delete this[this.length - 1];

    this.length--;

    return deletedElem;
  }
}

const myArr = new MyArray(40, 53, 46);

// function plus(value, index, arr) {
//   return value + 1;
// }
// myArr.foreach((x) => console.log(x));
// const fArr = myArr.filter((x)=>x>10);
