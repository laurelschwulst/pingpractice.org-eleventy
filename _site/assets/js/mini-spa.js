(function () {
  "use strict";

  /**
   * Load content into page without a whole page reload
   * @param {string} href URL to route to
   * @param {boolean} pushState whether to call history.pushState or not
   */
  async function load(href, pushState) {
    const container = $("main");
    const xhr = new XMLHttpRequest();
    xhr.onload = async function () {
      const d = xhr.responseXML;
      const dTitle = d.title || "";
      const dContainer = $("main", d);
      container.innerHTML = (dContainer && dContainer.innerHTML) || "";
      document.title = dTitle;
      if (pushState) {
        history.pushState({}, dTitle, href);
      }
      container.focus();
      window.scrollTo(0, 0);
      updateMainMenu(href);
      updateBodyClass(href);
      updateTransmissionLayout(href);
      document.body.classList.remove('loading');
      resetFigure();
    };
    xhr.onerror = function () {
      document.location.href = href;
      return;
    };
    xhr.open("GET", href);
    xhr.responseType = "document";
    xhr.send();
  }

  updateMainMenu(document.location.href);
  updateBodyClass(document.location.href);
  updateTransmissionLayout(document.location.href);

  function normalizeUrl(url) {
    // Create a temporary link element to easily parse the URL
    const a = document.createElement("a");
    a.href = url;

    // Return the pathname part of the URL, which includes the relative path
    return a.pathname.replace(/\/+$/, ""); // Remove any trailing slashes
  }

  function updateMainMenu(newHref) {
    newHref = normalizeUrl(newHref); // Normalize the newHref

    const links = document.querySelectorAll(
      "nav#primary a, nav#ping-practice a"
    );

    links.forEach((link) => {
      const normalizedLinkHref = normalizeUrl(link.href); // Normalize the link href

      if (normalizedLinkHref === newHref) {
        link.classList.add("current");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("current");
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateBodyClass(href) {
    const isTransmission = getIsTransmission(href)
    if (isTransmission) {
      document.body.className = "transmission"
    } else {
      // Extract the last part of the URL path, or set to 'home' for the root
      const normalizedHref = normalizeUrl(href);
      const path = normalizedHref.split("/").filter(Boolean).pop() || "home";
      document.body.className = path
    }
  }

  function updateTransmissionLayout() {
    // transmission backlink at the bottom of a transmission page
    const backToTransmissionButton = document.querySelector('nav#bottom a.transmissions-link')
    if (backToTransmissionButton) {
      backToTransmissionButton.addEventListener('click', () => {
        setTimeout(() => {
          const backToTransmissionsLink = document.querySelector('a.transmission-backlink')
          console.log(backToTransmissionsLink)
          backToTransmissionsLink?.click()
        }, 500)
      })
    }
  }

  function $(sel, con) {
    return (con || document).querySelector(sel);
  }

  /**
   * Search for a parent anchor tag outside a clicked event target
   *
   * @param {HTMLElement} el the clicked event target.
   * @param {number} maxNests max number of levels to go up.
   * @returns the anchor tag or null
   */
  function findAnchorTag(el, maxNests = 3) {
    for (let i = maxNests; el && i > 0; --i, el = el.parentNode) {
      if (el.nodeName === "A") {
        return el;
      }
    }
    return null;
  }

  window.addEventListener("click", function (evt) {
    let baseUrl = $('meta[name="x-base-url"]')?.getAttribute("content") || "/";
    const el = findAnchorTag(evt.target);
    const href = el?.getAttribute("href");
    if (el && href) {
      if (
        href.startsWith("#") ||
        el.getAttribute("target") === "_blank" ||
        /\.\w+$/.test(href)
      ) {
        console.log("no SPA handling");
        return;
      }

      if (href.startsWith(baseUrl) || el.classList.includes("spa-link")) {
        console.log("handle SPA!!!!!!");
        evt.preventDefault();
        handleSpaNavigation(href)
      }
    }
  });

  window.addEventListener("popstate", function (e) {
    // remove?
    load(document.location.pathname, false);
  });

  async function handleSpaNavigation(newHref) {
    document.body.classList.add("loading")

    // if we are navigating to transmission page, handle layout
    const currentHref = document.location.href
    const isNewHrefTransmission = getIsTransmission(newHref)
    if (isNewHrefTransmission) {
      removeFigure()
      await sleep(500)
      resetFigure()
      document.body.classList.add('transmission')
    }

    // if we are navigating away from transmission page, handle layout
    const isCurrentHrefTransmission = getIsTransmission(currentHref)
    const unloadTransmission = isCurrentHrefTransmission && !isNewHrefTransmission
    if (unloadTransmission) {
      document.body.classList.add('unload-transmission')
      setTimeout(() => {
        document.body.classList.remove('unload-transmission')
        document.body.classList.remove('transmission')
        const mainmenu = document.querySelector("nav#primary");
        const figure = document.querySelector("figure.pp");
        mainmenu.style.opacity = 0;
        figure.style.opacity = 0;
      }, 500)
    }

    // if we are navigating to home page, handle layout
    if (newHref === '/') {
      document.body.classList.add('home')
    }

    // wait 500ms for fadeout animations, then load
    setTimeout(function () {
      load(newHref, true);
    }, 500);
    // updateMainMenu(href);
  }

  function getIsTransmission(href) {
    const normalizedHref = normalizeUrl(href);

    // Check if the URL starts with /transmissions/ and has more than 2 segments
    const isTransmission =
      normalizedHref.startsWith("/transmissions/") &&
      normalizedHref.split("/").length > 2;
    
    return isTransmission
  }

  function removeFigure() {
    const mainmenu = document.querySelector("nav#primary");
    const figure = document.querySelector("figure.pp");
    figure.style.opacity = 0; // Fade out
    mainmenu.style.opacity = 0; // Fade out
  }

  function resetFigure() {
    const mainmenu = document.querySelector("nav#primary");
    const figure = document.querySelector("figure.pp");
    figure.style.opacity = ''
    mainmenu.style.opacity = ''
  }

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
})();
