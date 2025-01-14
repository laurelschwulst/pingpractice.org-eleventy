(function () {
  "use strict";

  /**
   * Load content into page without a whole page reload
   * @param {string} href URL to route to
   * @param {boolean} pushState whether to call history.pushState or not
   */
  function load(href, pushState) {
    const container = $("main");
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
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
      // console.log("laurel!");
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
    const body = document.body;
    const normalizedHref = normalizeUrl(href);

    // Extract the last part of the URL path, or set to 'home' for the root
    const path = normalizedHref.split("/").filter(Boolean).pop() || "home";

    // Check if the URL starts with /transmissions/ and has more than 2 segments
    const isTransmission =
      normalizedHref.startsWith("/transmissions/") &&
      normalizedHref.split("/").length > 2;

    // Set the timeout duration: 3000ms if it's a transmission, otherwise 1500ms
    const timeoutDuration = isTransmission ? 2000 : 1250;

    // Set the body class
    setTimeout(function () {
      body.className = isTransmission ? "transmission" : path; // Use "transmission" if it's a transmission, otherwise the path
      document
        .querySelectorAll("img.overlay")
        .forEach((img) => img.classList.remove("fadeout"));
    }, timeoutDuration);
  }

  function updateTransmissionLayout(href) {
    // Use URL parsing to ensure we have a path like /transmissions/something
    const urlPath = new URL(href, document.baseURI).pathname; // Parse the pathname from the href
    const isTransmission =
      urlPath.startsWith("/transmissions/") && urlPath.split("/").length > 3;

    const figure = document.querySelector("figure.pp");
    const mainmenu = document.querySelector("nav#primary");

    if (figure) {
      if (isTransmission) {
        // Fade out the figure if it's a transmission detail page
        console.log("it's a transmission page");
        figure.style.transition = "opacity 0.5s ease-in-out"; // Smooth fade
        figure.style.opacity = 0; // Fade out
        mainmenu.style.transition = "opacity 0.5s ease-in-out"; // Smooth fade
        mainmenu.style.opacity = 0; // Fade out

        // Wait 1500ms and then hide it (make it not take up space)
        setTimeout(function () {
          figure.style.display = "none"; // Make it disappear from the layout
          mainmenu.style.display = "none"; // Make it disappear from the layout
        }, 1500); // 1500ms delay
      }
      else {
        // Ensure it's visible again in the layout
        figure.style.display = "block"; // Make sure it takes up space in the layout
        figure.style.transition = "opacity 0.5s ease-in-out"; // Smooth fade
        mainmenu.style.display = "block"; // Make sure it takes up space in the layout
        mainmenu.style.transition = "opacity 0.5s ease-in-out"; // Smooth fade
        setTimeout(function () {
          figure.style.opacity = 1; // Fade in
          mainmenu.style.opacity = 1; // Fade in
        }, 500)
      }
    }

    // transmission backlink at the bottom of a transmission page
    const backToTransmissionButton = document.querySelector('nav#bottom a.transmissions-link')
    backToTransmissionButton.addEventListener('click', () => {
      setTimeout(() => {
        const backToTransmissionsLink = document.querySelector('a.transmission-backlink')
        console.log(backToTransmissionsLink)
        backToTransmissionsLink?.click()
      }, 500)
    })
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

      // if the link is "back to transmissions"
      // do the opposite of this:

      // const figure = document.querySelector("figure.pp");
      // const mainmenu = document.querySelector("nav#primary");
      // figure.style.opacity = 1;
      // mainmenu.style.opacity = 1;
      // figure.style.display = "block";
      // mainmenu.style.display = "none";

      // setTimeout(function () {
      //   figure.style.opacity = 1;
      //   mainmenu.style.opacity = 1;
      // }, 1500);

      if (href.startsWith(baseUrl) || el.classList.includes("spa-link")) {
        console.log("handle SPA!!!!!!");
        evt.preventDefault();
        let modifiedHref = href.replace(/^\/|\/$/g, "");
        document.querySelector(`div.content`).classList.add("fadeout");
        document
          .querySelectorAll("img.overlay")
          .forEach((img) => img.classList.add("fadeout"));
        setTimeout(function () {
          load(href, true);
        }, 500);
        updateMainMenu(href);
      }
    }
  });

  window.addEventListener("popstate", function (e) {
    // remove?
    load(document.location.pathname, false);
  });
})();
