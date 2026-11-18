/* ==========================================================================
   Jobify — Application logic
   Vanilla ES6+. No frameworks, no build step.
   ========================================================================== */

"use strict";

/* ---------- Domain constants ---------- */

const SPECIALTIES = [
  "Ηλεκτρολόγος",
  "Ψυκτικός – Κλιματισμού",
  "Μηχανικός Αυτοκινήτων",
  "Βοηθός Νοσηλευτή",
  "Τεχνικός Δικτύων & Υπολογιστών",
  "Τεχνικός Ανελκυστήρων",
  "Μηχανοτεχνίτης – Συγκολλητής",
  "Αισθητικός – Κομμωτής"
];

const LOCATIONS = [
  "Αθήνα",
  "Θεσσαλονίκη",
  "Σέρρες",
  "Πάτρα",
  "Λάρισα",
  "Ηράκλειο"
];

const JOB_TYPES = [
  { value: "Πλήρης", label: "Πλήρης απασχόληση" },
  { value: "Μερική", label: "Μερική απασχόληση" },
  { value: "Μαθητεία / Πρακτική", label: "Μαθητεία / Πρακτική" }
];

const TONES = ["amber", "blue", "green", "rose", "violet", "cyan", "lime", "slate"];

/* ---------- Mock data (8 αγγελίες ΕΠΑΛ) ---------- */

const initialJobs = [
  {
    id: "job-1",
    title: "Ηλεκτρολόγος Εγκαταστάσεων",
    company: "Παπαδόπουλος Ηλεκτρολογική",
    location: "Αθήνα",
    specialty: "Ηλεκτρολόγος",
    type: "Πλήρης",
    salary: "950€ – 1.200€ καθαρά",
    licenseRequired: true,
    postedAt: "Πριν από 2 ημέρες",
    description:
      "Εγκατάσταση και συντήρηση ηλεκτρολογικών πινάκων σε κατοικίες και επαγγελματικούς χώρους. Παρέχονται εταιρικό όχημα, εξοπλισμός και εκπαίδευση δίπλα σε έμπειρη ομάδα.",
    urgent: true
  },
  {
    id: "job-2",
    title: "Ψυκτικός / Τεχνικός Κλιματισμού",
    company: "ThermoCool",
    location: "Θεσσαλονίκη",
    specialty: "Ψυκτικός – Κλιματισμού",
    type: "Πλήρης",
    salary: "1.000€ – 1.300€ καθαρά",
    licenseRequired: true,
    postedAt: "Πριν από 5 ημέρες",
    description:
      "Εγκατάσταση, συντήρηση και service κλιματιστικών σε κατοικίες και καταστήματα. Επιθυμητό δίπλωμα οδήγησης· προσφέρονται bonus παραγωγικότητας και κινητό εργασίας.",
    urgent: false
  },
  {
    id: "job-3",
    title: "Μηχανικός Αυτοκινήτων – Βοηθός",
    company: "AutoService Σέρρες",
    location: "Σέρρες",
    specialty: "Μηχανικός Αυτοκινήτων",
    type: "Μαθητεία / Πρακτική",
    salary: "Αμοιβή Μαθητείας",
    licenseRequired: false,
    postedAt: "Πριν από 1 ημέρα",
    description:
      "Μαθητεία δίπλα σε έμπειρο μηχανικό για service και διαγνωστικά Ι.Χ. Ιδανική ευκαιρία για απόφοιτο ΕΠΑΛ που θέλει να χτίσει εμπειρία σε πραγματικό συνεργείο.",
    urgent: false
  },
  {
    id: "job-4",
    title: "Βοηθός Νοσηλευτή",
    company: "Κλινική Αγία Ειρήνη",
    location: "Πάτρα",
    specialty: "Βοηθός Νοσηλευτή",
    type: "Πλήρης",
    salary: "900€ – 1.050€ καθαρά",
    licenseRequired: true,
    postedAt: "Πριν από 3 ημέρες",
    description:
      "Υποστήριξη του νοσηλευτικού προσωπικού σε κλινική βραχείας νοσηλείας. Πρωινές και απογευματινές βάρδιες, εκπαίδευση στην αρχή και ασφαλές περιβάλλον εργασίας.",
    urgent: true
  },
  {
    id: "job-5",
    title: "Τεχνικός Δικτύων & Υπολογιστών",
    company: "NetPro IT Solutions",
    location: "Αθήνα",
    specialty: "Τεχνικός Δικτύων & Υπολογιστών",
    type: "Μαθητεία / Πρακτική",
    salary: "Αμοιβή Μαθητείας",
    licenseRequired: false,
    postedAt: "Πριν από 6 ώρες",
    description:
      "Εγκατάσταση δικτύων, στήσιμο υπολογιστών και τεχνική υποστήριξη πρώτου επιπέδου σε μικρές επιχειρήσεις. Πρόγραμμα 6 μηνών με δυνατότητα πρόσληψης στο τέλος.",
    urgent: false
  },
  {
    id: "job-6",
    title: "Τεχνικός Ανελκυστήρων",
    company: "Μακεδονία Lift",
    location: "Θεσσαλονίκη",
    specialty: "Τεχνικός Ανελκυστήρων",
    type: "Πλήρης",
    salary: "1.100€ – 1.400€ καθαρά",
    licenseRequired: true,
    postedAt: "Πριν από 8 ημέρες",
    description:
      "Προληπτική συντήρηση και επισκευές ανελκυστήρων σε πολυκατοικίες και ξενοδοχεία. Απαιτείται άδεια ασκήσεως επαγγέλματος και διάθεση για μετακινήσεις.",
    urgent: true
  },
  {
    id: "job-7",
    title: "Μηχανοτεχνίτης / Συγκολλητής",
    company: "Μεταλλικές Κατασκευές Λάρισα",
    location: "Λάρισα",
    specialty: "Μηχανοτεχνίτης – Συγκολλητής",
    type: "Πλήρης",
    salary: "1.050€ – 1.250€ καθαρά",
    licenseRequired: false,
    postedAt: "Πριν από 4 ημέρες",
    description:
      "Κατασκευή μεταλλικών σκελετών και συγκολλήσεις MIG/MAG σε βιομηχανικό περιβάλλον. Πλήρες ωράριο, υπερωρίες με προσαύξηση και σταθερή συνεργασία.",
    urgent: false
  },
  {
    id: "job-8",
    title: "Αισθητικός / Κομμώτρια",
    company: "Beauty Studio Ηράκλειο",
    location: "Ηράκλειο",
    specialty: "Αισθητικός – Κομμωτής",
    type: "Μερική",
    salary: "650€ – 800€ καθαρά",
    licenseRequired: true,
    postedAt: "Πριν από 12 ώρες",
    description:
      "Υποδοχή πελατών, περιποιήσεις προσώπου και βασικές υπηρεσίες κομμωτηρίου. Ευέλικτο ωράριο 5 ημέρες την εβδομάδα, φιλικό περιβάλλον και συνεχής εκπαίδευση.",
    urgent: false
  }
];

