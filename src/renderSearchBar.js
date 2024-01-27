import { getSearchAutofillResults } from "./weatherAPIController";

/**
 * Creates an HTML element representing a search autofill option.
 * @param {string} cityName - The name of the city.
 * @param {string} region - The region associated with the city.
 * @param {string} country - The country associated with the city.
 * @param {string} locationID - The unique identifier for the location.
 * @returns {HTMLLIElement} A list item (li) HTML element representing the search autofill option.
 */
function createAutofillOptionHtmlElement(
  cityName,
  region,
  country,
  locationID,
) {
  // Create Element
  const optionElement = document.createElement("li");
  optionElement.classList.add("autofill-options-list__option");
  optionElement.id = locationID;
  optionElement.textContent = `${cityName}, ${region}, ${country}`;

  // Add mousedown listener to change background color to selected state
  optionElement.addEventListener("mousedown", () => {
    optionElement.style.backgroundColor = "#3a3a3c";
  });
  return optionElement;
}

/**
 * Populates the search autofill options list with HTML elements based on the provided array of option objects.
 * @param {Array} autofillOptions - An array of objects representing search autofill options.
 * @returns {void}
 */
function populateAutoFillOptionsList(autofillOptions) {
  const autofillOptionList = document.querySelector(
    ".searchbar__autofill-options-list",
  );
  autofillOptions.forEach((autofillOption) => {
    // Get option properties
    const cityName = autofillOption.name;
    const { region } = autofillOption;
    const { country } = autofillOption;
    const locationID = autofillOption.id;

    // Create option HTML element
    const autofillOptionElement = createAutofillOptionHtmlElement(
      cityName,
      region,
      country,
      locationID,
    );

    // Append element to list
    autofillOptionList.append(autofillOptionElement);
  });
}

/**
 * Renders the search autofill options list by setting its display property to "flex".
 */
function renderAutofillOptionList() {
  const autofillOptionList = document.querySelector(
    ".searchbar__autofill-options-list",
  );
  autofillOptionList.style.display = "flex";
}

/**
 * Hides the autofill options list by setting its display property to "none".
 */
function hideAutofillOptionList() {
  const autofillOptionList = document.querySelector(
    ".searchbar__autofill-options-list",
  );
  autofillOptionList.style.display = "none";
}

/**
 * Clears the content of the search autofill options list by removing all HTML elements within it.
 */
function clearAutoFillOptionsList() {
  const autofillOptionList = document.querySelector(
    ".searchbar__autofill-options-list",
  );
  autofillOptionList.innerHTML = "";
}

/**
 * Clears the content of the search bar, hides the search autofill options list,
 * and clears the content of the search autofill options list.
 */
function clearSearchBar() {
  const searchbar = document.querySelector(".location-search-form__searchbar");

  // Clear search bar
  searchbar.value = "";

  // Reset autofill option list UI
  hideAutofillOptionList();
  clearAutoFillOptionsList();
}

/**
 * Renders the clear search bar button, making it visible and adding a click event listener
 * to trigger the clearing of the search bar content.
 */
function renderClearSearchbarBtn() {
  const clearSearchBarBtn = document.querySelector(
    ".searchbar__clear-searchbar-btn",
  );

  // Display button
  clearSearchBarBtn.style.display = "inline-block";

  // Add click listener to clear search bar on click
  clearSearchBarBtn.addEventListener("click", (e) => {
    // Prevent form submission
    e.preventDefault();
    clearSearchBar();
  });
}

/**
 * Hides the clear search bar button by setting its display property to "none".
 */
function hideClearSearchbarBtn() {
  const clearSearchBarBtn = document.querySelector(
    ".searchbar__clear-searchbar-btn",
  );
  clearSearchBarBtn.style.display = "none";
}

/**
 * Sets the box shadow of the location search form based on the specified type.
 * @param {string} type - The type of box shadow to apply ("black", "transparent", or "none").
 */
function setFormBoxShadow(type) {
  const form = document.querySelector(".location-search-form");
  if (type === "black") {
    form.style.boxShadow = "0px 0px 0px 10000px rgba(0,0,0)";
    return;
  }

  if (type === "transparent") {
    form.style.boxShadow = "0px 0px 0px 10000px rgba(0,0,0, 0.8)";
  }

  if (type === "none") {
    form.style.boxShadow = "none";
  }
}

/**
 * Removes the cancel search button from the header if it exists.
 */
function removeCancelSearchBtn() {
  const cancelSearchBtn = document.querySelector(".header__cancel-search-btn");
  if (cancelSearchBtn !== null) {
    cancelSearchBtn.remove();
  }
}

/**
 * Cancels the ongoing search, resetting UI states and clearing the search bar.
 */
function cancelSearch() {
  setFormBoxShadow("none");
  removeCancelSearchBtn();
  clearAutoFillOptionsList();
  hideAutofillOptionList();
  clearSearchBar();
  hideClearSearchbarBtn();
}

/**
 * Renders the cancel search button in the header, adding necessary styles and event listeners.
 * Clicking the button cancels the search, resets UI states, and clears the search bar.
 */
function renderCancelSearchBtn() {
  // Create button element
  const header = document.querySelector(".header");
  const cancelSearchBtn = document.createElement("button");
  cancelSearchBtn.classList.add("header__cancel-search-btn");
  cancelSearchBtn.textContent = "Cancel";

  // Add button click listener
  cancelSearchBtn.addEventListener("click", cancelSearch);

  // Append button
  header.append(cancelSearchBtn);
}

/**
 * Adds event listeners to the search bar to handle focus and input events.
 * Updates UI states based on user interactions with the search bar.
 */
export default function addSearchbarEvents() {
  const searchbar = document.querySelector(".location-search-form__searchbar");

  /**
   * Handles the focus event on the search bar.
   * Updates UI states when the search bar gains focus.
   */
  searchbar.addEventListener("focus", () => {
    if (searchbar.value === "") {
      setFormBoxShadow("transparent");
      removeCancelSearchBtn();
      renderCancelSearchBtn();
    }
  });

  /**
   * Handles the input event on the search bar.
   * Updates UI states based on the input value and triggers autofill options retrieval.
   */
  searchbar.addEventListener("input", async () => {
    const searchValue = searchbar.value;
    // Change background color and reset autofill option list if searchbar is empty
    if (searchValue === "") {
      setFormBoxShadow("transparent");
      hideClearSearchbarBtn();
      hideAutofillOptionList();
      clearAutoFillOptionsList();
      return;
    }

    // Change background color and populate autofill option list if searchbar is not empty
    if (searchValue !== "") {
      setFormBoxShadow("black");
      hideAutofillOptionList();
      renderClearSearchbarBtn();
      const autofillOptions = await getSearchAutofillResults(searchValue);
      clearAutoFillOptionsList();
      if (autofillOptions.length > 0) {
        populateAutoFillOptionsList(autofillOptions);
        renderAutofillOptionList();
      }
    }
  });
}
