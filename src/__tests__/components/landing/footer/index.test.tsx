import { PolyErpFooter } from '@/components/landing/footer/polyerp-footer';
import { FOOTER_SMART_ERP } from '@/components/landing/landing-page-constants';
import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import { link } from 'fs';

describe("Test Home Page Footer Component", function () {
    beforeEach(() => render(<PolyErpFooter />))
    describe("Render Brand Logo and description", function () {

        it("Should render brand logo and description", function () {
            const logo = screen.getByRole("img", { name: "PolyERP logo" });
            expect(logo).toBeInTheDocument();
            const description = screen.getByTestId("footer-smart-erp");
            expect(description).toBeInTheDocument();
            expect(description).toHaveTextContent(FOOTER_SMART_ERP);
        });

        it("Should render Quick Footer Links", () => {
            const navLinks = screen.getByLabelText("Footer quick links");
            expect(navLinks).toBeInTheDocument();

            const quickLinks = within(navLinks).getAllByRole("link");
            const expectedLinks = ["Home", "Features", "Pricing", "About", "Contact", "FAQ"];

            expectedLinks.forEach((linkText => (
                expect(screen.getByRole("link", { name: linkText })).toBeInTheDocument()
            )));
            expect(quickLinks.length).toBe(expectedLinks.length);
        });
        it("Should render Quick links header", () => {
            const quickLinksHeader = screen.getByRole("heading", { name: /Quick links/i });
            expect(quickLinksHeader).toBeInTheDocument();
        });
        it("Should Render all the Link", () => {

        });

    });

    describe("Display Contact Information ", () => {
        it("Should Display Email, Phoe and Address", () => {
            const contactHeader = screen.getByRole("heading", { name: /contact/i });
            expect(contactHeader).toBeInTheDocument();
            expect(contactHeader).toBeVisible();

            expect(screen.getByText(/Email/i)).toBeInTheDocument();
            expect(screen.getByRole("link", { name: /support@polyerp.com/i })).toBeInTheDocument();

            expect(screen.getByText(/Phone/i)).toBeInTheDocument();
            expect(screen.getByRole("link", { name: "+91-9876543201" })).toBeInTheDocument();

            expect(screen.getByText(/Address/i)).toBeInTheDocument();
            expect(screen.getByText(/Bangalore, Karnataka, India/i)).toBeInTheDocument();

        });

    });

    describe("Display Newsletter Section", function () {
        it("Should Display Newsletter Section Header", () => {
            const newsLetterHeader = screen.getByRole("heading", { name: /Newsletter/i });
            const subscribeForUpdates = screen.getByText(/Subscribe for updates/i);
            expect(newsLetterHeader).toBeInTheDocument();
            expect(newsLetterHeader).toBeVisible();
            expect(subscribeForUpdates).toBeInTheDocument();
            expect(subscribeForUpdates).toBeVisible();
        })
    })
    describe("Display Social media icons", function () {
        it("Should render Social Media icons", () => {
            const socialMedia = screen.getByLabelText(/Social media/i);
            expect(socialMedia).toBeInTheDocument();

            const expectedSocialMediaIcons = [
                { label: "Facebook", href: "https://facebook.com" },
                { label: "Twitter", href: "https://twitter.com" },
                { label: "Instagram", href: "https://instagram.com" },
                { label: "LinkedIn", href: "https://linkedin.com" },
            ];

            expectedSocialMediaIcons.forEach(({ label, href }) => {
                const link = screen.getByRole("link", { name: label });
                expect(link).toBeInTheDocument();
                expect(link).toHaveAttribute("href", href);
                expect(link).toHaveAttribute("target", "_blank");
                expect(link).toHaveAttribute("rel", "noreferrer");


            });
        });
        it("Should have social media icons inside each link", () => {
            const socialMediaContainer = screen.getByLabelText(/Social media/i);
            // There should be exactly 4 icons rendered (1 for each link)
            const icons = within(socialMediaContainer).getAllByRole("link", { hidden: true });

            expect(icons.length).toBe(4);

            // Ensure each icon element (<svg>) is hidden from accessibility tree
            icons.forEach((icon) => {
                const svg = icon.querySelector("svg");
                expect(svg).toBeInTheDocument();
                expect(svg).toHaveAttribute("aria-hidden", "true");
            });
        })


    });

});