let jobs = [...initialJobs];

/* ---------- State ---------- */

const state = {
  keyword: "",
  specialty: "",
  location: "",
  apprenticeship: false,
  onlySaved: false
};

const STORAGE_KEY = "jobify:savedJobs";

let savedIds = loadSavedJobs();
let activeJobId = null;
let highlightJobId = null;

/* ---------- DOM references ---------- */

const els = {
  filterForm: document.getElementById("filterForm"),
  keyword: document.getElementById("keyword"),
  specialtyFilter: document.getElementById("specialtyFilter"),
  locationFilter: document.getElementById("locationFilter"),
  apprenticeshipToggle: document.getElementById("apprenticeshipToggle"),
  jobsGrid: document.getElementById("jobsGrid"),
  emptyState: document.getElementById("emptyState"),
  emptyTitle: document.getElementById("emptyTitle"),
  emptyText: document.getElementById("emptyText"),
  emptyReset: document.getElementById("emptyReset"),
  resultCount: document.getElementById("resultCount"),
  resultLabel: document.getElementById("resultLabel"),
  resultsNote: document.getElementById("resultsNote"),
  clearFilters: document.getElementById("clearFilters"),
  activeFilters: document.getElementById("activeFilters"),
  savedToggle: document.getElementById("savedToggle"),
  savedCount: document.getElementById("savedCount"),
  guestAuthActions: document.getElementById("guestAuthActions"),
  userAuthActions: document.getElementById("userAuthActions"),
  authUserLink: document.getElementById("authUserLink"),
  authUserAvatar: document.getElementById("authUserAvatar"),
  authUserName: document.getElementById("authUserName"),
  authUserEmail: document.getElementById("authUserEmail"),
  logoutButton: document.getElementById("logoutButton"),
  heroJobs: document.getElementById("heroJobs"),
  liveCount: document.getElementById("liveCount"),
  statJobs: document.getElementById("statJobs"),
  statCities: document.getElementById("statCities"),
  navToggle: document.getElementById("navToggle"),
  mainNav: document.getElementById("mainNav"),
  siteHeader: document.getElementById("siteHeader"),
  applyModal: document.getElementById("applyModal"),
  applyForm: document.getElementById("applyForm"),
  applyName: document.getElementById("applyName"),
  applyPhone: document.getElementById("applyPhone"),
  applySpecialty: document.getElementById("applySpecialty"),
  applyLicense: document.getElementById("applyLicense"),
  applyDriving: document.getElementById("applyDriving"),
  applyJobTitle: document.getElementById("applyJobTitle"),
  applyJobCompany: document.getElementById("applyJobCompany"),
  applyJobLocation: document.getElementById("applyJobLocation"),
  applyJobSalary: document.getElementById("applyJobSalary"),
  applyLogo: document.getElementById("applyLogo"),
  applyLogoLetter: document.getElementById("applyLogoLetter"),
  licenseNote: document.getElementById("licenseNote"),
  applyFormView: document.getElementById("applyFormView"),
  applySuccess: document.getElementById("applySuccess"),
  successJobTitle: document.getElementById("successJobTitle"),
  successCompany: document.getElementById("successCompany"),
  closeSuccess: document.getElementById("closeSuccess"),
  browseMore: document.getElementById("browseMore"),
  postModal: document.getElementById("postModal"),
  postForm: document.getElementById("postForm"),
  postTitleInput: document.getElementById("postTitleInput"),
  postCompany: document.getElementById("postCompany"),
  postSpecialty: document.getElementById("postSpecialty"),
  postLocation: document.getElementById("postLocation"),
  postType: document.getElementById("postType"),
  postSalary: document.getElementById("postSalary"),
  postDescription: document.getElementById("postDescription"),
  postLicense: document.getElementById("postLicense"),
  postUrgent: document.getElementById("postUrgent"),
  postDescCount: document.getElementById("postDescCount"),
  toastStack: document.getElementById("toastStack"),
  year: document.getElementById("year")
};

