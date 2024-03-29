var parsedJSON;
var saveJSON;
var setDefaultJSON;
document.getElementById("inputfile").addEventListener("change", function () {
  let fileReader = new FileReader();
  fileReader.onload = function () {
    parsedJSON = JSON.parse(fileReader.result);
    setDefaultJSON = JSON.parse(JSON.stringify(parsedJSON));
    // your code to consume the json
    generateComponents();
  };
  fileReader.readAsText(this.files[0]);
});

function generateComponents() {
  for (const v of Object.keys(parsedJSON.props)) {
    let type = parsedJSON.meta[v].type;
    if (type === "dropdown") {
      createDropdownAndLabel(parsedJSON, v);
    } else if (type === "checkbox") {
      createCheckboxAndLabel(parsedJSON, v);
    } else if (type === "text") {
      createTextInputAndLabel(parsedJSON, v);
    } else if (type === "radio") {
      createRadioAndLabel(parsedJSON, v);
    }
  }
}

function updatePropsComponents() {
  for (const v of Object.keys(parsedJSON.props)) {
    let type = parsedJSON.meta[v].type;
    if (type === "dropdown") {
      updatePropsDropdown(v);
    } else if (type === "checkbox") {
      updatePropsCheckbox(v);
    } else if (type === "text") {
      updatePropsTextInput(v);
    } else if (type === "radio") {
      updatePropsRadio(v);
    }
  }
}

function createRadioAndLabel(parsedJSON, radioType) {
  // wrap Label
  var wrapLabel = document.createElement("label");
  wrapLabel.innerHTML = parsedJSON.meta[radioType].label;
  wrapLabel.htmlFor = radioType;
  wrapLabel.id = "wrapLabel";
  document.getElementById("result").appendChild(wrapLabel);

  // radio
  var values = [];
  for (const v of parsedJSON.meta[radioType].values) {
    values.push(Object.keys(v)[0]);
  }

  for (const [i, val] of values.entries()) {
    var radiobox = document.createElement("input");
    radiobox.type = "radio";
    radiobox.id = val;
    radiobox.name = radioType;
    if (
      parsedJSON.meta[radioType].defaultValue ===
      parsedJSON.meta[radioType].values[i][val]
    ) {
      radiobox.checked = "checked";
    }
    radiobox.value = parsedJSON.meta[radioType].values[i][val];
    radiobox.onchange = function () {
      updatePropsRadio(radioType);
    };
    var myInnerLabel = createInnerLabel(parsedJSON, radioType, i, val);
    myInnerLabel.appendChild(radiobox);
    document.getElementById("wrapLabel").appendChild(myInnerLabel);
  }
}

function createTextInputAndLabel(parsedJSON, textType) {
  // label
  var myLabel = createLabel(parsedJSON, textType);

  // text input
  var textInput = document.createElement("input");
  textInput.type = "text";
  textInput.id = textType;
  textInput.value = parsedJSON.meta[textType].defaultValue;
  textInput.oninput = function () {
    updatePropsTextInput(textType);
  };

  document.getElementById("result").appendChild(myLabel).appendChild(textInput);
}

function createCheckboxAndLabel(parsedJSON, checkboxType) {
  // label
  var myLabel = createLabel(parsedJSON, checkboxType);

  // checkbox
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = checkboxType;
  checkbox.onclick = function () {
    updatePropsCheckbox(checkboxType);
  };
  // checkbox.name = "name";
  checkbox.value = parsedJSON.meta[checkboxType].defaultValue;
  if (checkbox.value === "true") {
    checkbox.checked = true;
  } else {
    checkbox.checked = false;
  }
  document.getElementById("result").appendChild(myLabel).appendChild(checkbox);
}

function createDropdownAndLabel(parsedJSON, dropdownType) {
  // label
  var myLabel = createLabel(parsedJSON, dropdownType);

  // dropdown
  var values = [];
  for (const v of parsedJSON.meta[dropdownType].values) {
    values.push(Object.keys(v)[0]);
  }
  var select = document.createElement("select");
  select.id = dropdownType;
  select.onchange = function () {
    updatePropsDropdown(dropdownType);
  };

  for (const [i, val] of values.entries()) {
    var option = document.createElement("option");
    option.value = val;
    option.text = parsedJSON.meta[dropdownType].values[i][val];
    if (option.text == parsedJSON.meta[dropdownType].defaultValue) {
      option.selected = "selected";
    }
    select.appendChild(option);
  }
  document.getElementById("result").appendChild(myLabel).appendChild(select);
}

function createLabel(parsedJSON, elementType) {
  var myLabel = document.createElement("label");
  myLabel.innerHTML = parsedJSON.meta[elementType].label;
  myLabel.htmlFor = elementType;
  return myLabel;
}

function createInnerLabel(parsedJSON, elementType, idx, val) {
  var myLabel = document.createElement("label");
  myLabel.innerHTML = parsedJSON.meta[elementType].values[idx][val];
  myLabel.htmlFor = val;
  return myLabel;
}

function setDefaults() {
  document.getElementById("result").remove();
  var form = document.createElement("form");
  form.id = "result";

  document.getElementById("container").appendChild(form);
  generateComponents();
  updatePropsComponents();
  saveJSON = JSON.parse(JSON.stringify(parsedJSON));
  parsedJSON = JSON.parse(JSON.stringify(setDefaultJSON));
}

// reset button
function resetButton() {
  document.getElementById("result").remove();
  var form = document.createElement("form");
  form.id = "result";

  document.getElementById("container").appendChild(form);

  for (const v of Object.keys(parsedJSON.props)) {
    parsedJSON.meta[v].defaultValue = parsedJSON.props[v];
  }

  generateComponents();
  updatePropsComponents();
  saveJSON = JSON.parse(JSON.stringify(parsedJSON));
  parsedJSON = JSON.parse(JSON.stringify(setDefaultJSON));
}

$(document).ready(function () {
  var el = {
    btnSave: $("#save"),
    result: $("#saveJSON"),
  };

  el.btnSave.on("click", function () {
    var node = new PrettyJSON.view.Node({
      el: el.result,
      data: saveJSON,
    });
  });
});

function updatePropsDropdown(dropdownType) {
  var select = document.getElementById(dropdownType);
  var selectedDropdownValue = select.options[select.selectedIndex].value;
  parsedJSON.props[dropdownType] = selectedDropdownValue;
}

function updatePropsCheckbox(checkboxType) {
  var selectedCheckbox = document.getElementById(checkboxType).checked;
  parsedJSON.props[checkboxType] = selectedCheckbox;
}

function updatePropsTextInput(textType) {
  var selectedInput = document.getElementById(textType).value;
  parsedJSON.props[textType] = selectedInput;
}

function updatePropsRadio(radioType) {
  var selectedOption = document.getElementById("result")[radioType].value;
  parsedJSON.props[radioType] = selectedOption;
}
