import { useState, useContext } from "react";
import { 
    CircleX, LayoutTemplate, Blocks, Baseline, Palette, 
    Info, Download
} from "lucide-react";
import SectionHandler from './SectionHandler';
import Widgets from './Widgets';
import Typography from './Typography';
import ColorCustomizer from './ColorCustomizer';
import { globalContext } from "@/context/GlobalContext";

import { useSelector } from 'react-redux';
const sidebarOptions = [
    { id: "sections", icon: LayoutTemplate, label: "Sections", color: "#FF7043", component: SectionHandler },
    { id: "widgets", icon: Blocks, label: "Widgets", color: "#42A5F5", component: Widgets },
    { id: "styles", icon: Baseline, label: "Typography", color: "#7E57C2", component: Typography },
    { id: "theme", icon: Palette, label: "Theme", color: "#66BB6A", component: ColorCustomizer },
];

const SideBar = () => {
    const { activeTab, setActiveTab } = useContext(globalContext);
    const [showInfo, setShowInfo] = useState(false);

    const activeOption = sidebarOptions.find(option => option.id === activeTab);
    const page = useSelector((state) => state.page.value);
    const downloadJSON = () => {
        const jsonString = JSON.stringify(page, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'portfolio.json';
        link.click();
    };
    return (
        <div className="sidebar-container">
            <aside className="left-sidebar">
                <ul>
                    {sidebarOptions.map(({ id, icon: Icon, label, color }) => (
                        <li 
                            key={id} 
                            className={`sidebar-item ${activeTab === id ? 'active' : ''}`} 
                            style={{ '--active-bg-color': activeTab === id ? color : '' }}
                            onClick={() => setActiveTab(id)}
                        >
                            <Icon />
                        </li>
                    ))}
                </ul>
                <div className="sidebar-actions">
                    <button className="action-btn" title="Info" onClick={() => setShowInfo(true)}>
                        <Info />
                    </button>
                    <button className="action-btn" title="Download JSON" onClick={downloadJSON}>
                        <Download />
                    </button>
                        {/* Info Popup */}
                {showInfo && (
                    <div className="info-popup-overlay" >
                        <div className="info-popup">
                                <h3>How to Use This Portfolio Builder</h3>
                                <p>1. Customize all sections with your personal information and preferred styles</p>
                                <p>2. Click "Download Portfolio" to save your portfolio.json file</p>
                                <p>3. Place the downloaded file in: <code>public/data/portfolio.json</code></p>
                                <p>4. Build your project: <code>npm run build</code></p>
                                <p>5. Deploy using: <code>npm run start</code> or your preferred hosting method</p>
                                <div className="note">
                                    <strong>Note:</strong> Ensure your JSON file matches the expected structure.
                                </div>
                                <button onClick={() => setShowInfo(false)}>Got It!</button>
                        </div>
                    </div>
                 
                )}
                </div>
            </aside>

            <main className={`tab-content ${activeTab ? 'active' : ''}`}>
                <div className="tab-content-header">
                    {activeOption?.label}
                    <CircleX  onClick={() => setActiveTab("")} />
                </div>
                
                {/* Render Component if it exists */}
                {activeOption?.component && <activeOption.component  onClose={() => setActiveTab("")}   />}
            </main>
        </div>
    );
};

export default SideBar;