/* ---------- Helpers ---------- */

const escapeHTML = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });

const normalizeText = (value) =>
  String(value ?? "")
    .toLocaleLowerCase("el")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const pluralizeJobs = (count) => (count === 1 ? "αγγελία" : "αγγελίες");

const toneForSpecialty = (specialty) => {
  const index = SPECIALTIES.indexOf(specialty);
  return TONES[(index >= 0 ? index : 0) % TONES.length];
};

const getInitials = (company) => {
  const words = String(company)
    .replace(/[–—-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toLocaleUpperCase("el");
  }

  return String(company).slice(0, 2).toLocaleUpperCase("el");
};

const getJobById = (id) => jobs.find((job) => job.id === id);

const scrollToJobs = () => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("jobs").scrollIntoView({
    behavior: reduced ? "auto" : "smooth",
    block: "start"
  });
};

function loadSavedJobs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : []);
  } catch {
    return new Set();
  }
}

function persistSavedJobs() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...savedIds]));
  } catch {
    /* Storage may be unavailable (private mode). Saving stays in-memory. */
  }
}

/* ---------- Authentication state ---------- */

const AUTH_STORAGE_KEY = "jobify:authUser";

function getAuthUser() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return null;

    const name = typeof data.name === "string" ? data.name.trim() : "";
    const email = typeof data.email === "string" ? data.email.trim() : "";
    if (!name && !email) return null;

    return { name: name || email.split("@")[0] || "Χρήστης", email };
  } catch {
    return null;
  }
}

function setAuthUser(user) {
  try {
    if (!user) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } else {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
          name: String(user.name ?? "").trim(),
          email: String(user.email ?? "").trim()
        })
      );
    }
  } catch {
    /* Storage may be unavailable (private mode); auth stays in memory. */
  }

  updateAuthUI();
}

function clearAuthUser() {
  setAuthUser(null);
}

function updateAuthUI() {
  const user = getAuthUser();
  const isAuthenticated = Boolean(user);

  /* Guest buttons and the user badge are mutually exclusive. */
  els.guestAuthActions?.classList.toggle("hidden", isAuthenticated);
  els.userAuthActions?.classList.toggle("hidden", !isAuthenticated);

  if (!isAuthenticated) return;

  const displayName = user.name || user.email;
  const initial = displayName.trim().charAt(0).toLocaleUpperCase("el") || "Χ";

  if (els.authUserName) els.authUserName.textContent = displayName;
  if (els.authUserAvatar) els.authUserAvatar.textContent = initial;
  if (els.authUserEmail) {
    els.authUserEmail.textContent = user.email;
    els.authUserEmail.hidden = !user.email;
  }
  if (els.authUserLink) {
    const label = user.email ? `${displayName} · ${user.email}` : displayName;
    els.authUserLink.setAttribute("aria-label", `Ο λογαριασμός μου — ${label}`);
    els.authUserLink.title = label;
  }
}

function logoutUser() {
  clearAuthUser();
  showToast({
    title: "Αποσύνδεση",
    message: "Αποσυνδεθήκατε από τον λογαριασμό σας.",
    variant: "info",
    duration: 4000
  });

  /* Destroy the PHP session as well, without leaving the board. */
  if (window.fetch && window.location.protocol.startsWith("http")) {
    window.fetch("logout.php", { method: "POST", credentials: "same-origin" }).catch(() => {});
  }
}

/* Other pages can call these right after a login/register/logout action. */
window.JobifyAuth = {
  get: getAuthUser,
  set: setAuthUser,
  clear: clearAuthUser,
  updateUI: updateAuthUI
};

/* ---------- Toasts ---------- */

const TOAST_ICONS = {
  success: "i-check",
  info: "i-sparkles",
  warning: "i-zap"
};

function showToast({ title, message, variant = "success", duration = 6000 }) {
  if (!els.toastStack) return;

  while (els.toastStack.children.length >= 3) {
    els.toastStack.firstElementChild?.remove();
  }

  const toast = document.createElement("div");
  toast.className = `toast toast--${variant}`;
  toast.innerHTML = `
    <span class="toast-icon" aria-hidden="true">
      <svg class="icon"><use href="#${TOAST_ICONS[variant] || TOAST_ICONS.success}"></use></svg>
    </span>
    <div class="toast-content">
      <p class="toast-title">${escapeHTML(title)}</p>
      <p class="toast-message">${escapeHTML(message)}</p>
    </div>
    <button type="button" class="toast-close" aria-label="Κλείσιμο ειδοποίησης">
      <svg class="icon" aria-hidden="true"><use href="#i-close"></use></svg>
    </button>
    <span class="toast-progress" aria-hidden="true"></span>
  `;

  const progress = toast.querySelector(".toast-progress");
  progress.style.animationDuration = `${duration}ms`;

  const remove = () => {
    if (toast.dataset.closing === "true") return;
    toast.dataset.closing = "true";
    toast.classList.add("is-leaving");
    window.setTimeout(() => toast.remove(), 230);
  };

  toast.querySelector(".toast-close").addEventListener("click", remove);
  const timer = window.setTimeout(remove, duration);

  toast.addEventListener("mouseenter", () => {
    window.clearTimeout(timer);
    progress.style.animationPlayState = "paused";
  });

  toast.addEventListener("mouseleave", () => {
    progress.style.animationPlayState = "running";
  });

  els.toastStack.appendChild(toast);
}

