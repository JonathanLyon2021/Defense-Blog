import { render, screen } from "@testing-library/react";
import App from "../../App";
import Footer from "../../Footer";
import Home from "../../Home";
import Registration from "../../Registration";
import Login from "../../Login";

it("Renders 'Lifted Truck Blog' heading from inside the main component", () => {
	render(<App />);
	const linkElement = screen.getByText(/Lifted Truck Blog/i);
	expect(linkElement).toBeInTheDocument();
});

it("Should render the same text in the Footer Component", async () => {
	render(<Footer />);
	const headingElement = screen.getByRole("heading", {
		Name: "Copyright 2021 Lyon Productions",
	});
	expect(headingElement).toBeInTheDocument();
});

it("Should render the <div> section we are looking for inside the Home Component", async () => {
	render(<Home />);
	const titleElement = screen.getByTitle("Container Body");
	expect(titleElement).toBeInTheDocument();
});

it("Should return the Registration Form we are looking for inside the Registration Component", async () => {
	render(<Registration />);
	const registerFormElement = screen.getByTestId("Registration Form");
	expect(registerFormElement).toBeInTheDocument();
});

it("Should return the text we are looking for inside the Login Component", async () => {
	render(<Login />);
	const loginElement = await screen.findByText("Sign in");
	expect(loginElement).toBeInTheDocument();
});

it("Should compute to the text NOT being inside the Login Component", async () => {
	render(<Login />);
	const loginSignupElement = screen.queryByText(/registeration/i);
	expect(loginSignupElement).not.toBeInTheDocument();
});

it("Should compute to the text NOT being inside the Registration Component", async () => {
	render(<Registration />);
	const loginSignupElement = screen.queryByText(/signin/i);
	expect(loginSignupElement).not.toBeInTheDocument();
});
