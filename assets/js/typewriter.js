let typewriterStarted = false;

document.addEventListener("DOMContentLoaded", () => {
  // Start when boot sequence finishes
  document.addEventListener("bootComplete", () => {
    startTypewriter();
  });

  // Fallback: if for some reason boot overlay is skipped,
  // start typewriter after a timeout anyway.
  setTimeout(() => {
    startTypewriter();
  }, 2500);
});

function startTypewriter() {
  if (typewriterStarted) return;
  typewriterStarted = true;

  const subtitleEl = document.getElementById("subtitle-text");
  if (!subtitleEl) return;

  const prefix = "Cybersecurity Enthusiast · building and breaking into systems, ";
  const word = "...legally";
  const fullText = prefix + word;

  let idx = 0;
  let deleting = false;
  const pauseBeforeDelete = 1500;
  const typingSpeed = 45;
  const deletingSpeed = 35;

  const jitterVariants = ["...legall", "...leg*ly", "...leg@lly", "...leg4lly", "...legally"];
  let jitterDone = false;

  function render(currentIdx) {
    if (currentIdx <= prefix.length) {
      subtitleEl.textContent = fullText.slice(0, currentIdx);
    } else {
      const typedPrefix = fullText.slice(0, prefix.length);
      const typedWord = fullText.slice(prefix.length, currentIdx);
      subtitleEl.innerHTML =
        typedPrefix + "<span class='legal-accent'>" + typedWord + "</span>";
    }
  }

  function typeLoop() {
    let delay = typingSpeed;

    if (!deleting) {
      render(idx);

      // pause before typing "legally"
      if (idx === prefix.length) {
        delay = 650;
      }

      idx++;

      // jitter on "legally"
      if (idx === fullText.length && !jitterDone) {
        jitterDone = true;
        let j = 0;
        const interval = setInterval(() => {
          const variant = jitterVariants[j];
          const base = prefix;
          const inner =
            j === jitterVariants.length - 1
              ? base + "<span class='legal-accent'>" + variant + "</span>"
              : base + variant;
          subtitleEl.innerHTML = inner;
          j++;
          if (j >= jitterVariants.length) {
            clearInterval(interval);
          }
        }, 120);
      }

      if (idx > fullText.length) {
        setTimeout(() => {
          deleting = true;
          typeLoop();
        }, pauseBeforeDelete);
        return;
      }
    } else {
      idx--;
      if (idx < 0) idx = 0;
      if (idx === 0) {
        deleting = false;
        jitterDone = false;
      }
      if (idx === 0) {
        subtitleEl.textContent = "";
      } else {
        render(idx);
      }
      delay = deletingSpeed;
    }

    setTimeout(typeLoop, delay);
  }

  typeLoop();
}
