import formJSON from "./formElement.json";
import { useState, useEffect } from "react";
import Element from "./components/Element";
import { FormContext } from "./FormContext";
function App() {
  const [elements, setElements] = useState(null);
  useEffect(() => {
    setElements(formJSON[0]);
  }, []);
  const { fields, page_label } = elements ?? {};
  const handleSubmit = (event) => {
    event.preventDefault();

    var fldsArray = elements.fields;
    //console.log(elements);
    console.table(elements.fields);

    var desc = "[DO_NOT_EDIT]";
    var cnt = 0;
    for (var i = 0; i < fldsArray.length; i++) {
      desc +=
        "[" +
        fldsArray[i].field_id +
        " field_label='" +
        fldsArray[i].field_label +
        "']";
      desc += fldsArray[i].field_value + "[/" + fldsArray[i].field_id + "]";
      cnt++;
    }
    desc += "[/DO_NOT_EDIT]";
    console.log("Custom Field concatenated: " + desc);
    console.log("cnt: " + cnt);
  };
  const handleChange = (id, event) => {
    const newElements = { ...elements };
    newElements.fields.forEach((field) => {
      const { field_type, field_id } = field;
      if (id === field_id) {
        switch (field_type) {
          case "checkbox":
            field["field_value"] = event.target.checked;
            break;

          default:
            field["field_value"] = event.target.value;
            break;
        }
      }
      setElements(newElements);
    });
    console.log(elements);
  };
  return (
    <FormContext.Provider value={{ handleChange }}>
      <div className="App container">
        <h3>{page_label}</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="jiraSummary" className="form-label">
              Jira Summary Field:
            </label>
            <input
              type="text"
              className="form-control"
              id="jiraSummary"
              aria-describedby="jiraSummaryHelp"
              placeholder="Enter the Jira Summary text"
            />
            <div id="jiraSummaryHelp" className="form-text">
              Jira Summary field
            </div>
          </div>

          {fields
            ? fields.map((field, i) => <Element key={i} field={field} />)
            : null}
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        </form>
      </div>
    </FormContext.Provider>
  );
}

export default App;
