document.getElementById("confirmBtn").addEventListener("click", function () {
  // Call a function to get data from input fields
  getDataFromFields();
});

document
  .getElementById("subTypesDropdown")
  .addEventListener("change", function (event) {
    event.stopPropagation();
  });
document
  .getElementById("subTypesDropdown")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });

document.addEventListener("DOMContentLoaded", async function () {
  UpdateSubTypeSelect();
  UpdateTypeSelect();
});

function getDataFromFields() {
  // Retrieve data from input fields
  const cardName = document.getElementById("cardName").value;
  const cardID = document.getElementById("cardID").value;
  const setID = document.getElementById("setID").value;
  const cardRarity = document.getElementById("cardRarity").value;
  const type = document.getElementById("type").value;
  const price = document.getElementById("price").value;
  const amount = document.getElementById("amount").value;

  // Retrieve selected supertypes
  const supertypes = [];
  const supertypeCheckboxes = document.querySelectorAll(
    'input[name="supertypes[]"]:checked'
  );
  supertypeCheckboxes.forEach(function (checkbox) {
    supertypes.push(checkbox.value);
  });

  // Create an object with the collected data
  const formData = {
    cardName: cardName,
    cardID: cardID,
    setID: setID,
    cardRarity: cardRarity,
    type: type,
    supertypes: supertypes,
    price: price,
    amount: amount,
  };

  // Log the data to the console (you can replace this with your desired action)
  console.log(formData);
  // You can now send this data to your server or perform other actions with it
}

function UpdateTypeSelect() {
  const typesDropdown = document.getElementById("typesDropdown");
  const checkboxes = document.querySelectorAll('input[name="type[]"]');

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", updateSelectedTypes);
  });

  function updateSelectedTypes() {
    const selectedTypes = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    let displayedText =
      selectedTypes.length > 0 ? selectedTypes.join(", ") : "Select Types";

    // Truncate text with "..." if it's too long
    const maxLength = 20; // Adjust the maximum length as needed
    if (displayedText.length > maxLength) {
      displayedText = displayedText.substring(0, maxLength) + "...";
    }

    typesDropdown.innerText = displayedText;
  }

  updateSelectedTypes();
}

function UpdateSubTypeSelect() {
  const subTypesDropdown = document.getElementById("subTypesDropdown");
  const checkboxes = document.querySelectorAll('input[name="subtypes[]"]');

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", updateSelectedSubtypes);
  });

  function updateSelectedSubtypes() {
    const selectedSubtypes = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    let displayedText =
      selectedSubtypes.length > 0
        ? selectedSubtypes.join(", ")
        : "Select Subtypes";

    // Truncate text with "..." if it's too long
    const maxLength = 20; // Adjust the maximum length as needed
    if (displayedText.length > maxLength) {
      displayedText = displayedText.substring(0, maxLength) + "...";
    }

    subTypesDropdown.innerText = displayedText;
  }
  updateSelectedSubtypes();
}
