/**
 * @jest-environment jsdom
 */

import { getData } from "../services/movieservice";
import { IMovie } from "../models/Movie";
import { mockData } from "../services/__mocks__/movieservice";
import { test, expect, describe, jest } from "@jest/globals";
import axios from "axios";

// jest.mock("axios", () => ({
//   get: async () => {
//     //här i vår fake axios ska vi skapa det som ska skickas tillbaka - vi vill ha använda en funktion som heter get - och async
//     return new Promise((resolve) => {
//       resolve({ data: { Search: mockData } }); //Vi vill ha data.Search inne i data (data.data.Search) och då skriver vi så här. Total results kan man jobba med på exakt samma sätt, då lägger vi istället i det häri, istället för Search.
//     });
//   },
// }));

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>; //skapar en variabel som innehåller ett mockat axios-anrop.
console.log(typeof mockAxios);

/*  test:  */
describe("getData", () => {
  test("should get mockData", async () => {
    console.log("test:should get mockData");

    //Arrange
    //Vår data tar inte emot ngra argument, därför blir arrange TOM!
    //Det finns inga variable el dyl som den kräver för att kunna fungera. Den tar inte emot någonting.
    //På ett sätt kan vi säga att koden i roten här i filen är som vår arrange, för där arrangerar vi ju på ett sätt vår testData.
    //
    //Act
    //Här däremot, så ska vi anropa getData.
    mockAxios.get.mockResolvedValue({ data: { Search: mockData } }); //säger till min variabel mockAxios (som är ett mockAxios-anrop), att hämta mockResolvedData.
    let result: IMovie[] = await getData("mockad sökväg / sökväg till API:et"); //anropar vår funktion, anropet kommer dock att hijackas av vår mock.
    //
    //Assert
    //om allt funkar kan vi nu anta att:
    expect(result.length).toBe(mockData.length);
    //Om vi vill vara extra säkra på att det stämmer, så kan vi gå in o titta på det första objektet o se så datan överensstämmer m vår testdata:
    //expect(result[0].bus).toBe(117);
    //lägg till så mga expect ni behöver för att vara trygga med vad ni får för info tillbaka.
  });

  test("should not get mockData", async () => {
    console.log("test:should not get mockData");

    //Arrange
    //Act
    mockAxios.get.mockRejectedValue({ data: { Search: mockData } });
    let result: IMovie[] = await getData("../services/movieservice.ts");

    //Assert
    expect(result.length).toBe(0);
    expect(result).toStrictEqual([]);
  });
});
