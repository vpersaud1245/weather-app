import { showSkeletonLoadingScreen } from "../service/loadingScreenService";
import { getSearchAutofillResults } from "./weatherAPIController";
import { renderWeatherDashboard } from "./weatherDashboardController";
import resetWeatherDashboard from "../service/weatherDashboardService";

/*
  ----- UI HELPER FUNCTIONS -----
*/
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
    form.style.boxShadow = "0px 0px 0px 10000px rgb(0,0,0)";
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
  const form = document.querySelector(".location-search-form");
  form.style.width = "100%";
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
  cancelSearchBtn.addEventListener("click", () => {
    cancelSearch();
  });

  // Append button
  header.append(cancelSearchBtn);
}

/**
 * Highlights the matching portion of the search bar input in the autofill option.
 * @param {HTMLElement} optionElement - The HTML element representing the autofill option.
 * @param {string} optionText - The text content of the autofill option.
 */
function highlightAutofillText(optionElement, optionText) {
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

/**
 * Creates an HTML element representing a search autofill option and configures event listeners for interaction.
 * When clicked, the option triggers the display of the weather dashboard for the selected location.
 * @param {string} cityName - The name of the city.
 * @param {string} region - The region associated with the city.
 * @param {string} country - The country associated with the city.
 * @param {string} locationURL - The unique URL identifier for the location.
 * @returns {HTMLLIElement} A list item (li) HTML element representing the search autofill option.
 */
function createAutofillOptionHtmlElement(
  cityName,
  region,
  country,
  locationURL,
) {
  // Create Element
  const optionElement = document.createElement("li");
  optionElement.classList.add("autofill-options-list__option");
  optionElement.id = locationURL;
  const optionText = `${cityName}, ${region}, ${country}`;
  highlightAutofillText(optionElement, optionText);

  // Add mousedown listener to change background color to selected state
  optionElement.addEventListener("mousedown", () => {
    optionElement.style.backgroundColor = "#3a3a3c";
  });

  // Add click listener to render weather forecast for selected location
  optionElement.addEventListener("click", () => {
    cancelSearch();
    resetWeatherDashboard();
    showSkeletonLoadingScreen();
    renderWeatherDashboard(cityName, locationURL);
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
    const locationURL = autofillOption.url;

    // Create option HTML element
    const autofillOptionElement = createAutofillOptionHtmlElement(
      cityName,
      region,
      country,
      locationURL,
    );

    // Append element to list
    autofillOptionList.append(autofillOptionElement);
  });
}

/*
  ----- ADD SEARCHBAR EVENTS -----
*/
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
  searchbar.addEventListener("focus", async () => {
    if (searchbar.value === "") {
      setFormBoxShadow("transparent");
      // Set searchbar width
      const form = document.querySelector(".location-search-form");
      form.style.width = "87%";
      form.addEventListener("transitionend", renderCancelSearchBtn);
    }
  });

  /**
   * Removes the event listener that renders the cancel button
   * on the end of a form transition
   */
  searchbar.addEventListener("blur", () => {
    const form = document.querySelector(".location-search-form");
    form.removeEventListener("transitionend", renderCancelSearchBtn);
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
