(function () {
  markActiveLinks();
  enhanceBuilderMenu();
  enhanceMobileMenu();

  function markActiveLinks() {
    const current = new URL(window.location.href);
    document.querySelectorAll(".site-nav a").forEach((link) => {
      const linkUrl = new URL(link.getAttribute("href"), window.location.href);
      if (linkUrl.pathname.endsWith("/pathways.html")) link.textContent = "Terrain map";
      if (samePage(linkUrl, current)) link.classList.add("active");
    });
  }

  function enhanceBuilderMenu() {
    const siteNav = document.querySelector(".site-nav");
    if (!siteNav || siteNav.dataset.builderMenuReady === "true") return;

    const flowOrder = [
      "film-profile.html",
      "theme-motif.html",
      "research-angle.html",
      "source-trail.html",
      "character-subject.html",
      "interview-questions.html",
      "scene-analysis.html",
      "runsheet.html",
      "festival-entry.html",
      "viewing-notes.html",
      "event-notes.html",
      "follow-up-action.html",
      "handoff.html"
    ];
    const flowRank = new Map(flowOrder.map((file, index) => [file, index]));
    const links = Array.from(siteNav.querySelectorAll("a"));
    const builderLinks = [];
    const primaryLinks = [];

    links.forEach((link) => {
      const clone = link.cloneNode(true);
      if (new URL(link.href, window.location.href).pathname.includes("/builders/") && !link.href.endsWith("/builders/index.html")) {
        builderLinks.push(clone);
      } else {
        primaryLinks.push(clone);
      }
    });

    if (builderLinks.length < 4) return;

    builderLinks.sort((a, b) => linkRank(a) - linkRank(b));
    const activeBuilder = builderLinks.find((link) => link.classList.contains("active"));
    siteNav.innerHTML = "";
    primaryLinks.forEach((link) => siteNav.appendChild(link));

    const menu = document.createElement("details");
    menu.className = "builder-menu";

    const summary = document.createElement("summary");
    summary.textContent = activeBuilder ? `Builders: ${activeBuilder.textContent.trim()}` : "Builders";
    if (activeBuilder) summary.className = "active";

    const panel = document.createElement("div");
    panel.className = "builder-menu-panel";
    builderLinks.forEach((link) => panel.appendChild(link));

    menu.append(summary, panel);
    siteNav.appendChild(menu);

    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target)) menu.removeAttribute("open");
    });

    siteNav.dataset.builderMenuReady = "true";

    function linkRank(link) {
      const file = new URL(link.href, window.location.href).pathname.split("/").pop();
      return flowRank.has(file) ? flowRank.get(file) : 999;
    }
  }

  function enhanceMobileMenu() {
    const siteNav = document.querySelector(".site-nav");
    if (!siteNav || document.querySelector(".mobile-page-menu")) return;

    const links = Array.from(siteNav.querySelectorAll("a"));
    if (!links.length) return;

    const wrapper = document.createElement("label");
    wrapper.className = "mobile-page-menu";

    const label = document.createElement("span");
    label.textContent = "Choose page";

    const select = document.createElement("select");
    select.setAttribute("aria-label", "Choose page");

    const current = new URL(window.location.href);
    let selectedIndex = 0;

    links.forEach((link, index) => {
      const option = document.createElement("option");
      const linkUrl = new URL(link.href, window.location.href);
      option.value = linkUrl.href;
      option.textContent = link.textContent.trim();
      select.appendChild(option);

      if (link.classList.contains("active") || samePage(linkUrl, current)) selectedIndex = index;
    });

    select.selectedIndex = selectedIndex;
    select.addEventListener("change", () => {
      window.location.href = select.value;
    });

    wrapper.append(label, select);
    siteNav.after(wrapper);
    document.body.classList.add("mobile-nav-ready");
  }

  function samePage(linkUrl, currentUrl) {
    return linkUrl.origin === currentUrl.origin && normalise(linkUrl.pathname) === normalise(currentUrl.pathname);
  }

  function normalise(pathname) {
    return pathname.replace(/\/index\.html$/, "/").replace(/\/$/, "/index.html");
  }
})();
