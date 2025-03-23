import Section from "@/components/main/Section";
import IntroSection from "@/components/sections/Intro";
import Experience from "@/components/blocks/Experience";
import Header from "@/components/sections/Header";
import SimpleBanner from "@/components/sections/SimpleBanner";
import Portfolio from "@/components/blocks/Portfolio";
import SectionPlaceHolder from '@/components/main/SectionPlaceHolder'
import GitHubCalendar from "@/components/sections/GitHubCalendar";
import FeaturedBanner from "@/components/sections/FeaturedBanner";
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