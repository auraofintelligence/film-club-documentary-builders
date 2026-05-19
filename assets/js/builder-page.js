(function () {
  const app = window.FilmClubDocumentaryBuilders;
  if (!app) return;

  const STORE_KEY = "film-club-documentary-builders-v1";
  const activeKey = document.body.dataset.builder;
  const config = app.builderMap[activeKey];

  if (!config) return;

  const savedState = loadState();
  const formElement = document.getElementById("builderForm");
  const preview = document.getElementById("markdownPreview");
  const filenameElement = document.getElementById("filename");
  const statusLine = document.getElementById("statusLine");

  document.title = `${config.label} | Film Club Documentary Builders`;
  setText("pageKicker", config.lane);
  setText("pageTitle", config.heading);
  setText("pageIntro", config.note);
  setText("formType", config.label);
  setText("formTitle", config.title);
  setText("destination", config.destination);

  const pageArt = document.getElementById("pageArt");
  if (pageArt) {
    pageArt.src = config.art;
    pageArt.alt = `${config.label} visual marker`;
  }

  buildSideNav();
  buildFooterNav();
  renderForm();
  updatePreview();

  document.getElementById("downloadButton").addEventListener("click", downloadMarkdown);
  document.getElementById("copyButton").addEventListener("click", copyMarkdown);
  document.getElementById("clearButton").addEventListener("click", clearForm);

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value || "";
  }

  function buildSideNav() {
    const sideNav = document.querySelector(".side-nav");
    if (!sideNav) return;

    sideNav.innerHTML = "";

    const title = document.createElement("p");
    title.className = "side-nav-title";
    title.textContent = "Builder pages";
    sideNav.appendChild(title);

    app.builders.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.page;
      link.className = item.key === activeKey ? "active" : "";
      link.innerHTML = `<strong>${escapeHtml(item.label)}</strong><span>${escapeHtml(item.note)}</span>`;
      sideNav.appendChild(link);
    });

    const note = document.createElement("div");
    note.className = "side-note";
    note.innerHTML = "<strong>Draft boundary stays on.</strong><br>Generated Markdown is a working note until reviewed.";
    sideNav.appendChild(note);
  }

  function buildFooterNav() {
    const footerNav = document.querySelector(".footer-nav");
    if (!footerNav) return;

    const index = app.builders.findIndex((item) => item.key === activeKey);
    const previous = app.builders[(index - 1 + app.builders.length) % app.builders.length];
    const next = app.builders[(index + 1) % app.builders.length];

    footerNav.innerHTML = `
      <a class="footer-nav-card" href="${previous.page}"><span>Previous</span><strong>${escapeHtml(previous.label)}</strong></a>
      <a class="footer-nav-card next" href="${next.page}"><span>Next</span><strong>${escapeHtml(next.label)}</strong></a>
    `;
  }

  function renderForm() {
    const data = getFormState();
    formElement.innerHTML = "";

    config.fields.forEach((field) => {
      const wrapper = document.createElement("div");
      wrapper.className = "field";

      const label = document.createElement("label");
      label.htmlFor = field.id;
      label.textContent = field.label;
      wrapper.appendChild(label);

      const input = createInput(field, data[field.id] || field.defaultValue || "");
      input.addEventListener("input", () => updateField(field.id, input.value));
      input.addEventListener("change", () => updateField(field.id, input.value));
      wrapper.appendChild(input);

      if (field.hint) {
        const hint = document.createElement("p");
        hint.className = "hint";
        hint.textContent = field.hint;
        wrapper.appendChild(hint);
      }

      formElement.appendChild(wrapper);
    });
  }

  function createInput(field, value) {
    if (field.type === "textarea") {
      const textarea = document.createElement("textarea");
      textarea.id = field.id;
      textarea.value = value;
      return textarea;
    }

    if (field.type === "select") {
      const select = document.createElement("select");
      select.id = field.id;
      field.options.forEach((option) => {
        const node = document.createElement("option");
        node.value = option;
        node.textContent = option;
        select.appendChild(node);
      });
      select.value = value || field.defaultValue || field.options[0];
      updateField(field.id, select.value, false);
      return select;
    }

    const input = document.createElement("input");
    input.id = field.id;
    input.type = field.type === "date" ? "date" : "text";
    input.value = value;
    return input;
  }

  function updateField(id, value, shouldPreview = true) {
    const data = getFormState();
    data[id] = value;
    savedState.forms[activeKey] = data;
    savedState.activeBuilder = activeKey;
    persistState();
    if (shouldPreview) updatePreview();
  }

  function updatePreview() {
    const data = getFormState();
    const markdown = config.render(data);
    preview.value = markdown;
    filenameElement.textContent = filenameFor(data);
    statusLine.textContent = "Autosaved in this browser.";
  }

  function filenameFor(data) {
    const title = data[config.titleField] || config.label;
    return `${config.prefix}-${app.dateStamp()}-${app.slugify(title)}.md`;
  }

  function downloadMarkdown() {
    updatePreview();
    const blob = new Blob([preview.value], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filenameElement.textContent;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    statusLine.textContent = "Markdown download started.";
  }

  async function copyMarkdown() {
    updatePreview();
    try {
      await navigator.clipboard.writeText(preview.value);
      statusLine.textContent = "Markdown copied.";
    } catch (error) {
      preview.focus();
      preview.select();
      document.execCommand("copy");
      statusLine.textContent = "Markdown selected and copied.";
    }
  }

  function clearForm() {
    savedState.forms[activeKey] = {};
    persistState();
    renderForm();
    updatePreview();
    statusLine.textContent = "Form reset.";
  }

  function getFormState() {
    if (!savedState.forms[activeKey]) savedState.forms[activeKey] = {};
    return savedState.forms[activeKey];
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORE_KEY));
      if (parsed && parsed.forms) return parsed;
    } catch (error) {
      console.warn("Could not load Film Club builder state", error);
    }
    return { activeBuilder: activeKey, forms: {} };
  }

  function persistState() {
    localStorage.setItem(STORE_KEY, JSON.stringify(savedState));
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();

