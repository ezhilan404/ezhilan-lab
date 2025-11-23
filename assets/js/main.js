
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Terminal typing (shorter)
  const terminal = document.getElementById("terminal-output");
  if (terminal) {
    const lines = [
      "[BOOT] initializing node...",
      "[OK]   profile: ezhilan",
      "[READY] system operational"
    ];
    let lineIndex = 0;
    let charIndex = 0;

    function typeLine() {
      if (lineIndex >= lines.length) return;
      const currentLine = lines[lineIndex];

      if (charIndex === 0) {
        const lineElem = document.createElement("div");
        lineElem.className = "terminal-line";
        lineElem.innerHTML =
          '<span class="prompt">ezhilan@lab</span><span class="path">:~$</span> <span class="output"></span>';
        terminal.appendChild(lineElem);
      }

      const lastLine = terminal.lastElementChild.querySelector(".output");
      lastLine.textContent = currentLine.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex < currentLine.length) {
        setTimeout(typeLine, 30);
      } else {
        charIndex = 0;
        lineIndex++;
        setTimeout(typeLine, 200);
      }
    }

    typeLine();
  }

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  function onScroll() {
    let currentId = null;
    const scrollPos = window.scrollY + 100;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.id;
      }
    });
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        const id = href.slice(1);
        if (id === currentId) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  onScroll();
});
