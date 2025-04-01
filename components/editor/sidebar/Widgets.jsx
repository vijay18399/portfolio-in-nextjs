import { addSection } from "@/features/page/pageSlice";
import { TicketSlash, Github,Briefcase, PanelTop, SquareUser, Layers, Youtube } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux'; 

export default function Widgets({onClose}) {
  const dispatch = useDispatch();

  const onAddSection = (widget) => {
    onClose()
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
          "links": [{ "title": "Download Resume", "href": "/resume.pdf" }]
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
      title: 'Experience',
      icon: Briefcase,
      component: {
        "title": "Experience",
        "template": "Experience",
        "data": {
          "title": "Experience",
          "description": "My work experience in various roles.",
          "items": [
            {
              "title": "Next Education",
              "role": "Engineer",
              "duration": "Aug 2022 - Present",
              "location": "Hyderabad, Telangana",
              "responsibilities": "Developed web applications using React and Angular."
            },
            {
              "title": "Tata Consultancy Services",
              "role": "Assistant System Engineer",
              "duration": "July 2019 - Sept 2020",
              "location": "Remote",
              "responsibilities": "Supported Angular front-ends and handled backend integrations."
            }
          ]
        }
      }
    },
    {
      title: 'Portfolio',
      icon: Layers,
      component: {
        "title": "Portfolio",
        "template": "Portfolio",
        "data": {
          "title": "Portfolio",
          "description": "A showcase of my projects.",
          "links": [
            { "title": "Portfolio Editor", "href": "?edit=true" },
            { "title": "Spell Bee Game", "href": "portfolio/spell-bee" },
            { "title": "Speak Right Tool", "href": "portfolio/pronunciation" }
          ]
        }
      }
    },
    {
      title: "Simple Banner",
      icon: TicketSlash,
      component: {
        "title": "Simple Banner",
        "template": "SimpleBanner",
        "data": {
          "description": "Thinking of a new project? Got any doubts? I'm here to help!",
          "links": [{ "title": "Contact", "href": "#contact" }]
        }
      }
    },
    {
      title: "Featured Banner", 
      icon: TicketSlash,
      component: {
        "title": "Featured Banner",
        "template": "FeaturedBanner",
        "data": {
          "title": "Check Out My YouTube Channel",
          "description": "Explore tutorials, projects, and more on my channel!",
          "links": [{ "title": "Visit My YouTube Channel", "href": "https://www.youtube.com/@vijayreddy4411" }]
        }
      }
    },
    {
      title: "GitHub Contributions",
      icon: Github,
      component: {
        "title": "GitHub Calendar",
        "template": "GitHubCalendar",
        "data": {
          "title": "GitHub Contributions",
          "github_username": "vijay18399"
        }
      }
    }
  ];
  

  return (
    <div className="widgets-list">
      {widgets.map((widget) => {
        let Icon = widget.icon;
        return (
          <div
            key={widget.title}
            className="widgets-item"
            onClick={() => onAddSection(widget)}
          >           
            <span>{widget.title}</span>
            {Icon ? <Icon size={24} /> : <img src={widget.imageUrl} alt={widget.title} width={40} height={40} />}
          </div>
        );
      })}
    </div>
  );
}
