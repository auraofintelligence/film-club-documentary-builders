(function () {
  const app = window.FilmClubDocumentaryBuilders;
  const mount = document.getElementById("builderDirectory");
  if (!app || !mount) return;

  mount.innerHTML = app.builders
    .map((builder, index) => {
      return `
        <a class="builder-card" href="${builder.page}" data-lane="${escapeHtml(builder.lane)}">
          <span class="card-tag">${String(index + 1).padStart(2, "0")} / ${escapeHtml(builder.lane)}</span>
          <strong>${escapeHtml(builder.label)}</strong>
          <p>${escapeHtml(builder.note)}</p>
        </a>
      `;
    })
    .join("");

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();

