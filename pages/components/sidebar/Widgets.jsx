import { addSection } from "@/features/page/pageSlice";
import { TicketSlash, Github, PanelTop, SquareUser, Code, Youtube } from "lucide-react";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux'; 

export default function Widgets() {
  const dispatch = useDispatch();

  const onAddSection = (widget) => {
    dispatch(addSection(widget.component));
  };

  let widgets = [
    {
      title: 'Intro',
      icon: SquareUser,
      component: {
        "title": "Intro",
        "template": "Intro",
        "data": {
          "title": "Hey 👋🏻 <br> I'm Vijay Reddy Medapati",
          "imageUrl": "/images/profile.png",
          "description": "Front-End Engineer with 4 years of experience in React, Next.js, and Angular, building dynamic and efficient web applications.",
          "links": [{ "title": "Download Resume", "href": "/resume.pdf" }],
        }
      }
    },
    {
      title: 'Header',
      icon: PanelTop,
      component: {
        "title": "Header",
        "template": "Header",
        "data": {
          "title": "VJ",
          "links": [
            { "title": "Home", "href": "/" },
            { "title": "Portfolio", "href": "/portfolio" },
            { "title": "LinkedIn", "href": "linkedin.com/in/vijay18399" },
            { "title": "Github", "href": "https://github.com/vijay18399" }
          ]
        }
      }
    },
    {
      title: "SimpleBanner",
      icon: TicketSlash,
      component: {
        "title": "SimpleBanner",
        "template": "SimpleBanner",
        "data": {
          "styles": { "backgroundColor": "var(--bg-card)" },
          "description": "Thinking of a new project? Got any doubts? I'm here to help!",
          "links": [{ "title": "Contact", "href": "#contact" }]
        }
      }
    },
    {
      title: "FeaturedBanner", 
      icon: TicketSlash,
      component: {
        "title": "FeaturedBanner",
        "template": "FeaturedBanner",
        "data": {
          "styles": { "backgroundColor": "var(--bg-card)" },
          "title": "Check Out My YouTube Channel",
          "description": "Explore tutorials, projects, and more on my channel!",
          "links": [{ "title": " Visit My YouTube Channel", "href": "https://www.youtube.com/@vijayreddy4411" }]
        }
      }
    },
    {
      title: "GitHub Contributions",
      icon: Github,
      component: {
        "title": "GitHubCalendar",
        "template": "GitHubCalendar",
        "data": {
          "styles": { "backgroundColor": "var(--bg-card)" },
          "title": "Here is So Far",
          "github_username": "vijay18399"
        }
      }
    },

  ];

  return (
    <WidgetsList>
      {widgets.map((widget) => {
        let Icon = widget.icon;
        return (
          <WidgetsItem
            key={widget.title}
            onClick={() => onAddSection(widget)}
          >           
            <span>{widget.title}</span>
            {Icon ? <Icon size={24} /> : <img src={widget.imageUrl} alt={widget.title} width={40} height={40} />}
          </WidgetsItem>
        );
      })}
    </WidgetsList>
  );
}

const WidgetsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const WidgetsItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: var(--gap-md);
  border-bottom: 1px solid var(--border-color);
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--bg-primary);
  }

  span {
    font-size: var(--font-p);
    color: var(--text-default-title);
  }
`;