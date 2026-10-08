// Charekh Valley - simple JavaScript (no libraries needed)

// 1. Fill phone, email, WhatsApp and address from site-config.js
var site = window.SITE || {};
var items = document.querySelectorAll("[data-site]");
for (var i = 0; i < items.length; i++) {
  var el = items[i];
  var key = el.getAttribute("data-site");
  if (key == "phone-link") {
    el.href = "tel:" + site.phone.replace(/ /g, "");
    el.textContent = site.phone;
  } else if (key == "email-link") {
    el.href = "mailto:" + site.email;
    el.textContent = site.email;
  } else if (key == "wa-link") {
    el.href = "https://wa.me/" + site.whatsapp;
  } else if (site[key]) {
    el.textContent = site[key];
  }
}

// 2. Mobile menu: open and close
var menu = document.querySelector(".theme-nav-menu");
var toggler = document.querySelector(".navbar-toggler");
var closeBtn = document.querySelector(".navbar-close");
if (toggler) {
  toggler.onclick = function () {
    menu.classList.add("menu-on");
    toggler.classList.add("active");
  };
}
if (closeBtn) {
  closeBtn.onclick = function () {
    menu.classList.remove("menu-on");
    toggler.classList.remove("active");
  };
}

// 3. Header turns solid when you scroll down
var header = document.querySelector(".header-area");
window.onscroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
};

// 4. Enquiry form: send to WhatsApp (or to formEndpoint if you set one)
var form = document.getElementById("enquiry");
if (form) {
  form.onsubmit = function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var text = "Enquiry for Charekh Valley\n" +
      "Name: " + data.get("name") + "\n" +
      "Phone: " + data.get("phone") + "\n" +
      "Interest: " + data.get("interest") + "\n" +
      "Message: " + (data.get("note") || "-");

    if (site.formEndpoint) {
      fetch(site.formEndpoint, { method: "POST", body: data })
        .then(function () { window.location.href = "thank-you.html"; })
        .catch(function () {
          form.querySelector(".msg").textContent = "Could not send. Please call or WhatsApp us.";
        });
    } else {
      window.open("https://wa.me/" + site.whatsapp + "?text=" + encodeURIComponent(text), "_blank");
      window.location.href = "thank-you.html";
    }
  };
}