/* ---------- Select options ---------- */

function fillSelect(select, values) {
  if (!select) return;

  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function populateSelects() {
  fillSelect(els.specialtyFilter, SPECIALTIES);
  fillSelect(els.locationFilter, LOCATIONS);
  fillSelect(els.applySpecialty, SPECIALTIES);
  fillSelect(els.postSpecialty, SPECIALTIES);
  fillSelect(els.postLocation, LOCATIONS);
}

/* ---------- Filtering ---------- */

function hasActiveFilters() {
  return Boolean(
    state.keyword ||
      state.specialty ||
      state.location ||
      state.apprenticeship ||
      state.onlySaved
  );
}

function getFilteredJobs() {
  const queryTokens = normalizeText(state.keyword).split(/\s+/).filter(Boolean);

  return jobs.filter((job) => {
    if (state.onlySaved && !savedIds.has(job.id)) return false;
    if (state.specialty && job.specialty !== state.specialty) return false;
    if (state.location && job.location !== state.location) return false;
    if (state.apprenticeship && job.type !== "Μαθητεία / Πρακτική") return false;

    if (queryTokens.length) {
      const haystack = normalizeText(
        [job.title, job.company, job.location, job.specialty, job.type, job.description].join(" ")
      );

      if (!queryTokens.every((token) => haystack.includes(token))) return false;
    }

    return true;
  });
}

/* ---------- Markup builders ---------- */

function typeBadgeFor(type) {
  if (type === "Μαθητεία / Πρακτική") {
    return { label: "Μαθητεία", className: "badge--green", icon: "i-sparkles" };
  }

  if (type === "Μερική") {
    return { label: "Μερική απασχόληση", className: "badge--slate", icon: "i-briefcase" };
  }

  return { label: "Πλήρης απασχόληση", className: "badge--slate", icon: "i-briefcase" };
}

function jobCardMarkup(job) {
  const tone = toneForSpecialty(job.specialty);
  const initials = escapeHTML(getInitials(job.company));
  const typeBadge = typeBadgeFor(job.type);
  const isSaved = savedIds.has(job.id);
  const isNew = highlightJobId === job.id;

  return `
    <article class="job-card${isNew ? " job-card--new" : ""}" data-job-id="${escapeHTML(job.id)}">
      <div class="job-card-head">
        <span class="company-logo" data-tone="${tone}" aria-hidden="true">${initials}</span>
        <div class="company-meta">
          <p class="company-name">${escapeHTML(job.company)}</p>
          <p class="company-loc">
            <svg class="icon" aria-hidden="true"><use href="#i-pin"></use></svg>
            <span>${escapeHTML(job.location)}</span>
            <span class="meta-sep" aria-hidden="true">·</span>
            <svg class="icon" aria-hidden="true"><use href="#i-clock"></use></svg>
            <span>${escapeHTML(job.postedAt)}</span>
          </p>
        </div>
        <button
          class="save-btn${isSaved ? " is-saved" : ""}"
          type="button"
          data-save-job="${escapeHTML(job.id)}"
          aria-pressed="${isSaved}"
          aria-label="${isSaved ? "Αφαίρεση από αποθηκευμένες" : "Αποθήκευση αγγελίας"}: ${escapeHTML(job.title)}"
        >
          <svg class="icon" aria-hidden="true"><use href="#i-bookmark"></use></svg>
        </button>
      </div>

      <h3 class="job-title">${escapeHTML(job.title)}</h3>
      <p class="job-desc">${escapeHTML(job.description)}</p>

      <div class="job-badges">
        <span class="badge ${typeBadge.className}">
          <svg class="icon" aria-hidden="true"><use href="#${typeBadge.icon}"></use></svg>
          ${typeBadge.label}
        </span>
        ${
          job.urgent
            ? `<span class="badge badge--blue"><svg class="icon" aria-hidden="true"><use href="#i-zap"></use></svg> Άμεση πρόσληψη</span>`
            : ""
        }
        ${
          job.licenseRequired
            ? `<span class="badge badge--license"><svg class="icon" aria-hidden="true"><use href="#i-shield"></use></svg> Απαιτείται άδεια</span>`
            : ""
        }
      </div>

      <div class="job-footer">
        <div>
          <span class="salary-label">Μισθός</span>
          <span class="salary-value">${escapeHTML(job.salary)}</span>
        </div>
        <button
          class="btn-card"
          type="button"
          data-apply-job="${escapeHTML(job.id)}"
          aria-label="Άμεση αίτηση για τη θέση ${escapeHTML(job.title)}"
        >
          Άμεση αίτηση
          <svg class="icon" aria-hidden="true"><use href="#i-arrow-right"></use></svg>
        </button>
      </div>
    </article>
  `;
}

function filterChipMarkup(label, value, clearKey) {
  return `
    <span class="filter-chip">
      <span>${escapeHTML(label)} <strong>${escapeHTML(value)}</strong></span>
      <button class="chip-clear" type="button" data-clear-filter="${clearKey}" aria-label="Αφαίρεση φίλτρου: ${escapeHTML(label)} ${escapeHTML(value)}">
        <svg class="icon" aria-hidden="true"><use href="#i-close"></use></svg>
      </button>
    </span>
  `;
}

function renderActiveFilters() {
  if (!els.activeFilters) return;

  const chips = [];

  if (state.keyword) {
    chips.push(filterChipMarkup("Αναζήτηση:", `«${state.keyword}»`, "keyword"));
  }

  if (state.specialty) {
    chips.push(filterChipMarkup("Ειδικότητα:", state.specialty, "specialty"));
  }

  if (state.location) {
    chips.push(filterChipMarkup("Περιοχή:", state.location, "location"));
  }

  if (state.apprenticeship) {
    chips.push(filterChipMarkup("Τύπος:", "Μαθητεία / Πρακτική", "apprenticeship"));
  }

  if (state.onlySaved) {
    chips.push(filterChipMarkup("Προβολή:", "Αποθηκευμένες", "onlySaved"));
  }

  els.activeFilters.innerHTML = chips.join("");
  els.activeFilters.hidden = chips.length === 0;
}

function updateFeedUI(count) {
  const currentJobs = jobs.length;
  const savedCount = [...savedIds].filter((id) => Boolean(getJobById(id))).length;

  els.resultCount.textContent = String(count);
  els.resultLabel.textContent = pluralizeJobs(count);
  els.resultsNote.textContent = state.onlySaved
    ? "στις αποθηκευμένες σου"
    : hasActiveFilters()
      ? "ταιριάζουν με τα φίλτρα σου"
      : "ενεργές σε όλη την Ελλάδα";

  els.clearFilters.hidden = !hasActiveFilters();
  els.savedToggle.classList.toggle("is-active", state.onlySaved);
  els.savedToggle.setAttribute("aria-pressed", String(state.onlySaved));
  els.savedCount.textContent = String(savedCount);

  els.statJobs.textContent = String(currentJobs);
  els.liveCount.textContent = String(currentJobs);

  const cityCount = new Set(jobs.map((job) => job.location)).size;
  els.statCities.textContent = String(cityCount);
}

function renderJobs() {
  const results = getFilteredJobs();
  const count = results.length;

  els.jobsGrid.innerHTML = results.map(jobCardMarkup).join("");
  els.jobsGrid.hidden = count === 0;

  const onlySavedEmpty = state.onlySaved && count === 0 && !state.specialty && !state.location && !state.apprenticeship && !state.keyword;

  els.emptyState.hidden = count > 0;
  els.emptyTitle.textContent = onlySavedEmpty
    ? "Δεν έχεις αποθηκεύσει αγγελίες ακόμη"
    : "Δεν βρέθηκαν αγγελίες με αυτά τα κριτήρια";
  els.emptyText.textContent = onlySavedEmpty
    ? "Πάτησε το εικονίδιο σελιδοδείκτη σε μια αγγελία για να τη βρεις εδώ αργότερα."
    : "Δοκίμασε να αφαιρέσεις κάποιο φίλτρο ή να αλλάξεις τη λέξη-κλειδί. Οι νέες αγγελίες εμφανίζονται καθημερινά.";

  els.emptyReset.textContent = onlySavedEmpty ? "Δες όλες τις αγγελίες" : "Καθαρισμός φίλτρων";

  renderActiveFilters();
  updateFeedUI(count);
}

function renderHeroJobs() {
  if (!els.heroJobs) return;

  const latest = jobs.slice(0, 3);
  const shortType = (type) =>
    type === "Μαθητεία / Πρακτική" ? "Μαθητεία" : type === "Μερική" ? "Μερική" : "Πλήρης";

  els.heroJobs.innerHTML = latest
    .map((job) => {
      const salary = job.salary.replace(" καθαρά", "");
      return `
        <button class="live-job" type="button" data-live-job="${escapeHTML(job.id)}" aria-label="Άμεση αίτηση για ${escapeHTML(job.title)}">
          <span class="live-logo company-logo" data-tone="${toneForSpecialty(job.specialty)}" aria-hidden="true">${escapeHTML(getInitials(job.company))}</span>
          <span class="live-job-main">
            <span class="live-job-title">${escapeHTML(job.title)}</span>
            <span class="live-job-meta">${escapeHTML(job.location)} · ${shortType(job.type)}</span>
          </span>
          <span class="live-salary">${escapeHTML(salary)}</span>
        </button>
      `;
    })
    .join("");
}

function renderAll() {
  renderJobs();
  renderHeroJobs();
}

/* ---------- Filter mutations ---------- */

function clearAllFilters() {
  state.keyword = "";
  state.specialty = "";
  state.location = "";
  state.apprenticeship = false;
  state.onlySaved = false;

  els.keyword.value = "";
  els.specialtyFilter.value = "";
  els.locationFilter.value = "";
  els.apprenticeshipToggle.checked = false;

  renderJobs();
}

function clearOneFilter(key) {
  switch (key) {
    case "keyword":
      state.keyword = "";
      els.keyword.value = "";
      break;
    case "specialty":
      state.specialty = "";
      els.specialtyFilter.value = "";
      break;
    case "location":
      state.location = "";
      els.locationFilter.value = "";
      break;
    case "apprenticeship":
      state.apprenticeship = false;
      els.apprenticeshipToggle.checked = false;
      break;
    case "onlySaved":
      state.onlySaved = false;
      break;
    default:
      return;
  }

  renderJobs();
}

function toggleSavedJob(id) {
  const job = getJobById(id);
  if (!job) return;

  if (savedIds.has(id)) {
    savedIds.delete(id);
    showToast({
      title: "Αφαιρέθηκε από τις αποθηκευμένες",
      message: `Η αγγελία «${job.title}» δεν βρίσκεται πλέον στη λίστα σου.`,
      variant: "info",
      duration: 4000
    });
  } else {
    savedIds.add(id);
    showToast({
      title: "Αποθηκεύτηκε",
      message: `Η αγγελία «${job.title}» προστέθηκε στις αποθηκευμένες σου.`,
      variant: "success",
      duration: 4000
    });
  }

  persistSavedJobs();
  renderJobs();

  /* Re-rendering replaces the button, so restore keyboard focus deliberately. */
  const refocusTarget =
    els.jobsGrid.querySelector(`[data-save-job="${id}"]`) || els.savedToggle;
  refocusTarget?.focus({ preventScroll: true });
}

/* ---------- Modal management ---------- */

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])"
].join(",");

