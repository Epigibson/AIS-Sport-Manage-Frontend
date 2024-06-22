import { describe, expect, it } from "vitest";
import { prepareInitialValues } from "../components/PrepareInitialValues.jsx";

describe("prepareInitialValues", () => {
  it("debería retornar los valores iniciales correctamente para checkboxes", () => {
    const fields = [
      { name: "field1", inputType: "checkbox", defaultValue: true },
      { name: "field2", inputType: "checkbox" },
    ];

    const expectedInitialValues = {
      field1: true,
      field2: false,
    };

    expect(prepareInitialValues(fields)).toEqual(expectedInitialValues);
  });

  it("debería retornar los valores iniciales correctamente para otros tipos de campos", () => {
    const fields = [
      {
        name: "field1",
        inputType: "text",
        defaultValue: "valor predeterminado",
      },
      { name: "field2", inputType: "text" },
    ];

    const expectedInitialValues = {
      field1: "valor predeterminado",
      field2: "",
    };

    expect(prepareInitialValues(fields)).toEqual(expectedInitialValues);
  });

  it("debería manejar una mezcla de tipos de campos correctamente", () => {
    const fields = [
      { name: "field1", inputType: "checkbox", defaultValue: true },
      {
        name: "field2",
        inputType: "text",
        defaultValue: "valor predeterminado",
      },
      { name: "field3", inputType: "text" },
      { name: "field4", inputType: "checkbox" },
    ];

    const expectedInitialValues = {
      field1: true,
      field2: "valor predeterminado",
      field3: "",
      field4: false,
    };

    expect(prepareInitialValues(fields)).toEqual(expectedInitialValues);
  });
});
