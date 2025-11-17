import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import Home from "@/components/landing/home";

import {  steps, features, A_SMART_ERP_SOLUTION, POLYERP ,HOW_IT_WORKS, 
    HOW_IT_WORKS_DESC, KEY_FEATURES, KEY_FEATURES_DESC} from "@/components/landing/landing-page-constants";



describe("Landing Page - Should Render Home Page", function(){
    beforeEach(()=>render(<Home />))
    describe("Should Render Hero Section", function(){
        it("Renders Hero Image for Larger and mobile Screen", () => {

            const heroImageLarge = screen.getByAltText("Hero Image Large");
            const heroImageMobile = screen.getByAltText("Hero Image Mobile");
            // Hero Section Image 2  - Mobile and Large Screen
            // PolyERP Inside Image - 1
            expect(screen.getAllByRole('img')).toHaveLength(3);
    
            expect(heroImageLarge).toBeVisible();
            expect(heroImageMobile).toBeVisible()
        });
    
        it("Renders PolyERP Inside Image and Description", () => {
            const polyERP = screen.getByRole("heading", { name: POLYERP });
            const polyHouseInsideImage = screen.getByTestId("polyhouse-interior");

            const polyHouseDesc = screen.getByTestId("polyerp-description");
    
            expect(polyERP).toBeInTheDocument();
            expect(polyHouseInsideImage).toBeVisible();
            expect(polyHouseDesc).toHaveTextContent(A_SMART_ERP_SOLUTION);
        });
    
        it("Should render Key Features Section",()=>{

            const keyFeatures = screen.getByRole("heading", { name: KEY_FEATURES });
            const keyFeatureDesc = screen.getByTestId("key-features-description");
    
            expect(keyFeatureDesc).toHaveTextContent(KEY_FEATURES_DESC);
            expect(keyFeatures).toBeInTheDocument();
            
        })
        it("Should render How It Works Section",()=>{

            const howItWorks = screen.getByRole("heading", { name: HOW_IT_WORKS });
            const howItWorksDesc = screen.getByTestId("how-it-works-description");
    
            expect(howItWorksDesc).toHaveTextContent(HOW_IT_WORKS_DESC);
            expect(howItWorks).toBeVisible();
            
        })
       
       
    });

    describe("Home Page - Should Render Card Lists on Home", function(){
       
        it("Should render Key Features Section List",()=>{
            
            features.forEach((feature) => {
                const featureTitle = screen.getByTestId(feature.test_id);
                const featureText = screen.getByText(feature.description);
                expect(featureTitle).toBeInTheDocument();
                expect(featureText).toBeInTheDocument();
            });
    
        });
        it("Should render How it Works Card List",()=>{
           
            steps.forEach((step) => {
                const stepTitle = screen.getByTestId(step.test_id);
                const stepText = screen.getByText(step.description);
                expect(stepTitle).toBeInTheDocument();
                expect(stepText).toBeInTheDocument();
            });
    
        });
        
    });
})