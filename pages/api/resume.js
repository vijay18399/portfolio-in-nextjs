export default function handler(req, res) {
  res.status(200).json({
    "template": "resume_template",
    "sections": [
      {
        "title": "",
        "description": "Basic contact and professional details.",
        "template": "personal_info_template",
        "email": "vijayreddy18399@gmail.com",
        "mobile": "+91-6301832161",
        "portfolio": "vijay18399.github.io",
        "linkedin": "linkedin.com/in/vijay18399"
      },
      {
        "title": "Summary",
        "description": "Overview of experience and expertise.",
        "template": "professional_summary_template",
        "summary": "Front-End Developer with 4 years of experience specializing in React, Next.js, and Angular, with expertise in web performance optimization, responsive design, and cross-browser compatibility. Proficient in JavaScript frameworks. Skilled in HTML5, CSS3, and TypeScript, focused on delivering clean, high-performance web experiences."
      },
      {
        "title": "Experience",
        "description": "Professional roles and responsibilities.",
        "template": "experience_template",
        "children": [
          {
            "company": "Next Education",
            "location": "Hyderabad, Telangana",
            "position": "Engineer",
            "duration": "Aug 2022 - Present",
            "responsibilities": [
              "Developing features and products from scratch as part of the JS Team in the Research and Development Department.",
              "Responsible for troubleshooting issues, extending libraries, and delivering efficient solutions in a fast-paced environment.",
              "Developing a Web builder using React and GrapesJS in a Next.js environment.",
              "Developed UI for 10+ AI-based learning tools in the Speaking and Writing categories.",
              "Developed an internal application for the field team using Angular 15, Electron.js, and Node.js.",
              "Created a Node.js script to automate AR DB generation.",
              "Migrated 12+ Flash-based 2D simulations to Angular using Raphael.js.",
              "Engineered a mobile-friendly annotation tool for PDFs and images using Fabric.js."
            ]
          },
          {
            "company": "Tata Consultancy Services",
            "location": "Remote",
            "position": "Assistant System Engineer",
            "duration": "July 2019 - Sept 2019",
            "responsibilities": [
              "Provided support for multiple .NET maintenance projects.",
              "Wrote SQL queries for generating reports and resolving faulty data.",
              "Conducted R&D and upgraded 200+ servers on schedule.",
              "Implemented cascading dropdowns and displayed reports based on user selection."
            ]
          }
        ]
      },
      {
        "title": "Programming Skills",
        "description": "Core competencies and technical expertise.",
        "template": "skills_template",
        "skills": ["React.js", "Next.js", "Angular", "TypeScript", "HTML5", "CSS3", "JavaScript", "Node.js", "Electron.js", "Fabric.js", "Raphael.js", "Highcharts", "D3.js", "Grapes.js", "Vis.js", "Canvas", "REST API"]
      },
      {
        "title": "Projects",
        "description": "Key projects developed.",
        "template": "project_template",
        "children": [
          {
            "title": "NgBoard",
            "description": "Developed an interactive digital whiteboard with drawing tools, text annotations, and advanced features like a laser pointer, smooth brush strokes, and a paint bucket by extending Fabric.js brushes.",
            "tools_used": ["Angular", "Fabric.js"]
          },
          {
            "title": "Spell Bee",
            "description": "Developed an interactive spelling app where users practice words categorized by difficulty levels (A1 to C1). Built a Node.js-powered backend with SQLite for word storage and retrieval.",
            "tools_used": ["Angular", "Angular Material", "NgRx", "Node.js", "SQLite"]
          }
        ]
      },
      {
        "title": "Publications",
        "description": "Published research work.",
        "template": "publication_template",
        "children": [
          {
            "title": "An Enhanced Messenger with Language Translator and Sentiment Analysis",
            "authors": ["M Vijay Reddy", "N. Soundarya", "M.N.V Ravindra", "K. Sai Srujana"],
            "journal": "International Journal of Advance Study and Research Work",
            "date": "Sept 2020",
            "pages": "98-107",
            "issn": "2581-5997"
          }
        ]
      },
      {
        "title": "Certifications",
        "description": "Professional certifications.",
        "template": "certification_template",
        "certifications": [
          "NPTEL Certification: Modern Web Application Development",
          "MTA Certification: Introduction to Programming Using Python",
          "NPTEL Certification: Programming, Data Structures, and Algorithms Using Python"
        ]
      },
      {
        "title": "Education",
        "description": "Educational qualifications.",
        "template": "education_template",
        "institution": "Aditya Engineering College",
        "location": "Kakinada, Andhra Pradesh",
        "degree": "B.Tech in Computer Science",
        "cgpa": "8.01",
        "duration": "Jun 2016 - Sept 2020"
      }
    ]
  }
  );
}


