/**
 * @jest-environment jsdom
 */

import * as mainFunctions from "../ts/main";
import * as functions from "../ts/functions";
import { Todo } from "../ts/models/Todo";
import { test, expect, describe } from "@jest/globals"; //kan även lägga in describe här, om använder i test.
import { IAddResponse } from "../ts/models/IAddResult";

describe("createNewTodo", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("should call function addTodo and set result.success = true", () => {
    //test av första delen av denna funktion test av första delen av denna funktion där addTodo ska anropas.
    //arrange
    document.body.innerHTML = ` <ul id="todos" class="todo"></ul> `; //simulerar vår UL i html
    let testText: string = "Mjölk";
    let testList: Todo[] = [];
    let result: IAddResponse = functions.addTodo(testText, testList);
    let spy = jest.spyOn(functions, "addTodo").mockReturnValue(result); //vi vill inte testa funktionen som anropas här, bara se att anropet sker.

    //act
    mainFunctions.createNewTodo(testText, testList);

    //assert
    expect(result.success).toBe(true);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("should call function createHtml", () => {
    //test av if-satsen
    //arrrange
    let testText: string = "Mjölk";
    let testList: Todo[] = [];
    let spy = jest.spyOn(mainFunctions, "createHtml").mockReturnValue();

    //act
    mainFunctions.createNewTodo(testText, testList);

    //assert
    expect(spy).toHaveBeenCalled();
  });

  test("should call function displayError", () => {
    //test av else-satsen
    //arrrange
    document.body.innerHTML = ` <div id="error" class="error"></div> `; //simulerar vår div i html där error meddelande ska skrivas ut.
    let testText: string = "Mj";
    let testList: Todo[] = [];
    let result: IAddResponse = functions.addTodo(testText, testList);
    let spy = jest.spyOn(mainFunctions, "displayError").mockReturnValue();

    //act
    mainFunctions.createNewTodo(testText, testList);

    //assert
    expect(result.success).toBe(false);
    expect(spy).toHaveBeenCalled();
  });
});

describe("displayError", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("should show error message", () => {
    //testar att errormeddelandet läggs in i diven för detta i html.
    //arrange
    document.body.innerHTML = ` <div id="error" class="error"></div> `; //simulerar vår div i html där error meddelande ska skrivas ut.
    let errorContainer: HTMLDivElement = document.getElementById(
      "error"
    ) as HTMLDivElement;
    let testText: string = "Mj";
    let testList: Todo[] = [];
    let result: IAddResponse = functions.addTodo(testText, testList);

    //act
    mainFunctions.displayError(result.error, true);

    //assert
    expect(errorContainer.innerHTML).toBe("Du måste ange minst tre bokstäver");
  });

  test("should add classlist 'show'", () => {
    //testar if-satsen
    //arrange
    document.body.innerHTML = ` <div id="error" class="error"></div> `; //simulerar vår div i html där error meddelande ska skrivas ut.
    let errorContainer: HTMLDivElement = document.getElementById(
      "error"
    ) as HTMLDivElement;
    let testText: string = "Mj";
    let testList: Todo[] = [];
    let result: IAddResponse = functions.addTodo(testText, testList);

    //act
    mainFunctions.displayError(result.error, true);

    //assert
    expect(errorContainer.classList.value).toContain("show");
  });

  test("should remove classlist 'show'", () => {
    //testar else-satsen
    //arrange
    document.body.innerHTML = ` <div id="error" class="error"></div> `; //simulerar vår div i html där error meddelande ska skrivas ut.
    let errorContainer: HTMLDivElement = document.getElementById(
      "error"
    ) as HTMLDivElement;
    let testText: string = "Mj";
    let testList: Todo[] = [];
    let result: IAddResponse = functions.addTodo(testText, testList);

    //act
    mainFunctions.displayError(result.error, false);

    //assert
    expect((errorContainer.classList.value = "show")).toBeFalsy;
  });
});

describe("IAddResponse", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("should have properties of interface", () => {
    //test av interfacet IAddResponse
    //arrange // act
    let testObject: IAddResponse = { success: true, error: "felmeddelande" };
    //assert
    expect(testObject.success).toBe(true);
    expect(testObject.error).toBe("felmeddelande");
  });
});

