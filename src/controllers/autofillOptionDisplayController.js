/**
 * Renders the search autofill options list by setting its display property to "flex".
 */
export function renderAutofillOptionList() {
  const autofillOptionList = document.querySelector(
    ".searchbar__autofill-options-list",
  );
  autofillOptionList.style.display = "flex";
}

/**
 * Hides the autofill options list by setting its display property to "none".
 */
export function hideAutofillOptionList() {
  const autofillOptionList = document.querySelector(
    ".searchbar__autofill-options-list",
  );
  autofillOptionList.style.display = "none";
}

/**
 * Clears the content of the search autofill options list by removing all HTML elements within it.
 */
export function clearAutoFillOptionsList() {
  const autofillOptionList = document.querySelector(
    ".searchbar__autofill-options-list",
  );
  autofillOptionList.innerHTML = "";
}

/**
 * Highlights the matching portion of the search bar input in the autofill option.
 * @param {HTMLElement} optionElement - The HTML element representing the autofill option.
 * @param {string} optionText - The text content of the autofill option.
 */
export function highlightAutofillText(optionElement, optionText) {
  // Get searchBar value to be used in option element highlighting
  const searchBar = document.querySelector(".location-search-form__searchbar");
  const searchBarValue = searchBar.value;

  // Find starting index where searchBar value is the same as option
  const colorChangeStart = optionText
    .toLowerCase()
    .indexOf(searchBarValue.toLowerCase());

  const optionTextSplit = optionText.split("");

  // Add characters to option element
  for (let i = 0; i < optionText.length; i += 1) {
    const optionElementChar = document.createElement("span");
    optionElementChar.classList.add("option__char");
    optionElementChar.textContent = optionTextSplit[i];
    // Highlight search bar value in option text by applying classes
    if (i >= colorChangeStart && i < colorChangeStart + searchBarValue.length) {
      optionElementChar.classList.add("white");
    }
    optionElement.appendChild(optionElementChar);
  }
}

export function renderNoResultsFound() {
  const noResultsFound = document.createElement("li");
  noResultsFound.classList.add("autofill-options-list__option");
  noResultsFound.classList.add("autofill-options-list__option--no-results");
  noResultsFound.textContent = "No results found";
  clearAutoFillOptionsList();
  const autofillOptionsList = document.querySelector(
    ".searchbar__autofill-options-list",
  );
  autofillOptionsList.appendChild(noResultsFound);
  renderAutofillOptionList();
}