let activeModal = null;
let lastFocusedElement = null;

function isVisible(element) {
  return Boolean(element && element.getClientRects().length);
}

function openModal(modal) {
  if (!modal || modal === activeModal) return;

  closeMobileNav();
  lastFocusedElement = document.activeElement;
  activeModal = modal;
  modal.hidden = false;

  /* Force a style flush so the entrance transition runs reliably. */
  void modal.offsetWidth;

  modal.classList.add("is-open");
  document.body.classList.add("modal-open");

  const target =
    modal.querySelector("[data-autofocus]") || modal.querySelector(FOCUSABLE_SELECTOR);
  target?.focus({ preventScroll: true });
}

function closeModal(modal = activeModal, restoreFocus = true) {
  if (!modal) return;

  modal.classList.remove("is-open");
  if (activeModal === modal) activeModal = null;

  const hasOpenModal = document.querySelector(".modal.is-open");
  if (!hasOpenModal) document.body.classList.remove("modal-open");

  window.setTimeout(() => {
    if (!modal.classList.contains("is-open")) modal.hidden = true;
  }, 240);

  if (restoreFocus && lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus({ preventScroll: true });
  }
}

function trapModalFocus(event) {
  if (!activeModal || event.key !== "Tab") return;

  const focusable = [...activeModal.querySelectorAll(FOCUSABLE_SELECTOR)].filter(isVisible);
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

/* ---------- Mobile navigation ---------- */

function closeMobileNav() {
  if (!els.mainNav.classList.contains("is-open")) return;

  els.mainNav.classList.remove("is-open");
  els.navToggle.setAttribute("aria-expanded", "false");
  els.navToggle.setAttribute("aria-label", "Άνοιγμα μενού");
  els.navToggle.querySelector("use")?.setAttribute("href", "#i-menu");
}

function toggleMobileNav() {
  const isOpen = els.mainNav.classList.toggle("is-open");
  els.navToggle.setAttribute("aria-expanded", String(isOpen));
  els.navToggle.setAttribute("aria-label", isOpen ? "Κλείσιμο μενού" : "Άνοιγμα μενού");
  els.navToggle.querySelector("use")?.setAttribute("href", isOpen ? "#i-close" : "#i-menu");
}

/* ---------- Event binding ---------- */

function bindEvents() {
  /* Keyword search */
  els.keyword.addEventListener("input", () => {
    state.keyword = els.keyword.value.trim();
    renderJobs();
  });

  /* Select filters */
  els.specialtyFilter.addEventListener("change", () => {
    state.specialty = els.specialtyFilter.value;
    renderJobs();
  });

  els.locationFilter.addEventListener("change", () => {
    state.location = els.locationFilter.value;
    renderJobs();
  });

  els.apprenticeshipToggle.addEventListener("change", () => {
    state.apprenticeship = els.apprenticeshipToggle.checked;
    renderJobs();
  });

  /* Submit scrolls to results */
  els.filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderJobs();
    els.keyword.blur();
    scrollToJobs();
  });

  /* Quick filters */
  document.querySelectorAll("[data-quick-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.quickFilter;
      const value = button.dataset.quickValue || "";

      state.onlySaved = false;

      if (filter === "specialty") {
        state.specialty = value;
        els.specialtyFilter.value = value;
      } else if (filter === "location") {
        state.location = value;
        els.locationFilter.value = value;
      } else if (filter === "apprenticeship") {
        state.apprenticeship = true;
        els.apprenticeshipToggle.checked = true;
      }

      renderJobs();
      scrollToJobs();
    });
  });

  /* Apprenticeship shortcuts in nav/footer */
  document.querySelectorAll("[data-apprenticeship-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      state.apprenticeship = true;
      state.onlySaved = false;
      els.apprenticeshipToggle.checked = true;
      renderJobs();
      closeMobileNav();
      scrollToJobs();
    });
  });

  /* Clear all filters */
  els.clearFilters.addEventListener("click", clearAllFilters);
  els.emptyReset.addEventListener("click", clearAllFilters);

  /* Remove individual filter chips */
  els.activeFilters.addEventListener("click", (event) => {
    const clearButton = event.target.closest("[data-clear-filter]");
    if (!clearButton) return;
    clearOneFilter(clearButton.dataset.clearFilter);
  });

  /* Saved-only view */
  els.savedToggle.addEventListener("click", () => {
    state.onlySaved = !state.onlySaved;
    renderJobs();
  });

  /* Job feed actions (delegated) */
  els.jobsGrid.addEventListener("click", (event) => {
    const saveButton = event.target.closest("[data-save-job]");
    if (saveButton) {
      toggleSavedJob(saveButton.dataset.saveJob);
      return;
    }

    const applyButton = event.target.closest("[data-apply-job]");
    if (applyButton) {
      openApplyModal(applyButton.dataset.applyJob);
    }
  });

  /* Hero live jobs */
  els.heroJobs.addEventListener("click", (event) => {
    const liveJob = event.target.closest("[data-live-job]");
    if (liveJob) openApplyModal(liveJob.dataset.liveJob);
  });

  /* Mobile nav */
  els.navToggle.addEventListener("click", toggleMobileNav);

  els.mainNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMobileNav();
  });

  document.addEventListener("click", (event) => {
    if (!els.mainNav.classList.contains("is-open")) return;
    if (!els.siteHeader.contains(event.target)) closeMobileNav();
  });

  /* Auth: clear the session state and restore the guest actions at once */
  els.logoutButton?.addEventListener("click", logoutUser);

  /* Open post modal from all CTA locations */
  document.querySelectorAll("[data-open-post]").forEach((button) => {
    button.addEventListener("click", openPostModal);
  });

  /* Close modal via backdrop / close buttons */
  [els.applyModal, els.postModal].forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (!event.target.closest("[data-close-modal]")) return;

      if (modal === els.applyModal) {
        closeApplyModal();
      } else {
        closePostModal();
      }
    });
  });

  /* Global modal keyboard behavior */
  document.addEventListener("keydown", (event) => {
    if (!activeModal) return;

    if (event.key === "Escape") {
      event.preventDefault();
      if (activeModal === els.applyModal) {
        closeApplyModal();
      } else if (activeModal === els.postModal) {
        closePostModal();
      } else {
        closeModal();
      }
      return;
    }

    trapModalFocus(event);
  });

  /* Keep modals closed on orientation/resize if they overflow? Not needed. */
  els.year.textContent = String(new Date().getFullYear());
}

