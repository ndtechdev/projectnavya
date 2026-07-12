// WAIT UNTIL HTML IS FULLY LOADED
document.addEventListener("DOMContentLoaded", () => {
  // SAMPLE INTERN DATA
  const interns = [
    {
      name: "Sample Intern 1",
      campaign: "Recycling Drive",
      amountRaised: 250
    },
    {
      name: "Sample Intern 2",
      campaign: "Awareness Campaign",
      amountRaised: 175
    },
    {
      name: "Sample Intern 3",
      campaign: "Family Outreach",
      amountRaised: 125
    }
  ];

  const campaignsCompleted = 3;

  // FORMAT MONEY
  function formatMoney(amount) {
    return "$" + amount.toLocaleString();
  }

  // LOAD LEADERBOARD TABLE
  function loadLeaderboard() {
    const leaderboardBody = document.getElementById("leaderboard-body");

    if (!leaderboardBody) return;

    const sortedInterns = [...interns]
      .sort((a, b) => b.amountRaised - a.amountRaised)
      .slice(0, 10);

    leaderboardBody.innerHTML = "";

    sortedInterns.forEach((intern, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${intern.name}</td>
        <td>${intern.campaign}</td>
        <td>${formatMoney(intern.amountRaised)}</td>
      `;

      leaderboardBody.appendChild(row);
    });
  }

  // LOAD IMPACT STATS
  function loadImpactStats() {
    const totalRaisedElement = document.getElementById("total-raised");
    const activeInternsElement = document.getElementById("active-interns");
    const campaignsCompletedElement = document.getElementById("campaigns-completed");

    if (!totalRaisedElement || !activeInternsElement || !campaignsCompletedElement) return;

    const totalRaised = interns.reduce((sum, intern) => {
      return sum + intern.amountRaised;
    }, 0);

    totalRaisedElement.textContent = formatMoney(totalRaised);
    activeInternsElement.textContent = interns.length;
    campaignsCompletedElement.textContent = campaignsCompleted;
  }

  // SHOW SELECTED PAGE
  function showPage(pageId, updateUrl = true) {
    const pages = document.querySelectorAll(".page");
    const navLinks = document.querySelectorAll(".nav-link");

    // Hide all pages
    pages.forEach((page) => {
      page.classList.remove("active");
    });

    // Remove active style from all nav buttons
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    // If old FAQ hash exists, redirect to contact
    if (pageId === "faq") {
      pageId = "contact";
    }

    const selectedPage = document.getElementById(pageId);
    const selectedNavLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);

    // If page does not exist, safely go home
    if (!selectedPage) {
      const homePage = document.getElementById("home");
      const homeButton = document.querySelector(`.nav-link[data-page="home"]`);

      if (homePage) homePage.classList.add("active");
      if (homeButton) homeButton.classList.add("active");

      if (updateUrl) {
        window.location.hash = "home";
      }

      return;
    }

    selectedPage.classList.add("active");

    if (selectedNavLink) {
      selectedNavLink.classList.add("active");
    }

    if (updateUrl) {
      window.location.hash = pageId;
    }

    window.scrollTo(0, 0);
  }

  // OPEN CORRECT PAGE ON REFRESH
  function loadPageFromUrl() {
    let pageFromHash = window.location.hash.replace("#", "");

    if (pageFromHash === "faq") {
      pageFromHash = "contact";
    }

    if (pageFromHash) {
      showPage(pageFromHash, false);
    } else {
      showPage("home", false);
    }
  }

  // NAVBAR + HOME BUTTON CLICKS
  document.querySelectorAll(".nav-link, .hero-tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      const pageId = button.getAttribute("data-page");
      showPage(pageId);
    });
  });

  // BACK/FORWARD BUTTON SUPPORT
  window.addEventListener("hashchange", () => {
    loadPageFromUrl();
  });

  // LOAD DATA
  loadLeaderboard();
  loadImpactStats();
  loadPageFromUrl();
});