import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
const API_BASE_URL = "https://brandnest-backend.onrender.com";

const projects = [
  {
    no: "01",
    name: "Pranali Mehendi Arts",
    type: "Beauty & Services",
    className: "mehendi",
    description:
      "An elegant digital presence designed to showcase mehendi artistry, services and customer bookings.",
    link: "https://mehandiweb.vercel.app/",
  },
  {
    no: "02",
    name: "Trupti Machhi Khanaval",
    type: "Restaurant",
    className: "food",
    description:
      "A food-focused website built around local identity, menu discovery and customer trust.",
    link: "https://trupti-machhi-khanaval.vercel.app/",
  },
  {
    no: "03",
    name: "SoulMate Café",
    type: "Café",
    className: "cafe",
    description:
      "A modern café experience combining atmosphere, menu presentation and an easy customer journey.",
    link: "https://tasty-cafe-frontend-five.vercel.app/",
  },
  {
    no: "04",
    name: "Shivba Clothing",
    type: "Fashion & Retail",
    className: "fashion",
    description:
      "A fashion-forward storefront concept created to present collections with a clean shopping experience.",
    link: "https://example.com/shivba-clothing",
  },
  {
    no: "05",
    name: "Dipesh Studios",
    type: "Photography & Creative",
    className: "photo",
    description:
      "A visual portfolio experience for photography, editing and creative services.",
    link: "https://example.com/dipesh-studios",
  },
];

const services = [
  {
    no: "01",
    slug: "web-development",
    title: "Web Development",
    icon: "◉",
    text: "Responsive and scalable websites designed around your business goals and customers.",
    details: {
      overview:
        "BrandNest turns your business idea into a functional, responsive website that is easy to use, easy to maintain and built around your real customer journey.",
      includes: [
        "Responsive website development",
        "Business and service pages",
        "Contact and enquiry sections",
        "Interactive forms and calls to action",
        "Performance-focused structure",
      ],
      process: [
        "Understand the business and website requirements.",
        "Plan the page structure and content flow.",
        "Develop the responsive frontend experience.",
        "Test navigation, forms and mobile layouts.",
        "Prepare the website for launch and future updates.",
      ],
      idealFor:
        "Small businesses, personal brands, service providers, startups and local businesses that need a professional online presence.",
    },
  },
  {
    no: "02",
    slug: "ui-ux-design",
    title: "UI / UX Design",
    icon: "◇",
    text: "Clean interfaces, strong visual hierarchy and thoughtful user experiences.",
    details: {
      overview:
        "BrandNest creates interfaces that make information easy to understand while keeping the visual identity consistent with the business.",
      includes: [
        "Page and section structure",
        "Visual hierarchy",
        "Navigation planning",
        "Responsive interface layouts",
        "Clear calls to action",
      ],
      process: [
        "Understand the users and business goals.",
        "Define the information hierarchy.",
        "Plan layouts and user journeys.",
        "Create the visual interface direction.",
        "Refine the experience for different screen sizes.",
      ],
      idealFor:
        "Businesses that want a modern website experience with clearer navigation, stronger presentation and better customer interaction.",
    },
  },
  {
    no: "03",
    slug: "seo-optimization",
    title: "SEO Optimization",
    icon: "⌕",
    text: "Technical, on-page and local SEO foundations that improve online discoverability.",
    details: {
      overview:
        "BrandNest builds SEO into the website structure so search engines can understand the content and customers have a better chance of discovering the business.",
      includes: [
        "Technical SEO foundations",
        "Page titles and metadata",
        "Heading and content structure",
        "Keyword-focused page content",
        "Local SEO considerations",
      ],
      process: [
        "Understand the business, audience and search intent.",
        "Review the website structure and content.",
        "Optimize important on-page elements.",
        "Improve technical and performance foundations.",
        "Prepare a structure that supports ongoing content growth.",
      ],
      idealFor:
        "Local businesses, service businesses and brands that want their website to support online discovery and search visibility.",
    },
  },
  {
    no: "04",
    slug: "e-commerce",
    title: "E-commerce",
    icon: "□",
    text: "Product-focused websites with intuitive browsing and conversion-ready layouts.",
    details: {
      overview:
        "BrandNest designs product-focused experiences that make it easier for customers to browse products, understand offerings and take action.",
      includes: [
        "Product listing layouts",
        "Product detail sections",
        "Category and navigation structure",
        "Conversion-focused calls to action",
        "Mobile-friendly shopping experience",
      ],
      process: [
        "Understand the products and target customers.",
        "Plan categories, navigation and product information.",
        "Design the shopping experience.",
        "Develop and test product-focused pages.",
        "Prepare the experience for launch and improvements.",
      ],
      idealFor:
        "Small retailers, fashion brands, product businesses and businesses moving their offerings online.",
    },
  },
  {
    no: "05",
    slug: "ai-solutions",
    title: "AI Solutions",
    icon: "✦",
    text: "Practical AI-powered solutions and automation concepts for modern businesses.",
    details: {
      overview:
        "BrandNest explores practical AI solutions that can reduce repetitive work, improve customer interactions and support business processes.",
      includes: [
        "AI-powered website features",
        "Automation concepts",
        "AI-assisted customer interactions",
        "Business workflow ideas",
        "Practical solution planning",
      ],
      process: [
        "Identify a real business problem or repetitive task.",
        "Define the expected AI-assisted workflow.",
        "Choose the appropriate solution approach.",
        "Build and test the required interaction.",
        "Refine the solution around actual business usage.",
      ],
      idealFor:
        "Businesses that want to explore useful AI features or automate selected digital workflows without changing their entire operation.",
    },
  },
  {
    no: "06",
    slug: "digital-growth",
    title: "Digital Growth",
    icon: "↗",
    text: "Content, performance and digital strategies designed for long-term growth.",
    details: {
      overview:
        "BrandNest connects website, content, SEO and digital performance into a practical growth workflow focused on improving the overall online presence.",
      includes: [
        "Digital presence planning",
        "Content direction",
        "SEO-focused growth support",
        "Performance considerations",
        "Ongoing improvement ideas",
      ],
      process: [
        "Understand current digital presence and goals.",
        "Identify gaps in content, visibility and experience.",
        "Plan the highest-value improvements.",
        "Implement and review the digital changes.",
        "Continue improving based on business needs.",
      ],
      idealFor:
        "Growing businesses that already have a digital presence but want a more connected approach to website, SEO, content and online visibility.",
    },
  },
];