/* ---------- Form validation ---------- */

function getErrorElementFor(input) {
  const describedBy = input.getAttribute("aria-describedby") || "";
  const errorId = describedBy.split(/\s+/).find((id) => id.endsWith("Error"));
  return errorId ? document.getElementById(errorId) : null;
}

function setFieldError(input, message) {
  input.setAttribute("aria-invalid", "true");
  input.closest(".form-field")?.classList.add("has-error");
  const errorElement = getErrorElementFor(input);
  if (errorElement) errorElement.textContent = message;
}

function clearFieldError(input) {
  input.removeAttribute("aria-invalid");
  input.closest(".form-field")?.classList.remove("has-error");
  const errorElement = getErrorElementFor(input);
  if (errorElement) errorElement.textContent = "";
}

function clearFormErrors(form) {
  form.querySelectorAll(".form-control").forEach((control) => clearFieldError(control));
}

function focusFirstInvalid(form) {
  const firstInvalid = form.querySelector("[aria-invalid='true']");
  firstInvalid?.focus();
}

function isValidPhone(value) {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("30") && digits.length > 10) digits = digits.slice(2);
  return /^\d{10}$/.test(digits);
}

function validateApplyForm() {
  clearFormErrors(els.applyForm);

  let isValid = true;
  const name = els.applyName.value.trim();
  const phone = els.applyPhone.value.trim();

  if (name.length < 3) {
    setFieldError(els.applyName, "Συμπλήρωσε το ονοματεπώνυμό σου.");
    isValid = false;
  }

  if (!phone) {
    setFieldError(els.applyPhone, "Συμπλήρωσε το τηλέφωνό σου.");
    isValid = false;
  } else if (!isValidPhone(phone)) {
    setFieldError(els.applyPhone, "Γράψε ένα έγκυρο τηλέφωνο με 10 ψηφία.");
    isValid = false;
  }

  if (!els.applySpecialty.value) {
    setFieldError(els.applySpecialty, "Επίλεξε την ειδικότητά σου.");
    isValid = false;
  }

  if (!isValid) focusFirstInvalid(els.applyForm);
  return isValid;
}

