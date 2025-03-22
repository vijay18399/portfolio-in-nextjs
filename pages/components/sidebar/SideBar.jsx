import { useState } from "react";
import { 
    LayoutTemplate, Blocks, Baseline, Palette, 
    ImagePlus, FileText, Edit, MoveRight, Link 
} from "lucide-react";
import SectionHandler from './SectionHandler';
import Widgets from './Widgets'
import Typography from './Typography'
import ColorCustomizer from './ColorCustomizer'
import styled from "styled-components";

const sidebarOptions = [
    { id: "sections", icon: LayoutTemplate, label: "Sections", color: "#FF7043", component: SectionHandler }, 
    { id: "widgets", icon: Blocks, label: "Widgets", color: "#42A5F5",component:Widgets }, 
    { id: "styles", icon: Baseline, label: "Typography", color: "#7E57C2",component:Typography }, 
    { id: "theme", icon: Palette, label: "Theme", color: "#66BB6A", component:ColorCustomizer }, 
    // { id: "background", icon: ImagePlus, label: "Background Image", color: "#FFCA28" }, 
    // { id: "resume", icon: FileText, label: "Upload Resume", color: "#26A69A" }, 
    // { id: "titles", icon: Edit, label: "Section Titles", color: "#EC407A" }, 
    // { id: "animations", icon: MoveRight, label: "Animations", color: "#AB47BC" }, 
    // { id: "social", icon: Link, label: "Social Links", color: "#78909C" } 
];

const SideBar = () => {
    const [activeTab, setActiveTab] = useState("sections");

    // Find active tab details
    const activeOption = sidebarOptions.find(option => option.id === activeTab);

    return (
        <SidebarContainer>
            <LeftSidebar>
                <ul>
                    {sidebarOptions.map(({ id, icon: Icon, label, color }) => (
                        <SidebarItem 
                            key={id} 
                            isActive={activeTab === id}
                            bgColor={activeTab === id ? color : ""}
                            onClick={() => setActiveTab(id)}
                        >
                            <Icon />
                        </SidebarItem>
                    ))}
                </ul>
            </LeftSidebar>

            {/* Tab Content Area */}
            <TabContent>
                <TabContentHeader>
                    {activeOption?.label}
                </TabContentHeader>
                
                {/* Render Component if it exists */}
                {activeOption?.component && <activeOption.component />}
            </TabContent>
        </SidebarContainer>
    );
};

export default SideBar;

// Styled Components
const SidebarContainer = styled.div`
    display: flex;
`;

const LeftSidebar = styled.aside`
    width: 55px;
    border-right: 1px solid #ccc;
    display: flex;
    background-color: #fff;
    justify-content: center;
`;

const SidebarItem = styled.li`
    padding: 5px;
    color: ${(props) => (props.isActive ? '#ffffff' : "")};
    background-color: ${(props) => (props.isActive ? props.bgColor : "#ffffff")};
    cursor: pointer;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;

    &:hover {
        background-color: ${(props) => props.bgColor};
    }

    span {
        display: ${(props) => (props.isActive ? "inline" : "none")};
    }

    &.active {
        color: white;
    }
`;

const TabContent = styled.main`
    background-color: #fff;
    width: 260px;
    border-right: 1px solid #e2e2e2;
`;

const TabContentHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 8px;
    color: #000000;
    font-weight: 900;
    border-bottom: 1px solid #e2e2e2;
`;
