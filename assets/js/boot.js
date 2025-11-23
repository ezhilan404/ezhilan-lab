document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("boot-overlay");
  const logEl = document.getElementById("boot-log");
  const nav = document.querySelector(".nav");
  if (!overlay || !logEl) return;

  const lines = [
    "[BOOT] initializing personal node...",
    "[OK]   loading profile: ezhilan",
    "[OK]   enabling matrix renderer",
    "[READY] system online. entering lab..."
  ];

  let i = 0;

  function nextLine() {
    if (i < lines.length) {
      logEl.textContent += lines[i] + "\n";
      i++;
      setTimeout(nextLine, 380);
    } else {
      // After logs finish, start CRT flash + flicker + fade + nav slide
      setTimeout(() => {
        // CRT flash
        overlay.classList.add("flash");

        setTimeout(() => {
          // Scanline flicker
          overlay.classList.add("flicker");

          setTimeout(() => {
            // Fade and remove overlay
            overlay.classList.add("fade-out");

            setTimeout(() => {
              overlay.style.display = "none";

              // Slide navbar into view
              if (nav) {
                nav.classList.add("visible");
              }

              // Notify other scripts that boot is complete
              const event = new Event("bootComplete");
              document.dispatchEvent(event);

            }, 600); // fade duration

          }, 260); // flicker duration

        }, 140); // flash duration

      }, 450); // pause after last log line
    }
  }

  nextLine();
});
