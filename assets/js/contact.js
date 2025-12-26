// assets/js/contact.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("contact-status");
  const submitBtn = document.getElementById("contact-submit");

  if (!form || !statusEl || !submitBtn) return;

  // 🔐 REPLACE these with your real values from EmailJS
  const SERVICE_ID = "service_ezhil";   
  const TEMPLATE_ID = "template_nmvnwq8"; 
  const PUBLIC_KEY = "BITdxwSyWAGtUcgWl";   

  // ✅ EmailJS v4 init syntax
  emailjs.init({
    publicKey: PUBLIC_KEY,
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    statusEl.textContent = "";
    statusEl.className = "contact-status";
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, this)
      .then(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        statusEl.textContent = "Message sent. I’ll get back to you soon.";
        statusEl.classList.add("success");

        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        statusEl.textContent =
          "Something went wrong. Try again in a moment or email me directly.";
        statusEl.classList.add("error");
      });
  });
});
