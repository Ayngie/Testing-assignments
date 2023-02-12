/**
 *@jest-environment jsdom
 */

import { addTodo, changeTodo, removeAllTodos } from "./functions"; //import av dessa tre functions.
import { Todo } from "./models/Todo"; //import av klassen Todo.

window.onload = function () {
  //INTE SATT NGN EXPORT HÄR - BLEV RÖTT DÅ!
  init();
  createHtml(todos); //Vid uppstart: anropa funktionen (här i main.ts) för att skicka listan till local storage, samt skapa html. listan (från ) ska skapas upp vid uppstart av sidan?
};

let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
//listan av todos hämtas från localStorage.

export function init() {
  //should upon submit/click clear the todos [], then send userinputvalue + todos[] to function createNewTodo.
  document.getElementById("clearTodos")?.addEventListener("click", () => {
    exports.clearTodos(todos); //anropar funktionen (här i main.ts).
  }); //hämtar knappen för att rensa listan och lyssnar efter klicket, om klick -> anropar funktion clearTodos.

  document.getElementById("btn-sort-ABC")?.addEventListener("click", () => {
    exports.sortToDoListByABC(todos);
  }); //hämtar knappen för att sortera listitems i alfabetisk ordning, lyssnar på den, för att vid klick ->anropa funktion sortTodoList.

  document.getElementById("btn-sort-boolean")?.addEventListener("click", () => {
    exports.sortToDoListByDone(todos);
  }); //hämtar knappen för att sortera listitems beroende på boolean done true / false, lyssnar på den, för att vid klick ->anropa funktion sortTodoList.

  (document.getElementById("newTodoForm") as HTMLFormElement)?.addEventListener(
    "submit",
    //lyssnar på formuläret, lyssnar på klick = vid click->triggas formuläret/submit.
    //(det räcker med att lyssna på fomuläret, det är buttonklicket som "vandrar uppåt" och triggar vår submit som vi lyssnar på på vår form (det sker precis efter klicket)).
    //vid klick/submit ->anropas nedan anonyma funktion (och e skickas med!).
    (e: SubmitEvent) => {
      e.preventDefault(); //prevent default (förhindrar att formuläret töms).
      /* normalt vid skicka formulär - skickar tillbaka till vår sida o allt töms. NU vill vi själva bestämma vad som ska hända istället! 
      Vi vill preventDefault! Skriver därför in även e.preventDefault(); */

      /* När vi anropar den anonyma funktionen av addEventListener får vi med annan info vi inte har pratat om ännu. 
      Vi brukar kalla det för e eller event, denna parameter är ett objekt som är själva händelsen som precis inträffade. 
      Objektet e har funktionalitet kopplat till sig, iom bygger på en klass (iom det är ett objekt i typescript). 
      Vilken klass? Vi måste skriva datatypen. 
      Detta är en inbyggd parameter som baseras på den händelse vi lyssnar efter. 
      Just nu lyssnar vi på en submithändelse. Detta är i detta fall därför ngt som heter ett submitEvent!
      Vi behöver skriva inom () på anonyma funktionen efter addEventListener (e: SubmitEvent) */

      let todoText: string = (
        document.getElementById("newTodoText") as HTMLInputElement
      ).value; //hämtar vår inputtag och skapar en variabel av dess värde.
      console.log("Todos when creating", todos);

      exports.createNewTodo(todoText, todos); //anropar funktionen (här i main.ts) för att skapa ny todo samt skickar med inputvärdet todoText samt listan todos [].

      (document.getElementById("newTodoText") as HTMLFormElement).value = ""; //rensa input efter användaren slagit enter / skapa.
    }
  );
}

export function sortToDoListByABC(todos: Todo[]) {
  todos.sort((a, b) => {
    if (a.text.toLowerCase() < b.text.toLowerCase()) {
      return -1;
    }

    if (a.text.toLowerCase() === b.text.toLowerCase()) {
      return 0;
    } else {
      return +1;
    }
  });

  createHtml(todos);
}

