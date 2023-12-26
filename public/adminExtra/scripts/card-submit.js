document
  .getElementById("confirmBtn")
  .addEventListener("click", function (event) {
    // Call a function to get data from input fields
    gatherAndPrintFormData(event);
  });

async function gatherAndPrintFormData(event) {
  event.preventDefault();
  // Create an object to store form data
  var formDataObject = {};

  // Get values from individual form elements by ID
  formDataObject.name = document.getElementById("cardName").value;
  formDataObject.id = document.getElementById("cardID").value;
  formDataObject.isActive = document.getElementById("isActive").value;
  formDataObject.setId = document.getElementById("setID").value;
  formDataObject.rarity = document.getElementById("cardRarity").value;

  // Types
  var selectedTypes = [];
  document
    .querySelectorAll('input[name="type[]"]:checked')
    .forEach(function (checkbox) {
      selectedTypes.push(checkbox.value);
    });
  formDataObject.types = selectedTypes;

  // Subtypes
  var selectedSubtypes = [];
  document
    .querySelectorAll('input[name="subtypes[]"]:checked')
    .forEach(function (checkbox) {
      selectedSubtypes.push(checkbox.value);
    });
  formDataObject.subtypes = selectedSubtypes;

  formDataObject.supertype = document.getElementById("superType").value;
  formDataObject.marketPrices = document.getElementById("price").value;
  formDataObject.amount = document.getElementById("amount").value;

  formDataObject.updatedAt = GetCurrentDate();

  // Add timestamp with the Unix timestamp of the current time
  formDataObject.timestamp = Date.now();
  formDataObject.image = GetFile();
  //formDataObject.image = await GetInputImage();
  // Log the form data object to the console
  console.log(formDataObject);
  //Post it here
  PostData(formDataObject);
}

function PostData(formDataObject) {
  formData = ToFormData(formDataObject);
  fetch("/admin/card/upload", {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function GetCurrentDate() {
  var currentDate = new Date();

  var formattedDateString = `${currentDate.getUTCFullYear()}/${(
    currentDate.getUTCMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${currentDate
    .getUTCDate()
    .toString()
    .padStart(2, "0")} ${currentDate
    .getUTCHours()
    .toString()
    .padStart(2, "0")}:${currentDate
    .getUTCMinutes()
    .toString()
    .padStart(2, "0")}:${currentDate
    .getUTCSeconds()
    .toString()
    .padStart(2, "0")}`;

  // Replace '/' with ' ' to match the format "YYYY/MM/DD HH:mm:ss"
  formattedDateString = formattedDateString.replace(/\,/g, "");
  return formattedDateString;
}

async function GetInputImage() {
  return new Promise((resolve) => {
    var fileInput = document.getElementById("fileInput");

    if (fileInput.files.length > 0) {
      var file = fileInput.files[0];
      var reader = new FileReader();

      // Set up the FileReader to read the image
      reader.onload = function (e) {
        // Save the image data to an object with the name "image"
        var imageData = e.target.result;
        // Resolve the Promise with the image data
        resolve(imageData);
      };

      // Wait for the image to load before returning
      reader.readAsDataURL(file);
    } else {
      // If no file is selected, resolve the Promise with null
      resolve(null);
    }
  });
}
function GetFile() {
  var fileInput = document.getElementById("fileInput");

  if (fileInput.files.length > 0) {
    var file = fileInput.files[0];
    return file;
  } else {
    return null;
  }
}

function ToFormData(item) {
  var form_data = new FormData();

  for (var key in item) {
    form_data.append(key, item[key]);
  }

  return form_data;
}
