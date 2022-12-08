// Save the URL
let color_url =
  "https://acs2909.lusciousorange.com/colors.php?passcode=candy!&username=islam-m89";

function init() {
  let form = document.getElementById("color_form");
  // handle the event
  form.addEventListener("submit", processFormSubmit);
}

function processFormSubmit(event) {
  event.preventDefault();
  let choosedColor = document.getElementById("color_selector");
  if (choosedColor.value === "random") {
    // process XHR request
    let xhr = new XMLHttpRequest();
    processXHR(xhr);
    return;
  }

  // Get selected color with color name
  let selectBox = document.getElementById("color_selector");
  for (const singleColor of selectBox.options) {
    if (singleColor.value === choosedColor.value) {
      // Create 200x200 swatchBox
      createNewSwatchBox(singleColor.value, singleColor.innerText);
      // Set select position to 0
      selectBox.selectedIndex = 0;
      return;
    }
  }
}

function processXHR(xhr) {
  // Open XHR request
  xhr.open("GET", color_url);
  xhr.send();

  // Hanlde XHR response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let response = JSON.parse(xhr.response);
      // Get Select options
      let selectBox = document.getElementById("color_selector");

      for (const singleColor of selectBox.options) {
        if (singleColor.value === response.code) {
          // Select color
          singleColor.selected = true;

          // Create 200x200 swatchBox
          createNewSwatchBox(response.code, response.name);
          return;
        }
      }
      addColorToSelect(response.code, response.name);
    }
  };
}

function addColorToSelect(color_code, color_name) {
  let selectBox = document.getElementById("color_selector");
  let option = document.createElement("option");
  option.value = color_code;
  option.text = color_name;
  selectBox.appendChild(option);
  selectBox.selectedIndex = selectBox.options.length - 1;
  createNewSwatchBox(color_code, color_name);
}

function createNewSwatchBox(color_code, color_name) {
  let swatchHead = document.getElementById("swatches");
  swatchHead.style.display = "flex";
  swatchHead.style.flexWrap = "wrap";
  swatchHead.style.alignItems = "center";

  // Create 200x200 swatchBox
  let swatchBox = document.createElement("div");
  swatchBox.style.backgroundColor = color_code;
  swatchBox.style.width = "200px";
  swatchBox.style.height = "200px";
  swatchBox.style.margin = "20px";
  swatchBox.style.borderRadius = "5px";
  swatchBox.style.display = "flex";
  swatchBox.style.alignItems = "center";
  swatchBox.style.justifyContent = "center";
  swatchBox.innerHTML = `<p style="color: #fff;">${color_name}</p>`;

  swatchHead.appendChild(swatchBox);
}

window.addEventListener("DOMContentLoaded", init);
