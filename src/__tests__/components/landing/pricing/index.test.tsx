import { CHOOSE_RIGHT_PLAN, CHOOSE_RIGHT_PLAN_DESC, GET_STARTED_FREE, PRICING_PAGE_ITEMS_LIST, READY_TO_MODERNIZE, SAVE_MONEY_UP_TO, START_FREE_TRIAL, WHY_CHOOSE_US, WHY_CHOOSE_US_DESC } from "@/components/landing/landing-page-constants";
import PricingPageComponent from "@/components/landing/pricing";
import { MotifBackground } from "@/components/landing/pricing/motif-background";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { WhyChooseUs } from '@/components/landing/pricing/why-chose-us';
import { PricingSection } from "@/components/landing/pricing/pricing-section";
import { BillingToggle } from "@/components/landing/pricing/billing-toggle";
import { CTABanner } from "@/components/landing/pricing/cta-banner";


jest.mock("@/components/landing/pricing/pricing-card", () => {
    return ({
        PricingCard: ({ tier, headline, price }: any) => (
            <div data-testid={`${tier.toLowerCase()}-card`}>
                <h1>{headline}</h1>
                {price && <p>{price}</p>}
            </div>
        )
    })
})


describe("Pricing Page", function () {

    describe("Motif Background", function () {
        it("Should render Children Correctly", () => {
            render(<MotifBackground>
                <div>Child Components</div>
            </MotifBackground>);

            expect(screen.getByText("Child Components")).toBeInTheDocument();
        });
        it("Should render container div with relative class", () => {
            const { container } = render(<MotifBackground>
                <div>Child Components</div>
            </MotifBackground>);

            const containerDIv = container.firstChild as HTMLDivElement;
            expect(containerDIv).toHaveClass("relative");
        });
        it("Should Render Decorative Icons with Aria Hidden", () => {
            render(<MotifBackground>
                <div>
                    Child Component
                </div>
            </MotifBackground>);
            // All icons have aria-hidden=true on parent div
            const iconsContainer = screen.getByRole("presentation", { hidden: true });
            expect(iconsContainer).toBeInTheDocument();
            // Since react-icons are rendered as svg, we can query them
            const svgs = document.querySelectorAll("svg");
            expect(svgs.length).toBe(3);// 2 LuLeaf + 1 LuCircuitBoard

        });


    })
    describe(" Pricing Page with motif background", function () {
        it("Should Render Hero Heading Correctly", () => {
            render(<PricingPageComponent />);
            const heroHeading = screen.getByText(CHOOSE_RIGHT_PLAN);
            expect(heroHeading).toHaveClass("mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl");
            expect(heroHeading).toBeInTheDocument();
        })

        it("renders the other sections correctly", () => {
            render(<PricingPageComponent />);

            expect(screen.getByText(CHOOSE_RIGHT_PLAN_DESC)).toBeInTheDocument();
        });



    });


    describe("Why Choose Us ", function () {
        beforeEach(() => {
            render(<WhyChooseUs />);
        })
        it(" Should render Why Choose Us Section", () => {
            const whyChooseUs = screen.getByText(WHY_CHOOSE_US);
            const whyChooseUsDesc = screen.getByText(WHY_CHOOSE_US_DESC);

            expect(whyChooseUs).toBeInTheDocument();
            expect(whyChooseUsDesc).toBeInTheDocument();
            expect(whyChooseUs).toBeVisible();
            expect(whyChooseUsDesc).toBeVisible();
            expect(whyChooseUs).toHaveClass("text-balance text-2xl font-semibold tracking-tight md:text-3xl");
            expect(whyChooseUsDesc).toHaveClass("mt-2 text-muted-foreground");



        });

        it("Should render Pricing Page Items List", () => {
            PRICING_PAGE_ITEMS_LIST.forEach((item) => {
                const priceCard = screen.getByTestId(item.test_id)
                const title = screen.getByText(item.title);
                const description = screen.getByText(item.description);

                expect(title).toBeInTheDocument();
                expect(description).toBeInTheDocument();
                expect(priceCard).toHaveClass("rounded-xl border bg-card/70 shadow-sm");
                expect(priceCard).toBeInTheDocument();
            })
        })
    });

    describe("Pricing DetailCard / Toggle", function () {
        describe("Billing Toggle Component", function () {
            const mockOnChange = jest.fn();
            beforeEach(() => mockOnChange.mockClear());

            it("Should Render Monthly / Annually Buttons", () => {
                render(<BillingToggle isAnnual={false} onChange={mockOnChange} />);
                const annuallyBtn = screen.getByRole("tab", { name: /Annual/i });
                const monthlyBtn = screen.getByRole("tab", { name: /monthly/i });
                expect(annuallyBtn).toBeInTheDocument();
                expect(monthlyBtn).toBeInTheDocument();

            });

            it("Should Highlight Monthly tab when Annual is false", () => {
                render(<BillingToggle isAnnual={false} onChange={mockOnChange} />);

                const annualBtn = screen.getByRole("tab", { name: /Annual/i });
                const monthlyBtn = screen.getByRole("tab", { name: /monthly/i });
                expect(annualBtn).toHaveAttribute("aria-selected", "false");
                expect(monthlyBtn).toHaveAttribute("aria-selected", "true");
            });

            it("Should highlight Annual tab when isAnual is true", () => {
                render(<BillingToggle isAnnual={true} onChange={mockOnChange} />);
                const mothlyBtn = screen.getByRole("tab", { name: /monthly/i });
                const annualBtn = screen.getByRole("tab", { name: /Annual/i });
                expect(annualBtn).toHaveAttribute("aria-selected", "true");
                expect(mothlyBtn).toHaveAttribute("aria-selected", "false");
            });
            it("Should Call onChange(false) funciton when Monthly button is clicked ", () => {
                render(<BillingToggle isAnnual={false} onChange={mockOnChange} />);
                const monthlyBtn = screen.getByRole("tab", { name: /monthly/i });

                fireEvent.click(monthlyBtn);
                expect(mockOnChange).toHaveBeenCalledWith(false);

            });

            it("Should call onChange(true) when Annual button is clicked", () => {
                render(<BillingToggle isAnnual={true} onChange={mockOnChange} />);
                const annualBtn = screen.getByRole("tab", { name: /Annual/i });
                fireEvent.click(annualBtn);
                expect(mockOnChange).toHaveBeenCalledWith(true);

            });

            it("Should Render Save Up to 20% test", () => {
                render(<BillingToggle isAnnual={false} onChange={mockOnChange} />);
                const saveUpToText = screen.getByText(SAVE_MONEY_UP_TO);
                expect(saveUpToText).toBeInTheDocument();
            });

        });

        describe("PricingSection Component Integration ", function () {
            beforeEach(() => render(<PricingSection />));
            it("Should render BillingToggle and pricing cards", () => {
                expect(screen.getByText(SAVE_MONEY_UP_TO)).toBeInTheDocument();
                expect(screen.getByTestId("freemium-card")).toBeInTheDocument();
                expect(screen.getByTestId("pro-card")).toBeInTheDocument();
                expect(screen.getByTestId("enterprise-card")).toBeInTheDocument();
            });

            it("Should show monthly pricing by default", () => {
                const proCard = screen.getByTestId("pro-card");
                expect(proCard).toHaveTextContent("₹399/mo");
                expect(proCard).toHaveTextContent(/Scale with AI insights • Monthly/i);
            });

            it("Should show annual pricing when Annual button is clicked", () => {
                const annualBtn = screen.getByRole("tab", { name: /Annual/i });
                fireEvent.click(annualBtn);

                const proCard = screen.getByTestId("pro-card");

                expect(proCard).toHaveTextContent("₹3999/yr");
                expect(proCard).toHaveTextContent(/Scale with AI insights • Annual/i);
            });

            it("Should toggle back to monthly pricing when Monthly button s clicked", () => {
                const annualBtn = screen.getByRole("tab", { name: /Annual/i });
                const monthlyBtn = screen.getByRole("tab", { name: /monthly/i });
                fireEvent.click(annualBtn);
                fireEvent.click(monthlyBtn);
                const proCard = screen.getByTestId("pro-card");
                expect(proCard).toHaveTextContent("₹399/mo");
                expect(proCard).toHaveTextContent(/Scale with AI insights • Monthly/i);

            });

        });

    });

    describe("Display Pricing Page CTA Banner", function () {
        beforeEach(() => render(<CTABanner />))
        it("Should render CTA banner", () => {
            const ctaBanner = screen.getByTestId("pricing-cta-banner");
            expect(ctaBanner).toBeInTheDocument();
        });
        it("Should Render header and desc text", () => {
            const headerText = screen.getByRole("heading", { name: READY_TO_MODERNIZE });
            const descText = screen.getByTestId("pricing-cta-banner-desc");
            const btn =screen.getByRole("button", { name: GET_STARTED_FREE });

            expect(headerText).toBeInTheDocument();
            expect(descText).toBeInTheDocument();
            expect(btn).toBeInTheDocument();
            expect(headerText).toHaveTextContent(READY_TO_MODERNIZE);
            expect(descText).toHaveTextContent(START_FREE_TRIAL);
            expect(btn).toHaveTextContent(GET_STARTED_FREE);


        });
    });
  
});
