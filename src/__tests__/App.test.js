import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { within } from "@testing-library/react";

import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});


test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);

  const checkboxes = screen.getAllByRole("checkbox");
  expect(checkboxes).toHaveLength(3);
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);

  const checkboxes = screen.getAllByRole("checkbox");
  checkboxes.forEach((checkbox) => {
    expect(checkbox).not.toBeChecked();
  });
});


// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", async () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  await userEvent.type(nameInput, "Alex");
  await userEvent.type(emailInput, "alex@email.com");

  expect(nameInput).toHaveValue("Alex");
  expect(emailInput).toHaveValue("alex@email.com");
});


test("checked status of checkboxes changes when user clicks them", async () => {
  render(<App />);

  const checkbox = screen.getAllByRole("checkbox")[0];

  expect(checkbox).not.toBeChecked();
  await userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", async () => {
  render(<App />);

  const submitButton = screen.getByRole("button", { name: /submit/i });
  await userEvent.click(submitButton);

  expect(
    screen.getByText(/thank you for signing up/i)
  ).toBeInTheDocument();
});

test("selected interests are not displayed before the form is submitted", async () => {
  render(<App />);

  const reactCheckbox = screen.getByLabelText(/react/i);
  await userEvent.click(reactCheckbox);

  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("selected interests are displayed after the form is submitted", async () => {
  render(<App />);

  const reactCheckbox = screen.getByLabelText(/react/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  await userEvent.click(reactCheckbox);
  await userEvent.click(submitButton);

  const list = screen.getByRole("list");
  expect(within(list).getByText("React")).toBeInTheDocument();
});

test("only interests selected by the user are displayed", async () => {
  render(<App />);

  const reactCheckbox = screen.getByLabelText(/react/i);
  const testingCheckbox = screen.getByLabelText(/testing/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  await userEvent.click(reactCheckbox);
  await userEvent.click(submitButton);

  const list = screen.getByRole("list");

  expect(within(list).getByText("React")).toBeInTheDocument();
  expect(within(list).queryByText("Testing")).not.toBeInTheDocument();
});




