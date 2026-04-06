const root = document.getElementById("root");

function createNavbar() {
  const nav = document.createElement("nav");
  nav.className = "navbar";

  const title = document.createElement("h1");
  title.innerText = "Afthab";

  const links = document.createElement("div");
  links.className = "nav-links";

  ["Home", "About", "Projects", "Contact"].forEach(text => {
    const a = document.createElement("a");
    a.href = "#";
    a.innerText = text;
    links.appendChild(a);
  });

  nav.appendChild(title);
  nav.appendChild(links);

  return nav;
}

function createHero() {
  const section = document.createElement("section");
  section.className = "hero";

  const heading = document.createElement("h2");
  heading.innerText = "Hi, I'm Afthab 👋";

  const para = document.createElement("p");
  para.innerText = "JavaScript Developer | Creative Thinker";

  section.appendChild(heading);
  section.appendChild(para);

  return section;
}
function createProjects() {
  const section = document.createElement("section");
  section.className = "projects";

  const title = document.createElement("h2");
  title.innerText = "My Projects";
  section.appendChild(title);

  const projectData = [
    { name: "Cartify GnG", desc: "Smart Shopping Cart System" },
    { name: "Budget Tracker", desc: "Personal Expense Tracker" }
  ];

  projectData.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";

    const h3 = document.createElement("h3");
    h3.innerText = project.name;

    const p = document.createElement("p");
    p.innerText = project.desc;

    card.appendChild(h3);
    card.appendChild(p);
    section.appendChild(card);
  });

  return section;
}

function createContact() {
  const section = document.createElement("section");
  section.className = "contact";

  const title = document.createElement("h2");
  title.innerText = "Contact Me";

  const email = document.createElement("p");
  email.innerText = "Email: afthab@example.com";

  section.appendChild(title);
  section.appendChild(email);

  return section;
}

root.appendChild(createNavbar());
root.appendChild(createHero());
root.appendChild(createProjects());
root.appendChild(createContact());