import { IAddResponse } from "./models/IAddResult"; //import av interface (med egenskaperna success samt error) som importeras för att användas i vår funktion addTodo.
import { Todo } from "./models/Todo"; //import av function Todo.

export function addTodo(todoText: string, todos: Todo[]): IAddResponse {
  //return kommer ha datatyp: IAddResponse //KAN MAN BARA TILLDELA DATATYP SÅ HÄR?!
  if (todoText.length > 2) {
    //om texten i input är minst 3 tecken, kör denna kod.
    let newTodo = new Todo(todoText, false); //skapar nytt objekt från vår importerade klass Todo.
    todos.push(newTodo); //pushar in den nya todon på listan todos [].
    return { success: true, error: "" }; //IAddRespons interfacets egenskaper används här: return ändrar success till true. // andra egenskapen error ska vara med men används inte här...
  } else {
    //om texten i input är max 2 tecken, kör denna kod.
    return { success: false, error: "Du måste ange minst tre bokstäver" }; //IAddRespons interfacets egenskaper används här: sucess = false, samt error = felmedd...
  }
}

export function changeTodo(todo: Todo) {
  //toggla boolean.
  todo.done = !todo.done;
}

export function removeAllTodos(todos: Todo[]) {
  //funktion för att rensa listan.
  todos.splice(0, todos.length); //ta bort alla positioner från hela listan.
}