function validatePostForm() {
  clearFormErrors(els.postForm);

  let isValid = true;

  if (els.postTitleInput.value.trim().length < 4) {
    setFieldError(els.postTitleInput, "Γράψε τον τίτλο της θέσης (τουλάχιστον 4 χαρακτήρες).");
    isValid = false;
  }

  if (els.postCompany.value.trim().length < 2) {
    setFieldError(els.postCompany, "Γράψε την επωνυμία της επιχείρησης.");
    isValid = false;
  }

  if (!els.postSpecialty.value) {
    setFieldError(els.postSpecialty, "Επίλεξε ειδικότητα ΕΠΑΛ.");
    isValid = false;
  }

  if (!els.postLocation.value) {
    setFieldError(els.postLocation, "Επίλεξε περιοχή.");
    isValid = false;
  }

  if (!els.postType.value) {
    setFieldError(els.postType, "Επίλεξε τύπο απασχόλησης.");
    isValid = false;
  }

  if (els.postDescription.value.trim().length < 20) {
    setFieldError(els.postDescription, "Πρόσθεσε μια σύντομη περιγραφή με τουλάχιστον 20 χαρακτήρες.");
    isValid = false;
  }

  if (!isValid) focusFirstInvalid(els.postForm);
  return isValid;
}

/* ---------- Apply flow ---------- */

