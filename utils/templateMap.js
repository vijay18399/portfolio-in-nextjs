import Section from "@/pages/components/main/Section";
import IntroSection from "@/pages/components/sections/Intro";
import Experience from "@/pages/components/blocks/Experience";
import Header from "@/pages/components/sections/Header";
import SimpleBanner from "@/pages/components/sections/SimpleBanner";
import Portfolio from "@/pages/components/blocks/Portfolio";
import SectionPlaceHolder from '@/pages/components/main/SectionPlaceHolder'
import GitHubCalendar from "@/pages/components/sections/GitHubCalendar";
import FeaturedBanner from "@/pages/components/sections/FeaturedBanner";
const templateMap = {
    "Section": {
        component: Section,
        properties: ["title", "description"]
    },
    "Intro": {
        component: IntroSection,
        properties: ["title", "description", "imageUrl",'links']
    },
    "SimpleBanner": {
        component: SimpleBanner,
        properties: ["description", "links"]
    },
    "FeaturedBanner":{
        component: FeaturedBanner,
        properties: ["title", "description","links"]
    },
    "GitHubCalendar":{
        component: GitHubCalendar,
        properties: ["title", "description","github_username"]
    },
    "Header": {
        component: Header,
        properties: ["title", "links"]
    },
    "Experience": {
        component: Experience,
        properties: ["title","description"]
    },
    "Portfolio": {
        component: Portfolio,
        properties: ["title"]
    },
    "SectionPlaceHolder": {
        component: SectionPlaceHolder,
        properties: ["title"]
    }
};
export default templateMap