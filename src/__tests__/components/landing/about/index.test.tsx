import "@testing-library/jest-dom";
import { render, screen, fireEvent } from '@testing-library/react';
import About from "@/components/landing/about";
import { ABOUT_FEATURES, ABOUT_US_HERO_IMAGE_TEXT, GET_IN_TOUCH_BTN_TEXT, JOIN_US_HEADER_TEXT, OUR_MISSION_VISION_STORY, OUR_TEAM, OUR_TEAM_LIST, REVOLUTIONIZING_SMAR_FARM_DESC, REVOLUTIONIZING_SMART_FARMING, SUSTAINABLE_DATA_DRIVEN_AUTOMATED, WHAT_WE_DO } from "@/components/landing/landing-page-constants";
import GetInTouchBanner from "@/components/landing/about/get-in-touch";


describe("ABout Us Page", function () {
    beforeEach(() => render(<About />))
    describe("Should render Hero Section, Our Mission Cards", function () {
        it("Should render Polyhouse Inside Image", () => {
            const polyHouseInsideImage = screen.getByRole("img", { name: ABOUT_US_HERO_IMAGE_TEXT });
            expect(polyHouseInsideImage).toBeVisible();
        })
        it("Should Render Revolutionizing Smart Farming Section", () => {

            const SECTIONS_LIST = [REVOLUTIONIZING_SMAR_FARM_DESC, SUSTAINABLE_DATA_DRIVEN_AUTOMATED]
            const revolutionizingSmartFarming = screen.getByRole("heading", { name: REVOLUTIONIZING_SMART_FARMING });

            expect(revolutionizingSmartFarming).toHaveTextContent(REVOLUTIONIZING_SMART_FARMING);

            SECTIONS_LIST.forEach((section) => {
                expect(screen.getByText(section)).toBeInTheDocument();
            });


        })

        it("Should Render Our Mission, Vision and Story Cards", () => {
            OUR_MISSION_VISION_STORY.forEach(({ description, test_id, title }) => {
                const missionVisionStoryCard = screen.getByTestId(test_id);
                expect(missionVisionStoryCard).toHaveTextContent(title);
                expect(missionVisionStoryCard).toHaveTextContent(description);
            })
        })
    });

    describe("Should render What We Do Section", function () {
        it("Should Render What We Do Header", () => {
            const whatWeDoHeader = screen.getByRole("heading", { name: WHAT_WE_DO });
            expect(whatWeDoHeader).toBeVisible();
            expect(whatWeDoHeader).toHaveTextContent(WHAT_WE_DO);
        });

        it("Shoul Render What We Do Cards List", () => {
            ABOUT_FEATURES.forEach(({ title, description, test_id }) => {
                const whatWeDoCard = screen.getByTestId(test_id);
                expect(whatWeDoCard).toHaveTextContent(title);
                expect(whatWeDoCard).toHaveTextContent(description);
            })
        })
    });

    describe("Should render Our Team, Join Us Sections", function () {
        it("Should Render Our Team Header", () => {
            const ourTeamHeader = screen.getByRole("heading", { name: OUR_TEAM });
            expect(ourTeamHeader).toBeVisible();
            expect(ourTeamHeader).toHaveTextContent(OUR_TEAM);
        });

        it("Shoul Render What We Do Cards List", () => {
            OUR_TEAM_LIST.forEach(({ name, role }) => {
                const teamMemberName = screen.getByText(name);
                const teamMemberRole = screen.getByText(role);
                expect(teamMemberName).toBeVisible();
                expect(teamMemberRole).toBeVisible();
                expect(teamMemberName).toHaveTextContent(name);
                expect(teamMemberRole).toHaveTextContent(role);
            })
        })
    });
    describe("Should render  Join Us Sections", function () {
        it("Should Render Join Us header Text", () => {
            const joinUsHeader = screen.getByRole("heading", { name: JOIN_US_HEADER_TEXT });
            expect(joinUsHeader).toBeVisible();
            expect(joinUsHeader).toHaveTextContent(JOIN_US_HEADER_TEXT);
        });
        it("calls onClick - (handleGetInTouchClick fn) event when clicked", () => {
            const logSpyBtn = jest.spyOn(console, 'log').mockImplementation(() => { });
            const btnElement = screen.getByTestId("get-in-touch-btn");
render(<GetInTouchBanner />)
            fireEvent.click(btnElement);
            expect(logSpyBtn).toHaveBeenCalledWith('Clicked');
            logSpyBtn.mockRestore();

        })

    })
});