export function sortToDoListByDone(todos: Todo[]) {
  todos.sort((a, b) => Number(a.done) - Number(b.done)); //true values first. //Convert the 2 boolean values to numbers, subtract the first number from the second. Now the sort method will sort by boolean property.

  console.log(todos);
  createHtml(todos);
}

export function createNewTodo(todoText: string, todos: Todo[]) {
  //should recieve inputvalue + todos [] and call + send these on to function addTodo - and get a result --> if result is a success - call on function createHtml and send along todos[], else if result is error - call on function displayError.
  let result = addTodo(todoText, todos); //ny variabel result fångar in resultatet av anrop av funktion addTodo (i functions.ts) - till vilken vi skickar med inputvärdet todoText samt listan todos []).

  if (result.success) {
    //om resultatet var att det blev en ny todo skapad - kör denna kod:
    exports.createHtml(todos); //anropar funktion (här i main.ts)
  } else {
    //om det EJ blev en ny todo skapad - kör denna kod:
    exports.displayError(result.error, true); //anropa funktion (här i main.ts) för att display errormeddelande och skicka med att den är true.
  }
}

export function createHtml(todos: Todo[]) {
  //funktion för att skicka listan till local storage, samt skapa html.
  localStorage.setItem("todos", JSON.stringify(todos)); //gör om todos [] till string och lägg in i localStorage.

  let todosContainer: HTMLUListElement = document.getElementById(
    "todos"
  ) as HTMLUListElement; //hämta ul för todos att läggas in i.

  todosContainer.innerHTML = ""; //rensa ul

  for (let i = 0; i < todos.length; i++) {
    let li: HTMLLIElement = document.createElement("li"); //skapa variabel för li:s.

    if (todos[i].done) {
      //if true, kör denna kod.
      li.classList.add("todo__text--done");
    } //slut på if.

    li.classList.add("todo__text"); //lägg på klass för styling.
    li.innerHTML = todos[i].text; // lägg in värden i innerHTML.
    li.addEventListener("click", () => {
      //lyssna på klick för att toggla boolean.
      exports.toggleTodo(todos[i]); //anropa funktion (här i main.ts) vid klick, samt skicka med värdet av den todo användaren klickade på.
    });

    todosContainer.appendChild(li); //lägg in li i ul så de syns i vår HTML.
  }
}

export function toggleTodo(todo: Todo) {
  //anropar funktioner för att toggla boolean på todo, samt anropar direkt efter createHtml för att uppdatera listan.
  changeTodo(todo); //anropar denna funktion (i functions.ts) som kommer att toggla boolean.
  exports.createHtml(todos); //anropa funktion (här i main.ts) och skicka med listan.
}

export function displayError(error: string, show: boolean) {
  //funktion för att visa felmeddelande.
  let errorContainer: HTMLDivElement = document.getElementById(
    "error"
  ) as HTMLDivElement; //hämta container för felmedd.

  errorContainer.innerHTML = error; //lägg in felmeddelande (error kommer från vår importerade funktion addTodo
  //(FRÅGA: right??))

  if (show) {
    //om boolean för error (show) är true (error är true, errormeddelande ska visas), kör denna kod:
    errorContainer.classList.add("show"); //klass för styling: display:block,
  } else {
    //om boolean för error (show) är false (error är false, errormeddelande ska EJ visas), kör denna kod:
    errorContainer.classList.remove("show");
  }
}

export function clearTodos(todos: Todo[]) {
  removeAllTodos(todos); //anropar funktion removeAllTodos (i functions.ts) och skickar med listan todos []. //(removeAllTodos kommer i sin tur rensa listan).
  exports.createHtml(todos); //anropar funktion createHtml (här i main.ts) och skickar med listan todos []. //(createHtml kommer i sin tur skicka listan till local storage, samt skapa html).
}
