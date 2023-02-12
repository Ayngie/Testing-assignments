import { addTodo, changeTodo, removeAllTodos } from "../ts/functions";
import { IAddResponse } from "../ts/models/IAddResult";
import { Todo } from "../ts/models/Todo";

import { test, expect, describe } from "@jest/globals"; //kan lägga in det som använd i denna testfil.

describe("addTodo", () => {
  test("should add todo if text is more than two characters", () => {
    //test för att testa funktion addTodo's if-sats.
    //arrange
    let testInput: string = "Äpplen";
    let testList: Todo[] = [];

    //act
    let result: IAddResponse = addTodo(testInput, testList); //IAddResponse innehåller 2 egenskaper: success: boolean, error: string;

    //assert
    expect(result.success).toBe(true);
    expect(result.error).toBe("");
  });

  test("should not add todo if text is less than two characters", () => {
    //test för att testa funktion addTodo's else-sats.
    //arrange
    let testInput: string = "Äp";
    let testList: Todo[] = [];

    //act
    let result: IAddResponse = addTodo(testInput, testList); //IAddResponse innehåller 2 egenskaper...

    //assert
    expect(result.success).toBe(false); //Kollar båda interfacets egenskaper - obs!
    expect(result.error).toBe("Du måste ange minst tre bokstäver"); //Kollar båda interfacets egenskaper - obs!
  });
});

test("should toggle todo", () => {
  //test för att testa funktion changeTodo
  //arrange
  let testTodo: Todo = new Todo("testText", true); //skapa variabel som är en simulering av en todo som

  //act
  changeTodo(testTodo);

  //assert
  expect(testTodo.done).toBe(false); //Kollar boolean-egenskapen - obs!
});

test("should remove all todos", () => {
  //test för att testa funktion removeAllTodos
  //arrange
  let testList: Todo[] = [
    new Todo("Äpplen", true),
    new Todo("Smör", true),
    new Todo("Mjölk", true),
  ]; //skapa variabel som är en simulering av en todolista som ska rensas.

  //act
  removeAllTodos(testList); //Då denna ska vara void behöver vi inte fånga någonting här :)

  //assert
  expect(testList.length).toBe(0);
});
