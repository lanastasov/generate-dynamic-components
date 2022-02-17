var parsedJSON;
document.getElementById("inputfile").addEventListener("change", function () {
  let fileReader = new FileReader();
  fileReader.onload = function () {
    parsedJSON = JSON.parse(fileReader.result);
    // your code to consume the json
    generateComponents(parsedJSON);
    returnJSON(parsedJSON);
  };
  fileReader.readAsText(this.files[0]);
});

function generateComponents(parsedJSON) {
  for (const v of Object.keys(parsedJSON.props)) {
    let type = parsedJSON.meta[v].type;
    if (type === "dropdown") {
      createDropdownAndLabel(parsedJSON, v);
    } else if (type === "checkbox") {
      createCheckboxAndLabel(parsedJSON, v);
    } else if (type === "text") {
      createInputAndLabel(parsedJSON, v);
    } else if (type === "radio") {
      createRadioAndLabel(parsedJSON, v);
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
    var myInnerLabel = createInnerLabel(parsedJSON, radioType, i, val);
    myInnerLabel.appendChild(radiobox);
    document.getElementById("wrapLabel").appendChild(myInnerLabel);
  }
}

function createInputAndLabel(parsedJSON, textType) {
  // label
  var myLabel = createLabel(parsedJSON, textType);

  // text input
  var textInput = document.createElement("input");
  textInput.type = "text";
  textInput.id = textType;
  textInput.value = parsedJSON.meta[textType].defaultValue;

  document.getElementById("result").appendChild(myLabel).appendChild(textInput);
}

function createCheckboxAndLabel(parsedJSON, checkboxType) {
  // label
  var myLabel = createLabel(parsedJSON, checkboxType);

  // checkbox
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = checkboxType;
  // checkbox.name = "name";
  checkbox.value = parsedJSON.meta[checkboxType].defaultValue;

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

pJSON = {};
function returnJSON(parsedJSON) {
  pJSON = parsedJSON;
  console.log("16.", pJSON);
  return pJSON;
}
console.log("17.", pJSON);

function setDefaults() {
  document.getElementById("result").remove();
  var form = document.createElement("form");
  form.id = "result";

  document.getElementById("container").appendChild(form);
  generateComponents(parsedJSON);
}

$(document).ready(function () {
  var el = {
    btnSave: $("#save"),
    result: $("#saveJSON"),
  };

  el.btnSave.on("click", function () {
    var node = new PrettyJSON.view.Node({
      el: el.result,
      data: parsedJSON,
    });
  });
});
