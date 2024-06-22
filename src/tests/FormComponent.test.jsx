// tests/FormComponent.test.jsx
import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useQuery } from "@tanstack/react-query";
import { FormComponentWrapper } from "./FormComponentWrapper.jsx";

// Mock the `useQuery` hook from `react-query`
vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

// Mock data to be returned by the `useQuery` hook
const mockCategories = [{ _id: "1", name: "Category1" }];
const mockCouches = [{ _id: "2", name: "Couch1" }];
const mockGroups = [{ _id: "3", name: "Group1" }];
const mockUsers = [{ _id: "4", username: "User1" }];
const mockAthletes = [{ _id: "5", name: "Athlete1" }];
const mockPackages = [{ _id: "6", name: "Package1" }];
const mockProducts = [{ _id: "7", product_name: "Product1", price: 100 }];

// Define form fields
const formFields = [
  { name: "field1", optionsSource: "categories", dependentOn: null },
  { name: "field2", optionsSource: "couches", dependentOn: null },
];

beforeEach(() => {
  useQuery.mockImplementation(({ queryKey }) => {
    switch (queryKey[0]) {
      case "callCategories":
        return { data: mockCategories };
      case "couchList":
        return { data: mockCouches };
      case "allGroups":
        return { data: mockGroups };
      case "allUsers":
        return { data: mockUsers };
      case "allAthletes":
        return { data: mockAthletes };
      case "allPackages":
        return { data: mockPackages };
      case "productList":
        return { data: mockProducts };
      default:
        return { data: [] };
    }
  });
});

describe("FormComponent", () => {
  it("calls handleSubmit on form submission", async () => {
    const handleSubmit = vi.fn();
    const handleClose = vi.fn();

    const { getByText } = render(
      <FormComponentWrapper
        formFields={formFields}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        isLogin={false}
        confirmLoading={false}
      />,
    );

    const submitButton = getByText(/Guardar/i);

    // Simulate form submission
    fireEvent.submit(submitButton);

    // Wait for async actions to complete
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  it("calls handleClose on cancel button click", () => {
    const handleSubmit = vi.fn();
    const handleClose = vi.fn();

    const { getByText } = render(
      <FormComponentWrapper
        formFields={formFields}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        isLogin={false}
        confirmLoading={false}
      />,
    );

    const cancelButton = getByText(/Cancelar/i);

    // Simulate button click
    fireEvent.click(cancelButton);

    // Check if handleClose was called
    expect(handleClose).toHaveBeenCalled();
  });
});