describe("toggleToDo", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("should call function changeTodo", () => {
    //testar första anropet inuti denna funktion
    //arrange
    document.body.innerHTML = ` <ul id="todos" class="todo"></ul> `; //simulerar vår UL i html där li:s ska läggas in.
    let testTodo: Todo = { text: "Mjölk", done: false };
    let spy = jest.spyOn(functions, "changeTodo").mockReturnValue(); //vi vill inte testa funktionen som anropas här, bara se att anropet sker.
    let wrongSpy = jest.spyOn(mainFunctions, "createHtml").mockReturnValue(); //vi vill inte testa funktionen som anropas här, bara se att anropet sker.

    //act
    mainFunctions.toggleTodo(testTodo);

    //assert
    expect(spy).toHaveBeenCalled();
    expect(wrongSpy).toHaveBeenCalled();
  });

  test("should call function createHtml", () => {
    //testar andra anropet inuti denna funktion
    //arrange
    document.body.innerHTML = ` <ul id="todos" class="todo"></ul> `; //simulerar vår UL i html där li:s ska läggas in.
    let testTodo: Todo = { text: "Mjölk", done: false };
    let spy = jest.spyOn(mainFunctions, "createHtml").mockReturnValue(); //vi vill inte testa funktionen som anropas här, bara se att anropet sker.
    let wrongSpy = jest.spyOn(functions, "changeTodo").mockReturnValue(); //vi vill inte testa funktionen som anropas här, bara se att anropet sker.

    //act
    mainFunctions.toggleTodo(testTodo);

    //assert
    expect(spy).toHaveBeenCalled();
    expect(wrongSpy).toHaveBeenCalled();
  });
});

describe("clearTodos", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("should call function removeAllTodos", () => {
    //testar första anropet i denna funktion.
    //arrange
    let testList: Todo[] = [
      { text: "Mjölk", done: true },
      { text: "Ägg", done: true },
    ];
    let spy = jest.spyOn(functions, "removeAllTodos").mockReturnValue(); //vi vill inte testa funktionen som anropas här, bara se att anropet sker.
    let wrongSpy = jest.spyOn(mainFunctions, "createHtml").mockReturnValue(); //vi vill inte testa funktionen som anropas här, bara se att anropet sker.

    //act
    mainFunctions.clearTodos(testList);

    //assert
    expect(spy).toHaveBeenCalled();
    expect(wrongSpy).toHaveBeenCalled();
  });

  test("should call function createHtml", () => {
    //testar första anropet i denna funktion.
    //arrange
    let testList: Todo[] = [
      { text: "Mjölk", done: true },
      { text: "Ägg", done: true },
    ];
    let wrongSpy = jest.spyOn(functions, "removeAllTodos").mockReturnValue(); //vi vill inte testa funktionen som anropas här, bara se att anropet sker.
    let spy = jest.spyOn(mainFunctions, "createHtml").mockReturnValue(); //vi vill inte testa funktionen som anropas här, bara se att anropet sker.

    //act
    mainFunctions.clearTodos(testList);

    //assert
    expect(spy).toHaveBeenCalled();
    expect(wrongSpy).toHaveBeenCalled();
  });
});

describe("init", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("should sort todolist in alphabetic order", () => {
    //arrange
    let testList: Todo[] = [
      { text: "Ananas", done: true },
      { text: "Ananas", done: true }, //en g till för att kolla === delen i andra ifen
      { text: "Smör", done: true },
      { text: "Bakpulver", done: true },
    ];
    //act
    mainFunctions.sortToDoListByABC(testList);
    //assert
    expect(testList[0].text).toBe("Ananas");
    expect(testList[2].text).toBe("Bakpulver");
    expect(testList[3].text).toBe("Smör");
  });

  test("should sort todolist by boolean order (true values first)", () => {
    //arrange
    let testList: Todo[] = [
      { text: "Ananas", done: false },
      { text: "Smör", done: true },
      { text: "Äpplen", done: true },
      { text: "Bakpulver", done: false },
    ];
    //act
    mainFunctions.sortToDoListByDone(testList);
    //assert
    expect(testList[0].done).toBe(false);
    expect(testList[1].done).toBe(false);
    expect(testList[2].done).toBe(true);
    expect(testList[3].done).toBe(true);
  });

  test("should be able to submit form/click", () => {
    //arrange
    let testList: Todo[] = [];
    document.body.innerHTML = `
    <form id="newTodoForm">
    <div>
      <input type="text" id="newTodoText"/>
      <button id="clickBtn">Skapa</button>
    </div>
  </form>
    `; //skapar innerHTML - så att vi kan lyssna på submit på formuläret, som triggas av klick på knappen.
    mainFunctions.init(); //anropar init för att där finns vår addEventListener.
    let spy = jest.spyOn(mainFunctions, "createNewTodo").mockReturnValue(); //lyssnar efter anrop på createNewTodo, som ska anropas vid submit av userInput.

    //act
    (document.getElementById("newTodoText") as HTMLInputElement).value =
      "Peppar"; //simulerar att användaren har skrivit in peppar
    document.getElementById("clickBtn")?.click(); //simulerar klickknapp på vår button som triggar formuläret vi lyssnar på (klicket "vandrar uppåt" till vår addEventListener på formuläret).

    //assert
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith("Peppar", testList);
  });
});
