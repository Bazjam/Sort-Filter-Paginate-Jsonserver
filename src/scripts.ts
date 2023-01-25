import axios from "axios";

type Countries = {
  name: string;
  code: string;
  capital: string;
  region: string;

  currency: {
    code: string;
    name: string;
    symbol: string;
  };

  language: {
    code: string;
    name: string;
  };

  flag: string;
  dialling_code: string;
  isoCode: string;
};

const inputOne = document.querySelector<HTMLInputElement>("[data-input-one]");
const inputTwo = document.querySelector<HTMLInputElement>("[data-input-two]");
const inputThree =
  document.querySelector<HTMLInputElement>("[data-input-three]");
const inputFour = document.querySelector<HTMLInputElement>("[data-input-four]");

const columnOne = document.querySelector("[data-column-one]");
const dataWrapper = document.querySelector("[data-wrapper]");

const searchBtn = document.querySelector("[data-search-btn]");

searchBtn.addEventListener("click", function () {
  dataWrapper.innerHTML = "";
  const countryName = inputOne.value;
  const countryCode = inputTwo.value;
  const countryCapital = inputThree.value;
  const countryRegion = inputFour.value;

  getNewSortData(
    `http://localhost:3000/countries?name_like=${countryName}&code_like=${countryCode}&region_like=${countryCapital}&region_like=${countryRegion}`
  );
});

//-----------------START PAGE---------------------------------
document.addEventListener("DOMContentLoaded", function () {
  getNewSortData(getDataUrl);
});

//-----------------BTN SORT BY NAME---------------------------------
const getSortedByName = "http://localhost:3000/countries?_sort=name&_order=asc";
const sortBtnName = document.querySelector("[data-btn-sort-name]");

sortBtnName.addEventListener("click", function () {
  dataWrapper.innerHTML = "";
  getNewSortData(getSortedByName);
});

//-----------------BTN SORT BY CODE---------------------------------
const getSortedByCode = "http://localhost:3000/countries?_sort=code&_order=asc";
const sortBtnCode = document.querySelector("[data-btn-sort-code]");

sortBtnCode.addEventListener("click", function () {
  dataWrapper.innerHTML = "";
  getNewSortData(getSortedByCode);
});

//-----------------BTN SORT BY CAPITAL---------------------------------
const getSortedByCapital =
  "http://localhost:3000/countries?_sort=capital&_order=asc";
const sortBtnCapital = document.querySelector("[data-btn-sort-capital]");

sortBtnCapital.addEventListener("click", function () {
  dataWrapper.innerHTML = "";
  getNewSortData(getSortedByCapital);
});

//-----------------BTN SORT BY REGION---------------------------------
const getSortedByRegion =
  "http://localhost:3000/countries?_sort=region&_order=asc";
const sortBtnRegion = document.querySelector("[data-btn-sort-region]");

sortBtnRegion.addEventListener("click", function () {
  dataWrapper.innerHTML = "";
  getNewSortData(getSortedByRegion);
});

const getDataUrl = "http://localhost:3000/countries";

const getNewSortData = (url: string) => {
  axios.get<Countries[]>(url).then(({ data }) => {
    data.forEach((element) => {
      const row = document.createElement("div");
      row.classList.add("row");

      const firstColumn = document.createElement("span");
      firstColumn.classList.add("cell");
      firstColumn.innerHTML = `${element.name}`;

      const secondColumn = document.createElement("span");
      secondColumn.classList.add("cell");
      secondColumn.innerHTML = `${element.code}`;

      const thirdColumn = document.createElement("span");
      thirdColumn.classList.add("cell");
      thirdColumn.innerHTML = `${element.capital}`;

      const fourthColumn = document.createElement("span");
      fourthColumn.classList.add("cell");
      fourthColumn.innerHTML = `${element.region}`;

      row.append(firstColumn, secondColumn, thirdColumn, fourthColumn);

      dataWrapper.append(row);
    });
  });
};
