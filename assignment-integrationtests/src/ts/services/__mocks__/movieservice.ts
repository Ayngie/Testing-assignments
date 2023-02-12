import { IMovie } from "../../models/Movie";

/* I denna fil har vi vårt låtsas axios-anrop */

export const mockData: IMovie[] = [
  //Exporterad variabel, kan användas i alla test denna mockfil importeras till.
  {
    Title: "Gone with the Wind (Mock)",
    imdbID: "tt0031381",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYjUyZWZkM2UtMzYxYy00ZmQ3LWFmZTQtOGE2YjBkNjA3YWZlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    Year: "1939",
  },
  {
    Title: "Guardians of the Galaxy (Mock)",
    imdbID: "tt2015381",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZTkwZjU3MTctMGExMi00YjU5LTgwMDMtOWNkZDRlZjQ4NmZhXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
    Year: "2014",
  },
];

export const getData = async (Searchtext: string): Promise<IMovie[]> => {
  return new Promise((resolve, reject) => {
    //måste ta emot ett löfte eftersom det är vad funktionen levererar.
    if (Searchtext !== "") {
      //om användaren inte skriver in tom string"".
      if ("Gone with the Wind") {
        //om sökresultat finns.
        resolve(mockData); //vi ska få en mockad lista tillbaka. Den kan vi ju dra in som en variabel om vi skapat den.
      } else {
        resolve([]); //inget resultat fanns, skicka tillbaka en tom lista.
      }
    } else {
      //vi får ett fel.
      reject("Du måste ange ett sökord");
    }
  });
};

// export const getData = async () => {
//   //en funktion som vi exporterar i denna modul.
//   return new Promise((resolve) => {
//     resolve(mockData);
//   });
// };