const process = [
  {
    no: "01",
    title: "Discovery",
    text: "Understanding your business, audience, goals and requirements.",
  },
  {
    no: "02",
    title: "Strategy",
    text: "Planning the structure, content, technology and visual direction.",
  },
  {
    no: "03",
    title: "UI / UX Design",
    text: "Creating a clean and responsive interface around your brand identity.",
  },
  {
    no: "04",
    title: "Development",
    text: "Turning the approved design into a functional digital experience.",
  },
  {
    no: "05",
    title: "SEO Optimization",
    text: "Optimizing structure, content and technical foundations for search.",
  },
  {
    no: "06",
    title: "Launch & Support",
    text: "Preparing the project for deployment and future improvements.",
  },
];

const faqs = [
  {
    question: "What does BrandNest provide?",
    answer:
      "BrandNest combines website development, UI/UX design, SEO optimization and digital-growth services in one platform.",
  },
  {
    question: "Can BrandNest create websites for different industries?",
    answer:
      "Yes. Our project demonstrates digital experiences for mehendi services, food, cafés, clothing and photography.",
  },
  {
    question: "Will the websites be responsive?",
    answer:
      "Yes. BrandNest websites are designed to provide a smooth experience across desktop, tablet and mobile devices.",
  },
  {
    question: "Is SEO included in the website process?",
    answer:
      "SEO is considered from the beginning through technical structure, content, performance and on-page optimization.",
  },
];

