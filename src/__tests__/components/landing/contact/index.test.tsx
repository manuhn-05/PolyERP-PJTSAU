import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor, } from '@testing-library/react';
import Contact from "@/components/landing/contact-us";
import {ContactForm} from "@/components/landing/contact-us/contact-us-form";
import { CONTACT_FORM_TITLE_TEXT, GET_IN_TOUCH_BTN_TEXT, SEND_US_MESSAGE, WE_LOVE_TO_HEAR_FROM_YOU } from "@/components/landing/landing-page-constants";

jest.mock("@chakra-ui/react",()=>{
const actual =jest.requireActual("@chakra-ui/react");
return {
    ...actual,
    Button : (props :any)=><button {...props} />,
    Input : (props : any)=><input {...props} />,
    TextArea : (props : any)=><textarea {...props} />,
};
});

describe("Contact Us Page - Component", function () {
    beforeEach(() => render(<Contact />));
    describe(" Rendeers Contact Us Page Hero Section and Header Titles", function () {
        it("Should render Hero Section Header Title", () => {
            const getInTouchTitle = screen.getByRole("heading", { name: GET_IN_TOUCH_BTN_TEXT });

            expect(getInTouchTitle).toBeInTheDocument();
            expect(getInTouchTitle).toBeVisible();


        });
        it("Should render Hero Section Header Subtitle", () => {

            const weLoveToHearFromYou = screen.getByText(new RegExp(WE_LOVE_TO_HEAR_FROM_YOU, "i"));


            expect(weLoveToHearFromYou).toBeInTheDocument();
            expect(weLoveToHearFromYou).toBeVisible();

        });
        it("Should render Hero Section Contact Form Title (sr-only title)", () => {

            const contactFormTitle = screen.getByRole("heading", { name: CONTACT_FORM_TITLE_TEXT });
            expect(contactFormTitle).toBeInTheDocument();
            expect(contactFormTitle).toBeVisible();
        });

    });
    describe(" Renders Contact Us Form in Contact Us Page", function () {
        it("Should Render Contact us form header and subimit button", () => {
            const sendUsMessage = screen.getByRole("heading", { name: SEND_US_MESSAGE });
            expect(sendUsMessage).toHaveTextContent(SEND_US_MESSAGE);
            expect(sendUsMessage).toBeInTheDocument();
            expect(sendUsMessage).toBeVisible();
        })
    })
    describe("",function(){
        beforeEach(() => jest.clearAllMocks());
        it("Should render all the form fields and submit button in contact us form",()=>{
            // render(<Contact />);
            expect(screen.getByText(SEND_US_MESSAGE)).toBeInTheDocument();
            expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
            expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
            expect(screen.getByPlaceholderText("Enter your message")).toBeInTheDocument();
            expect(screen.getByPlaceholderText("Enter your subject")).toBeInTheDocument();
            expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();

        });
        it("Should Submit form data and log correct payload", async ()=>{
            const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });

            fireEvent.change(screen.getByPlaceholderText("Enter your name"),{target : {value : "Black Droid"}});
            fireEvent.change(screen.getByPlaceholderText("Enter your email"),{target : {value : "blackdroid@example.com"}});
            fireEvent.change(screen.getByPlaceholderText("Enter your message"),{target : {value : "Hello, I am Droid, and I want to know more about your services."}})
            fireEvent.change(screen.getByPlaceholderText("Enter your subject"),{target : {value : "About Services you provide"}});

            fireEvent.submit(screen.getByRole("form", {hidden :true}) || screen.getByRole("button", {name : "Submit"}));

            await waitFor(()=>
            expect(consoleSpy).toHaveBeenCalledWith("[v0] Contact form submitted",
                expect.objectContaining({
                    name : "Black Droid",
                    email : "blackdroid@example.com",
                    subject : "About Services you provide",
                    message : "Hello, I am Droid, and I want to know more about your services."

            }))
        )
        });

        // todo : fix test case for loading state
        // it("Should display loading state when form submited",async ()=>{
        //     // render(<ContactForm />)
        //     // const submitBtn = screen.getByRole("button", { name: "Submit" });
        //     const submitBtn = screen.getByTestId("submit-button");
        //     const form = screen.getByRole("form")
        //     fireEvent.submit(form);

        //    await waitFor(()=>{
        //     expect(submitBtn).toBeDisabled();
        //     expect(submitBtn).toHaveTextContent("Sending...");
        //    })

        //     await waitFor(()=>expect(submitBtn).not.toBeDisabled());
        //     expect(submitBtn).toHaveTextContent("Submit");
        // });

        it("Should display error message when form is submitted with invalid data", async () => {
            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => { });

            // Mock Throeing an Error
            const { container } = render(<ContactForm />);
            const form = container.querySelector("form")!;
            form.reset = jest.fn(() => { throw new Error("Form reset failed"); });

            fireEvent.submit(form);

            await waitFor(() => {
                expect(consoleErrorSpy).toHaveBeenCalledWith("[v0] Error submitting contact form", expect.any(Error))
            })

        });
    })

});