function openApplyModal(jobId) {
  const job = getJobById(jobId);
  if (!job) return;

  activeJobId = job.id;

  els.applyForm.reset();
  clearFormErrors(els.applyForm);
  els.applyFormView.hidden = false;
  els.applySuccess.hidden = true;

  els.applyJobTitle.textContent = job.title;
  els.applyJobCompany.textContent = job.company;
  els.applyJobLocation.textContent = job.location;
  els.applyJobSalary.textContent = job.salary;
  els.applyLogo.dataset.tone = toneForSpecialty(job.specialty);
  els.applyLogoLetter.textContent = getInitials(job.company);
  els.licenseNote.hidden = !job.licenseRequired;

  if (SPECIALTIES.includes(job.specialty)) {
    els.applySpecialty.value = job.specialty;
  }

  const dialog = els.applyModal.querySelector(".modal-dialog");
  if (dialog) dialog.scrollTop = 0;

  openModal(els.applyModal);
}

function closeApplyModal() {
  closeModal(els.applyModal);
}

function submitApply(event) {
  event.preventDefault();
  if (!validateApplyForm()) return;

  const job = getJobById(activeJobId);
  if (!job) return;

  const applicantName = els.applyName.value.trim().split(/\s+/)[0] || "και καλή επιτυχία";

  els.successJobTitle.textContent = job.title;
  els.successCompany.textContent = job.company;
  els.applyFormView.hidden = true;
  els.applySuccess.hidden = false;

  const dialog = els.applyModal.querySelector(".modal-dialog");
  if (dialog) dialog.scrollTop = 0;

  els.closeSuccess.focus({ preventScroll: true });

  showToast({
    title: "Η αίτησή σου στάλθηκε!",
    message: `${applicantName}, η ${job.company} θα επικοινωνήσει μαζί σου για τη θέση «${job.title}». Καλή επιτυχία!`,
    variant: "success",
    duration: 7000
  });
}

/* ---------- Post a job flow ---------- */

function openPostModal() {
  closeMobileNav();

  /* Keep an unfinished draft; only clear the form after a successful publish. */
  if (els.postForm.dataset.completed === "true") {
    els.postForm.reset();
    els.postDescCount.textContent = "0/240";
    delete els.postForm.dataset.completed;
  } else {
    els.postDescCount.textContent = `${els.postDescription.value.length}/240`;
  }

  clearFormErrors(els.postForm);

  const dialog = els.postModal.querySelector(".modal-dialog");
  if (dialog) dialog.scrollTop = 0;

  openModal(els.postModal);
}

function closePostModal() {
  closeModal(els.postModal);
}

function submitPost(event) {
  event.preventDefault();
  if (!validatePostForm()) return;

  const newJob = {
    id: `job-${Date.now()}`,
    title: els.postTitleInput.value.trim(),
    company: els.postCompany.value.trim(),
    location: els.postLocation.value,
    specialty: els.postSpecialty.value,
    type: els.postType.value,
    salary: els.postSalary.value.trim() || "Κατόπιν συζήτησης",
    licenseRequired: els.postLicense.checked,
    postedAt: "Μόλις τώρα",
    description: els.postDescription.value.trim(),
    urgent: els.postUrgent.checked
  };

  jobs.unshift(newJob);

  /* Reset filters so the new job is always visible at the top. */
  state.keyword = "";
  state.specialty = "";
  state.location = "";
  state.apprenticeship = false;
  state.onlySaved = false;
  els.keyword.value = "";
  els.specialtyFilter.value = "";
  els.locationFilter.value = "";
  els.apprenticeshipToggle.checked = false;

  highlightJobId = newJob.id;
  els.postForm.dataset.completed = "true";
  renderAll();
  closePostModal();
  scrollToJobs();

  showToast({
    title: "Η αγγελία δημοσιεύθηκε",
    message: `«${newJob.title}» εμφανίζεται τώρα στην κορυφή του feed.`,
    variant: "success",
    duration: 6500
  });

  window.setTimeout(() => {
    highlightJobId = null;
    els.jobsGrid.querySelector(".job-card--new")?.classList.remove("job-card--new");
  }, 4200);
}

/* ---------- Form event wiring ---------- */

function bindFormEvents() {
  els.applyForm.addEventListener("submit", submitApply);
  els.postForm.addEventListener("submit", submitPost);

  els.closeSuccess.addEventListener("click", closeApplyModal);

  els.browseMore.addEventListener("click", () => {
    closeApplyModal();
    window.setTimeout(scrollToJobs, 260);
  });

  els.postDescription.addEventListener("input", () => {
    els.postDescCount.textContent = `${els.postDescription.value.length}/240`;
  });

  [els.applyForm, els.postForm].forEach((form) => {
    form.addEventListener("input", (event) => {
      if (event.target.matches(".form-control")) clearFieldError(event.target);
    });

    form.addEventListener("change", (event) => {
      if (event.target.matches(".form-control")) clearFieldError(event.target);
    });
  });
}

/* ---------- Init ---------- */

function init() {
  populateSelects();

  /* Drop stale saved ids that no longer exist in the feed. */
  savedIds = new Set([...savedIds].filter((id) => Boolean(getJobById(id))));

  renderAll();
  bindEvents();
  bindFormEvents();

  /* Authoritative auth render on load. */
  updateAuthUI();

  /* Keep the header in sync across tabs, bfcache returns and PHP redirects. */
  window.addEventListener("storage", (event) => {
    if (event.key === AUTH_STORAGE_KEY || event.key === null) updateAuthUI();
  });
  window.addEventListener("pageshow", updateAuthUI);
  document.addEventListener("jobify:auth-changed", updateAuthUI);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