function getServiceFromHash() {
  const match = window.location.hash.match(/^#\/service\/(.+)$/);
  if (!match) return null;

  const slug = decodeURIComponent(match[1]);
  return services.find((service) => service.slug === slug) || null;
}

function ServicePage({ service }) {
  const handleBack = () => {
    window.location.hash = "services";
  };

  return (
    <div className="brandnest service-page">
      <header className="navbar">
        <div className="container nav-container">
          <a
            href="#home"
            className="logo"
            onClick={(event) => {
              event.preventDefault();
              window.location.hash = "home";
            }}
          >
            <span className="logo-box">B</span>
            <span className="logo-text">
              Brand<span>Nest</span>
            </span>
          </a>

          <button className="service-back-button" onClick={handleBack}>
            ← Back to Services
          </button>
        </div>
      </header>

      <main>
        <section className="section service-detail-section">
          <div className="container">
            <div className="service-detail-top">
              <div className="eyebrow">
                <span></span>
                SERVICE {service.no}
              </div>

              <div className="service-detail-icon">{service.icon}</div>
            </div>

            <h1>{service.title}</h1>

            <p className="service-detail-intro">
              {service.details.overview}
            </p>

            <div className="service-detail-grid">
              <div className="service-detail-block">
                <span className="service-detail-label">
                  WHAT'S INCLUDED
                </span>

                <div className="service-detail-list">
                  {service.details.includes.map((item) => (
                    <div key={item} className="service-detail-list-item">
                      <span>✓</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="service-detail-block">
                <span className="service-detail-label">
                  HOW WE WORK
                </span>

                <div className="service-detail-list">
                  {service.details.process.map((item, index) => (
                    <div
                      key={item}
                      className="service-detail-list-item"
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="service-detail-fit">
              <span className="service-detail-label">
                IDEAL FOR
              </span>
              <p>{service.details.idealFor}</p>
            </div>

            <button
              className="primary-button service-detail-cta"
              onClick={handleBack}
            >
              Explore All Services ↗
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [faqItems] = useState(faqs);
  const [faqQueryOpen, setFaqQueryOpen] = useState(false);
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqName, setFaqName] = useState("");
  const [faqEmail, setFaqEmail] = useState("");
  const [ctaOpen, setCtaOpen] = useState(false);
  const [ctaSubmitted, setCtaSubmitted] = useState(false);

  const [ctaForm, setCtaForm] = useState({
    name: "",
    email: "",
    type: "",
    budget: "",
    idea: "",
  });

  const [currentService, setCurrentService] = useState(
    getServiceFromHash
  );

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const syncServicePage = () => {
      const service = getServiceFromHash();
      setCurrentService(service);

      if (!service && window.location.hash) {
        const sectionId = window.location.hash.replace("#", "");

        window.setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({
            behavior: "smooth",
          });
        }, 0);
      }
    };

    window.addEventListener("hashchange", syncServicePage);

    return () =>
      window.removeEventListener("hashchange", syncServicePage);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const openService = (service) => {
    window.location.hash = `/service/${service.slug}`;
  };

  const handleCtaChange = (event) => {
    const { name, value } = event.target;

    setCtaForm((current) => ({
      ...current,
      [name]: value,
    }));

    setCtaSubmitted(false);
  };

  const handleCtaSubmit = async (event) => {
  event.preventDefault();
  
  try {
    
    const response = await axios.post(
      `${API_BASE_URL}/api/conversations`,
      {
        name: ctaForm.name,
        email: ctaForm.email,
        subject: `PROJECT INQUIRY - BrandNest - ${ctaForm.type}`,
        message: `Project Type: ${ctaForm.type}

Budget: ${ctaForm.budget || "Not specified"}

Project Idea:
${ctaForm.idea}`,
      }
    );

    console.log("Conversation created:", response.data);

    setCtaSubmitted(true);

    setCtaForm({
      name: "",
      email: "",
      type: "",
      budget: "",
      idea: "",
    });
  } catch (error) {
    console.error("Conversation submission error:", error);

    alert(
      error.response?.data?.message ||
        "Unable to send your query. Please try again."
    );
  }
};

  const handleFaqSubmit = async (event) => {
  event.preventDefault();

  const question = faqQuestion.trim();

  if (!question) return;

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/conversations`,
      {
        name: faqName || "Not provided",
        email: faqEmail || "Not provided",
        subject: "FAQ QUESTION - BrandNest",
        message: question,
      }
    );

    console.log("FAQ query created:", response.data);

    setFaqQuestion("");
    setFaqName("");
    setFaqEmail("");
    setFaqQueryOpen(false);

    alert("Your question has been submitted successfully!");
  } catch (error) {
    console.error("FAQ submission error:", error);

    alert(
      error.response?.data?.message ||
        "Unable to submit your question. Please try again."
    );
  }
};

  if (currentService) {
    return <ServicePage service={currentService} />;
  }

  return (
    <div className="brandnest">

      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="container nav-container">

          <a href="#home" className="logo" onClick={closeMenu}>
            <span className="logo-box">B</span>

            <span className="logo-text">
              Brand<span>Nest</span>
            </span>
          </a>

          <nav
            className={
              menuOpen
                ? "nav-links mobile-active"
                : "nav-links"
            }
          >
            <a href="#about" onClick={closeMenu}>
              About
            </a>

            <a href="#services" onClick={closeMenu}>
              Services
            </a>

            <a href="#work" onClick={closeMenu}>
              Our Work
            </a>

            <a href="#process" onClick={closeMenu}>
              Process
            </a>

            <a href="#seo" onClick={closeMenu}>
              SEO
            </a>

            <a
              href="#contact"
              className="nav-button"
              onClick={closeMenu}
            >
              Get Started <span>↗</span>
            </a>
          </nav>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            {menuOpen ? "×" : "☰"}
          </button>

        </div>
      </header>


      {/* ================= HERO ================= */}
      <section id="home" className="hero">

        <div className="hero-background-circle circle-one"></div>
        <div className="hero-background-circle circle-two"></div>

        <div className="container hero-container">

          <div className="hero-content reveal">

            <div className="eyebrow">
              <span></span>
              DIGITAL SOLUTIONS · WEB · SEO · GROWTH
            </div>

            <h1>
              Build your brand.
              <br />
              <span>Grow your business.</span>
            </h1>

            <p>
              BrandNest creates professional websites and digital
              experiences designed to make businesses look better,
              perform better and get discovered online.
            </p>

            <div className="hero-buttons">

              <a href="#contact" className="primary-button">
                Start a Project
                <span>↗</span>
              </a>

              <a href="#work" className="outline-link">
                Explore Our Work
                <span>↗</span>
              </a>

            </div>

            <div className="hero-status">
              <span className="green-dot"></span>
              From idea to launch — one digital partner.
            </div>

          </div>


          {/* HERO VISUAL */}
          <div className="hero-visual reveal">

            <div className="orbit orbit-large"></div>
            <div className="orbit orbit-small"></div>

            <div className="hero-main-card">

              <div className="card-top">
                <span>BRANDNEST / 2026</span>
                <span>01 — 05</span>
              </div>

              <div className="hero-card-content">

                <div className="hero-card-label">
                  ✦ &nbsp; DIGITAL GROWTH
                </div>

                <h2>
                  Websites
                  <br />
                  that <span>work.</span>
                </h2>

                <p>
                  WEB + SEO + DESIGN
                </p>

              </div>

              <div className="card-bottom">
                <span>BRANDNEST DIGITAL</span>
                <span>↗</span>
              </div>

            </div>

            <div className="floating-card floating-card-one">
              <strong>✦</strong>
              <span>Creative Design</span>
            </div>

            <div className="floating-card floating-card-two">
              <strong>⌕</strong>
              <span>SEO Ready</span>
            </div>

          </div>

        </div>

        <div className="scroll-indicator">
          SCROLL TO EXPLORE
          <span></span>
        </div>

      </section>


      {/* ================= STATS ================= */}
      <section className="stats-section">

        <div className="container stats-container">

          <div className="stat">
            <strong>05</strong>
            <span>Client Websites</span>
          </div>

          <div className="stat">
            <strong>06</strong>
            <span>Core Services</span>
          </div>

          <div className="stat">
            <strong>05</strong>
            <span>Business Industries</span>
          </div>

          <div className="stat last-stat">
            <strong>01</strong>
            <span>Digital Partner</span>
          </div>

        </div>

      </section>


      {/* ================= ABOUT ================= */}
      <section id="about" className="section about-section">

        <div className="container two-column">

          <div className="section-title reveal">

            <div className="eyebrow">
              <span></span>
              WHO WE ARE
            </div>

            <h2>
              Your digital growth partner —
              <br />
              from idea to launch.
            </h2>

          </div>

          <div className="about-text reveal">

            <p className="large-text">
              BrandNest is a digital-solutions platform focused on
              helping businesses establish a stronger online presence.
            </p>

            <p>
              Instead of treating design, development and SEO as
              separate pieces, BrandNest brings them together into
              one connected workflow.
            </p>

            <p>
              The goal is simple: create a website that looks
              professional, works smoothly and has a strong foundation
              for online visibility.
            </p>

            <a href="#services" className="simple-link">
              Discover our capabilities ↗
            </a>

          </div>

        </div>

      </section>


      {/* ================= SERVICES ================= */}
      <section id="services" className="section services-section">

        <div className="container">

          <div className="section-header-row reveal">

            <div>

              <div className="eyebrow">
                <span></span>
                WHAT WE DO
              </div>

              <h2>
                Everything your digital
                <br />
                presence needs.
              </h2>

            </div>

            <p>
              From strategy and interface design to development
              and SEO, BrandNest brings the essential digital
              building blocks together.
            </p>

          </div>


          <div className="services-grid">

            {services.map((service) => (

              <div
                className="service-card reveal"
                key={service.no}
                onClick={() => openService(service)}
                role="button"
                tabIndex="0"
                onKeyDown={(event) => {

                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    openService(service);
                  }

                }}
              >

                <div className="service-number">
                  {service.no}
                </div>

                <div className="service-icon">
                  {service.icon}
                </div>

                <h3>{service.title}</h3>

                <p>{service.text}</p>

                <div className="service-bottom">
                  Learn More
                  <span>↗</span>
                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= PROCESS ================= */}
      <section id="process" className="section process-section">

        <div className="container">

          <div className="section-header-row reveal">

            <div>

              <div className="eyebrow">
                <span></span>
                OUR MODEL
              </div>

              <h2>
                A clear process.
                <br />
                A better outcome.
              </h2>

            </div>

            <p>
              Our workflow keeps business requirements, design,
              technology and visibility connected from beginning
              to end.
            </p>

          </div>


          <div className="process-list">

            {process.map((item) => (

              <div
                className="process-item reveal"
                key={item.no}
              >

                <span className="process-number">
                  {item.no}
                </span>

                <h3>{item.title}</h3>

                <p>{item.text}</p>

                <span className="process-arrow">
                  ↗
                </span>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= WORK ================= */}
      <section id="work" className="section work-section">

        <div className="container">

          <div className="section-header-row work-header reveal">

            <div>

              <div className="eyebrow light-eyebrow">
                <span></span>
                SELECTED WORK
              </div>

              <h2>
                Our client
                <br />
                websites.
              </h2>

            </div>

            <p>
              Five different businesses. Five different digital
              identities. One BrandNest workflow.
            </p>

          </div>


          <div className="projects-grid">

            {projects.map((project) => (

              <div
  className={`project-card ${project.className} reveal`}
  key={project.name}
  onClick={() => window.open(project.link, "_blank")}
  role="link"
  tabIndex="0"
  onKeyDown={(event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      window.open(project.link, "_blank");
    }
  }}
>

                <div className="project-header">
                  <span>{project.no}</span>
                  <span>{project.type}</span>
                </div>

                <div className="project-display">

                  <div className="browser-window">

                    <div className="browser-top">
                      <span></span>
                      <span></span>
                      <span></span>
                      <small>brandnest.project</small>
                    </div>

                    <div className="browser-content">

                      <small>{project.type}</small>

                      <h3>
                        {project.name}
                      </h3>

                      <div className="fake-lines">
                        <i></i>
                        <i></i>
                        <i></i>
                      </div>

                      <button
  type="button"
  onClick={(event) => {
    event.stopPropagation();
    window.open(project.link, "_blank");
  }}
>
  Explore
</button>

                    </div>

                  </div>

                </div>

                <div className="project-info">

                  <div>

                    <h3>{project.name}</h3>

                    <p>{project.description}</p>

                  </div>

                  <span className="project-arrow">
                    ↗
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= SEO ================= */}
      <section id="seo" className="section seo-section">

        <div className="container seo-container reveal">

          <div className="seo-content">

            <div className="eyebrow">
              <span></span>
              SEO OPTIMIZATION
            </div>

            <h2>
              Build it.
              <br />
              <span>Optimize it.</span>
              <br />
              Get found.
            </h2>

            <p>
              A beautiful website is only the beginning. BrandNest
              builds SEO foundations into the digital experience
              so your business has a better opportunity to be
              discovered online.
            </p>

            <a href="#contact" className="primary-button">
              Talk About SEO ↗
            </a>

          </div>


          <div className="seo-dashboard">

            <div className="seo-heading">
              <span>BRANDNEST</span>
              <strong>SEO FOUNDATION</strong>
            </div>

            <div className="seo-item">

              <span>01</span>

              <div>
                <strong>Technical SEO</strong>
                <small>
                  Structure, performance & crawlability
                </small>
              </div>

              <b>✓</b>

            </div>

            <div className="seo-item">

              <span>02</span>

              <div>
                <strong>On-Page SEO</strong>
                <small>
                  Keywords, headings & metadata
                </small>
              </div>

              <b>✓</b>

            </div>

            <div className="seo-item">

              <span>03</span>

              <div>
                <strong>Local SEO</strong>
                <small>
                  Business visibility for local customers
                </small>
              </div>

              <b>✓</b>

            </div>

            <div className="seo-item">

              <span>04</span>

              <div>
                <strong>Content Strategy</strong>
                <small>
                  Content around search intent
                </small>
              </div>

              <b>✓</b>

            </div>

            <div className="seo-status">
              <span>SEO FOUNDATION</span>
              <strong>READY</strong>
            </div>

          </div>

        </div>

      </section>


      {/* ================= WHY BRANDNEST ================= */}
      <section className="section why-section">

        <div className="container">

          <div className="center-title reveal">

            <div className="eyebrow">
              <span></span>
              WHY BRANDNEST
            </div>

            <h2>
              Professional by design.
              <br />
              Practical by purpose.
            </h2>

          </div>


          <div className="why-grid">

            <div className="why-card reveal">

              <span>01</span>

              <h3>Creative Design</h3>

              <p>
                Modern interfaces with a clear and memorable
                visual identity.
              </p>

            </div>


            <div className="why-card reveal">

              <span>02</span>

              <h3>Responsive Development</h3>

              <p>
                Experiences designed for desktop, tablet
                and mobile devices.
              </p>

            </div>


            <div className="why-card reveal">

              <span>03</span>

              <h3>SEO Ready</h3>

              <p>
                Search-friendly foundations considered from
                the beginning.
              </p>

            </div>


            <div className="why-card reveal">

              <span>04</span>

              <h3>Personalized Support</h3>

              <p>
                A focused workflow built around the actual
                business requirement.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FAQ ================= */}
      <section className="section faq-section">

        <div className="container faq-container">

          <div className="faq-title reveal">

            <div className="eyebrow">
              <span></span>
              FAQ
            </div>

            <h2>
              Questions,
              <br />
              answered.
            </h2>

            <p>
              Everything you need to understand the BrandNest
              approach.
            </p>

          </div>


          <div className="faq-list">

            {faqItems.map((item, index) => (

              <div
                className={`faq-item ${
                  activeFaq === index ? "faq-active" : ""
                }`}
                key={`${item.question}-${index}`}
              >

                <button
                  type="button"
                  onClick={() =>
                    setActiveFaq(
                      activeFaq === index ? null : index
                    )
                  }
                >

                  <span>{item.question}</span>

                  <b>
                    {activeFaq === index ? "−" : "+"}
                  </b>

                </button>

                {activeFaq === index && (
                  <p>{item.answer}</p>
                )}

              </div>

            ))}

          </div>


          <div className="faq-query-box">

            {!faqQueryOpen ? (

              <button
                type="button"
                className="faq-ask-button"
                onClick={() => setFaqQueryOpen(true)}
              >
                Ask a Question <span>↗</span>
              </button>

            ) : (

              <form
                className="faq-query-form"
                onSubmit={handleFaqSubmit}
              >

                <div className="faq-query-fields">

                  <input
                    type="text"
                    placeholder="Your name"
                    value={faqName}
                    onChange={(event) =>
                      setFaqName(event.target.value)
                    }
                  />

                  <input
                    type="email"
                    placeholder="Your email"
                    value={faqEmail}
                    onChange={(event) =>
                      setFaqEmail(event.target.value)
                    }
                  />

                </div>

                <textarea
                  placeholder="Write your question..."
                  value={faqQuestion}
                  onChange={(event) =>
                    setFaqQuestion(event.target.value)
                  }
                  required
                />

                <div className="faq-query-actions">

                  <button
                    type="button"
                    className="faq-cancel-button"
                    onClick={() => setFaqQueryOpen(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="faq-submit-button"
                  >
                    Send Query ↗
                  </button>

                </div>

              </form>

            )}

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section id="contact" className="cta-section">

        <div className="container cta-container reveal">

          <div className="eyebrow light-eyebrow">
            <span></span>
            LET'S BUILD
          </div>

          <h2>
            Have an idea?
            <br />
            <span>Let's make it digital.</span>
          </h2>

          <p>
            Tell us what you want to build, improve or grow.
            BrandNest can take it from concept to a professional
            digital presence.
          </p>


          {!ctaOpen ? (

            <button
              type="button"
              className="white-button"
              onClick={() => setCtaOpen(true)}
            >
              Start a Conversation ↗
            </button>

          ) : (

            <form
              className="cta-form"
              onSubmit={handleCtaSubmit}
            >

              <div className="cta-form-grid">

                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={ctaForm.name}
                  onChange={handleCtaChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={ctaForm.email}
                  onChange={handleCtaChange}
                  required
                />

                <select
                  name="type"
                  value={ctaForm.type}
                  onChange={handleCtaChange}
                  required
                >

                  <option value="">
                    What do you want to build?
                  </option>

                  <option value="Website">
                    Website
                  </option>

                  <option value="E-commerce">
                    E-commerce
                  </option>

                  <option value="UI / UX Design">
                    UI / UX Design
                  </option>

                  <option value="SEO Optimization">
                    SEO Optimization
                  </option>

                  <option value="AI Solution">
                    AI Solution
                  </option>

                  <option value="Digital Growth">
                    Digital Growth
                  </option>

                  <option value="Something Else">
                    Something Else
                  </option>

                </select>

                <input
                  type="text"
                  name="budget"
                  placeholder="Budget (optional)"
                  value={ctaForm.budget}
                  onChange={handleCtaChange}
                />

              </div>


              <textarea
                name="idea"
                placeholder="Tell us your idea, requirements, features, industry or anything else you have in mind..."
                value={ctaForm.idea}
                onChange={handleCtaChange}
                required
              />


              <div className="cta-form-actions">

                <button
                  type="button"
                  className="cta-cancel-button"
                  onClick={() => setCtaOpen(false)}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="white-button"
                >
                  Send Project Query ↗
                </button>

              </div>


              {ctaSubmitted && (
  <small className="cta-form-success">
    Your project inquiry has been submitted successfully!
  </small>
)}

            </form>

          )}

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="footer">

        <div className="container footer-grid">

          <div className="footer-about">

            <a
              href="#home"
              className="logo footer-logo"
            >

              <span className="logo-box">
                B
              </span>

              <span className="logo-text">
                Brand<span>Nest</span>
              </span>

            </a>

            <p>
              Build your brand.
              <br />
              Grow your business.
            </p>

          </div>


          <div className="footer-column">

            <small>NAVIGATE</small>

            <a href="#about">
              About
            </a>

            <a href="#services">
              Services
            </a>

            <a href="#work">
              Our Work
            </a>

            <a href="#contact">
              Contact
            </a>

          </div>


          <div className="footer-column">

            <small>SERVICES</small>

            <span>
              Web Development
            </span>

            <span>
              UI / UX Design
            </span>

            <span>
              SEO Optimization
            </span>

            <span>
              Digital Growth
            </span>

          </div>


          <div className="footer-column">

            <small>
              CONTACT
            </small>

            <a href="mailto:hello@brandnest.in">
              hello@brandnest.in
            </a>

            <span>
              India
            </span>

          </div>

        </div>


        <div className="container footer-bottom">

          <span>
            © 2026 BrandNest. All rights reserved.
          </span>

          <span>
            Digital Solutions · Web · SEO · Growth
          </span>

        </div>

      </footer>

    </div>
  );
}

export default App;