document.getElementById("inputfile").addEventListener("change", function () {
  let fileReader = new FileReader();
  fileReader.onload = function () {
    let parsedJSON = JSON.parse(fileReader.result);
    // your code to consume the json

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
  };
  fileReader.readAsText(this.files[0]);
});

function createRadioAndLabel(parsedJSON, radioType) {
  // label
  var myLabel = document.createElement("label");
  myLabel.innerHTML = parsedJSON.meta[radioType].label;
  myLabel.htmlFor = radioType;
  // var newline = document.createElement("br");

  var radiobox = document.createElement("input");
  radiobox.type = "radio";
  radiobox.id = radioType;
  radiobox.value = parsedJSON.meta[radioType].defaultValue;
  radiobox.name = radioType;

  console.log("11.", parsedJSON.meta[radioType].values);
  var values = [];
  for (const v of parsedJSON.meta[radioType].values) {
    values.push(Object.keys(v)[0]);
  }

  for (const [i, val] of values.entries()) {
    var radiobox0 = document.createElement("input");
    radiobox0.type = "radio";
    radiobox0.id = val;
    radiobox0.name = radioType;
    radiobox0.value = parsedJSON.meta[radioType].values[i][val];
    // if (option.text == parsedJSON.meta[radioType].defaultValue) {
    //   option.selected = "selected";
    // }
    "generate label".appendChild(radiobox0);
  }

  console.log("12.", values);

  var radiobox2 = document.createElement("input");
  radiobox2.type = "radio";
  radiobox2.id = "id2";
  radiobox2.value = "Levski"; // parsedJSON.meta[radioType].values;
  radiobox2.name = radioType;
  // radiobox.value = "HTML";

  var myLabelRad = document.createElement("label");
  myLabelRad.innerHTML = radiobox.value; // parsedJSON.meta[radioType].label;
  myLabelRad.htmlFor = radioType;

  var myLabelRad2 = document.createElement("label");
  myLabelRad2.innerHTML = "test"; // parsedJSON.meta[radioType].label;
  myLabelRad2.htmlFor = radioType;

  myLabelRad.appendChild(radiobox);

  myLabelRad2.appendChild(radiobox2);

  document
    .getElementById("result")
    .appendChild(myLabel)
    .appendChild(myLabelRad)
    .appendChild(myLabelRad2);
}

function createInputAndLabel(parsedJSON, textType) {
  // label
  var myLabel = document.createElement("label");
  myLabel.innerHTML = parsedJSON.meta[textType].label;
  myLabel.htmlFor = textType;

  // text input
  var textInput = document.createElement("input");
  textInput.type = "text";
  textInput.id = textType;
  textInput.value = parsedJSON.meta[textType].defaultValue;

  document.getElementById("result").appendChild(myLabel).appendChild(textInput);
}

function createCheckboxAndLabel(parsedJSON, checkboxType) {
  // checkbox
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = checkboxType;
  // checkbox.name = "name";
  checkbox.value = parsedJSON.meta[checkboxType].defaultValue;

  // label
  var myLabel = document.createElement("label");
  myLabel.innerHTML = parsedJSON.meta[checkboxType].label;
  myLabel.htmlFor = checkboxType;
  // myLabel.appendChild();
  document.getElementById("result").appendChild(myLabel).appendChild(checkbox);
}

function createDropdownAndLabel(parsedJSON, dropdownType) {
  // label
  var myLabel = document.createElement("label");
  myLabel.innerHTML = parsedJSON.meta[dropdownType].label;
  myLabel.htmlFor = dropdownType;

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
