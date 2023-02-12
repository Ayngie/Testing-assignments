import { IMovie } from "./models/Movie";
import { getData } from "./services/movieservice";

let movies: IMovie[] = [];

export const init = () => {
  let form = document.getElementById("searchForm") as HTMLFormElement;
  form.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();
    exports.handleSubmit();
  });
};

export async function handleSubmit() {
  //ska skicka tillbaka ett promise, kommer ha datatyp void om funktionen är asynkron o inte skickar tillbaka ngt - vanligt m funktioner som denna som ska sätta igång saker.
  let searchText = (document.getElementById("searchText") as HTMLInputElement)
    .value; //hämtar värdet i inputtagen, gör en variabel av det.

  let container: HTMLDivElement = document.getElementById(
    "movie-container"
  ) as HTMLDivElement; //hämtar diven för att skriva ut sökresultat i.
  container.innerHTML = ""; //tömmer diven så det ej ska bli dubbelt upp.

  try {
    movies = await getData(searchText);

    if (movies.length > 0) {
      exports.createHtml(movies, container);
    } else {
      exports.displayNoResult(container);
    }
  } catch {
    exports.displayNoResult(container);
  }
}

export const createHtml = (movies: IMovie[], container: HTMLDivElement) => {
  for (let i = 0; i < movies.length; i++) {
    let movie = document.createElement("div");
    let title = document.createElement("h3");
    let img = document.createElement("img");

    movie.classList.add("movie");
    title.innerHTML = movies[i].Title;
    img.src = movies[i].Poster;
    img.alt = movies[i].Title;

    movie.appendChild(title);
    movie.appendChild(img);

    container.appendChild(movie);
  }
};

export const displayNoResult = (container: HTMLDivElement) => {
  let noMessage = document.createElement("p");

  noMessage.innerHTML = "Inga sökresultat att visa";

  container.appendChild(noMessage);
};
