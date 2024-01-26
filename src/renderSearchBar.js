import { getSearchAutofillResults } from "./weatherAPIController";

export default function renderSearchBar() {
  const searchbar = document.querySelector(".searchbar");
  const autofillOptionList = document.querySelector(
    ".searchbar__autofill-options-list",
  );
  const submitSearchButton = document.querySelector("button");

  searchbar.addEventListener("input", async () => {
    if (searchbar.value === "") {
      return;
    }
    submitSearchButton.textContent = "O";
    const autofillOptions = await getSearchAutofillResults(searchbar.value);
    submitSearchButton.textContent = "[]";
    autofillOptionList.textContent = "";
    if (autofillOptions.length > 0) {
      autofillOptions.forEach((autofillOption) => {
        const cityName = autofillOption.name;
        const { region } = autofillOption;
        const locationID = autofillOption.id;
        const autofillOptionInfo = `${cityName}, ${region}, ${locationID} \n`;
        autofillOptionList.textContent += autofillOptionInfo;
      });
    }
  });
}
