$(function () {
  // low links, scroll to top

  $(document).on("click", "a.button, a.low-link", function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // stamps

  const stamps = document.querySelectorAll(".stamp");

  stamps.forEach((stamp) => {
    const randomRotation = Math.random() * 10 - 5; // Generates a random number between -5 and 5
    stamp.style.transform = `rotate(${randomRotation}deg)`;
  });

  // ping slideshow

  $(".next").click(function () {
    showNextPing();
    console.log("next ping!!!");
  });

  $(".prev").click(function () {
    showPrevPing();
    console.log("prev ping!!!");
  });

  const slideshowPings = document.querySelectorAll(".ping-slideshow div.ping");
  const rollPings = document.querySelectorAll(".ping-roll div.ping");
  let currentIndex = 0;

  function showPing(index) {
    // Update active state in slideshow
    slideshowPings.forEach((ping, i) => {
      ping.classList.toggle("active", i === index);
    });

    // Update border in ping roll
    rollPings.forEach((ping, i) => {
      ping.style.border =
        i === index ? "1px solid rgba(0,0,0,0.5)" : "1px solid #f0f0f0";
    });
  }

  function showNextPing() {
    currentIndex = (currentIndex + 1) % slideshowPings.length;
    showPing(currentIndex);
  }

  function showPrevPing() {
    currentIndex =
      (currentIndex - 1 + slideshowPings.length) % slideshowPings.length;
    showPing(currentIndex);
  }

  // Initial setup
  showPing(currentIndex);

  // start original ping slideshow

  // $(".next").click(function () {
  //   showNextPing();
  //   console.log("next ping!!!");
  // });

  // $(".prev").click(function () {
  //   showPrevPing();
  //   console.log("prev ping!!!");
  // });

  // const pings = document.querySelectorAll(".ping-slideshow div.ping");
  // let currentIndex = 0;

  // function showPing(index) {
  //   pings.forEach((ping, i) => {
  //     ping.classList.toggle("active", i === index);
  //   });
  // }

  // function showNextPing() {
  //   currentIndex = (currentIndex + 1) % pings.length;
  //   showPing(currentIndex);
  // }

  // function showPrevPing() {
  //   currentIndex = (currentIndex - 1 + pings.length) % pings.length;
  //   showPing(currentIndex);
  // }

  // showPing(currentIndex);

  // end original ping slideshow

  // HOME -> CLICK ANYWHERE TO ENTER

  // $("a.enter").click(function (e) {
  //   e.preventDefault();
  //   $("nav#primary a").removeClass("current");
  //   $("body.home .content.home").addClass("hidden");
  //   $("a.enter").fadeOut();
  //   setTimeout(function () {
  //     $(".content.hidden.about").removeClass("goodbye");
  //   }, 500);
  //   setTimeout(function () {
  //     $("body.home .content.home").addClass("goodbye");
  //     $("body").removeClass("home");
  //     $("body").addClass("about");
  //     $("nav#primary a.about-link").addClass("current");
  //   }, 1500);
  // });

  // // ANY PAGE -> BACK TO HOME

  // $("a.home-link").click(function () {
  //   $("body").removeClass("about");
  //   $("body").removeClass("method");
  //   $("body").removeClass("app");
  //   $("body").removeClass("people");
  //   $("body").removeClass("transmissions");
  //   $("body").addClass("home");
  //   $(".content.about").addClass("hidden");
  //   $(".content.method").addClass("hidden");
  //   $(".content.app").addClass("hidden");
  //   $(".content.people").addClass("hidden");
  //   $(".content.transmissions").addClass("hidden");
  //   setTimeout(function () {
  //     // $(".content.method").addClass("goodbye");
  //     $("body.home .content.home").removeClass("goodbye");
  //   }, 500);
  //   setTimeout(function () {
  //     $("body.home .content.home").removeClass("hidden");
  //     $(".content.about").addClass("goodbye");
  //     $(".content.method").addClass("goodbye");
  //     $(".content.app").addClass("goodbye");
  //     $(".content.people").addClass("goodbye");
  //     $(".content.transmissions").addClass("goodbye");
  //     $("a.enter").fadeIn();
  //   }, 1500);
  // });

  // // ANY PAGE -> ABOUT

  // $("a.about-link").click(function (e) {
  //   e.preventDefault();
  //   $("body").removeClass("method");
  //   $("body").removeClass("app");
  //   $("body").removeClass("people");
  //   $(".content.method").addClass("hidden");
  //   $(".content.app").addClass("hidden");
  //   $(".content.people").addClass("hidden");
  //   $("nav#primary a.method-link").removeClass("current");
  //   $("nav#primary a.app-link").removeClass("current");
  //   $("nav#primary a.people-link").removeClass("current");
  //   $("nav#primary a.about-link").addClass("current");
  //   setTimeout(function () {
  //     $(".content.about").addClass("hidden");
  //     $(".content.about").removeClass("goodbye");
  //     $(".content.method").addClass("goodbye");
  //     $(".content.app").addClass("goodbye");
  //     $(".content.people").addClass("goodbye");
  //   }, 500);
  //   setTimeout(function () {
  //     $("body").addClass("about");
  //     $(".content.about").removeClass("hidden");
  //   }, 1500);
  // });

  // // ANY PAGE -> METHOD

  // $("a.method-link").click(function (e) {
  //   e.preventDefault();
  //   $("body").removeClass("about");
  //   $("body").removeClass("app");
  //   $("body").removeClass("people");
  //   $("body").removeClass("transmissions");
  //   $(".content.about").addClass("hidden");
  //   $(".content.app").addClass("hidden");
  //   $(".content.people").addClass("hidden");
  //   $(".content.transmissions").addClass("hidden");
  //   $("nav#primary a.about-link").removeClass("current");
  //   $("nav#primary a.app-link").removeClass("current");
  //   $("nav#primary a.people-link").removeClass("current");
  //   $("nav#primary a.transmissions-link").removeClass("current");
  //   $("nav#primary a.method-link").addClass("current");
  //   setTimeout(function () {
  //     $(".content.method").addClass("hidden");
  //     $(".content.method").removeClass("goodbye");
  //     $(".content.about").addClass("goodbye");
  //     $(".content.app").addClass("goodbye");
  //     $(".content.people").addClass("goodbye");
  //     $(".content.transmissions").addClass("goodbye");
  //   }, 500);
  //   setTimeout(function () {
  //     $("body").addClass("method");
  //     $(".content.method").removeClass("hidden");
  //   }, 1500);
  // });

  // // ANY PAGE -> APP

  // $("a.app-link").click(function (e) {
  //   e.preventDefault();
  //   $("body").removeClass("about");
  //   $("body").removeClass("method");
  //   $("body").removeClass("people");
  //   $("body").removeClass("transmissions");
  //   $(".content.about").addClass("hidden");
  //   $(".content.method").addClass("hidden");
  //   $(".content.people").addClass("hidden");
  //   $(".content.transmissions").addClass("hidden");
  //   $("nav#primary a.about-link").removeClass("current");
  //   $("nav#primary a.method-link").removeClass("current");
  //   $("nav#primary a.people-link").removeClass("current");
  //   $("nav#primary a.transmissions-link").removeClass("current");
  //   $("nav#primary a.app-link").addClass("current");
  //   setTimeout(function () {
  //     $(".content.about").addClass("hidden");
  //     $(".content.about").addClass("goodbye");
  //     $(".content.method").addClass("hidden");
  //     $(".content.method").addClass("goodbye");
  //     $(".content.people").addClass("hidden");
  //     $(".content.people").addClass("goodbye");
  //     $(".content.transmissions").addClass("hidden");
  //     $(".content.transmissions").addClass("goodbye");
  //     $(".content.app").removeClass("goodbye");
  //   }, 500);
  //   setTimeout(function () {
  //     $("body").addClass("app");
  //     $(".content.app").removeClass("hidden");
  //   }, 1500);
  // });

  // // ANY PAGE -> PEOPLE

  // $("a.people-link").click(function (e) {
  //   e.preventDefault();
  //   $("body").removeClass("about");
  //   $("body").removeClass("method");
  //   $("body").removeClass("app");
  //   $("body").removeClass("transmissions");
  //   $(".content.about").addClass("hidden");
  //   $(".content.method").addClass("hidden");
  //   $(".content.app").addClass("hidden");
  //   $(".content.transmissions").addClass("hidden");
  //   $("nav#primary a.about-link").removeClass("current");
  //   $("nav#primary a.method-link").removeClass("current");
  //   $("nav#primary a.app-link").removeClass("current");
  //   $("nav#primary a.transmissions-link").removeClass("current");
  //   $("nav#primary a.people-link").addClass("current");
  //   setTimeout(function () {
  //     $(".content.about").addClass("hidden");
  //     $(".content.about").addClass("goodbye");
  //     $(".content.method").addClass("hidden");
  //     $(".content.method").addClass("goodbye");
  //     $(".content.app").addClass("hidden");
  //     $(".content.app").addClass("goodbye");
  //     $(".content.transmissions").addClass("hidden");
  //     $(".content.transmissions").addClass("goodbye");
  //     $(".content.people").removeClass("goodbye");
  //   }, 500);
  //   setTimeout(function () {
  //     $("body").addClass("people");
  //     $(".content.people").removeClass("hidden");
  //   }, 1500);
  // });

  // // ANY PAGE -> TRANSMISSIONS

  // $("a.transmissions-link").click(function (e) {
  //   e.preventDefault();
  //   $("body").removeClass("about");
  //   $("body").removeClass("method");
  //   $("body").removeClass("app");
  //   $("body").removeClass("people");
  //   $(".content.about").addClass("hidden");
  //   $(".content.method").addClass("hidden");
  //   $(".content.app").addClass("hidden");
  //   $(".content.people").addClass("hidden");
  //   $("nav#primary a.about-link").removeClass("current");
  //   $("nav#primary a.method-link").removeClass("current");
  //   $("nav#primary a.app-link").removeClass("current");
  //   $("nav#primary a.people-link").removeClass("current");
  //   $("nav#primary a.transmissions-link").addClass("current");
  //   setTimeout(function () {
  //     $(".content.about").addClass("hidden");
  //     $(".content.about").addClass("goodbye");
  //     $(".content.method").addClass("hidden");
  //     $(".content.method").addClass("goodbye");
  //     $(".content.app").addClass("hidden");
  //     $(".content.app").addClass("goodbye");
  //     $(".content.people").addClass("hidden");
  //     $(".content.people").addClass("goodbye");
  //     $(".content.transmissions").removeClass("goodbye");
  //   }, 500);
  //   setTimeout(function () {
  //     $("body").addClass("transmissions");
  //     $(".content.transmissions").removeClass("hidden");
  //   }, 1500);
  // });
});
