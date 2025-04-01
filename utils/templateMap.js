import Section from "@/components/main/Section";
import IntroSection from "@/components/portfolio/Intro";
import Experience from "@/components/portfolio/Experience";
import Header from "@/components/portfolio/Header";
import SimpleBanner from "@/components/portfolio/SimpleBanner";
import Portfolio from "@/components/portfolio/Portfolio";
import SectionPlaceHolder from '@/components/main/SectionPlaceHolder'
import GitHubCalendar from "@/components/portfolio/GitHubCalendar";
import FeaturedBanner from "@/components/portfolio/FeaturedBanner";
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
        properties: ["title","description","items"]
    },
    "Portfolio": {
        component: Portfolio,
        properties: ["title", "description","links"]
    },
    "SectionPlaceHolder": {
        component: SectionPlaceHolder,
        properties: ["title"]
    }
};
export default templateMap