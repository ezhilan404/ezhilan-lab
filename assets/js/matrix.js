
window.addEventListener("load", () => {
  const canvas = document.getElementById("matrix-bg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width, height, columns, drops, phases;
  const letters = "01#/$%&<>[]{}!@^*";

  function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    const columnWidth = 18;
    columns = Math.floor(width / columnWidth);
    drops = Array(columns).fill(1);
    phases = Array.from({ length: columns }, () => Math.random() * Math.PI * 2);
  }

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#22c55e";
    ctx.font = "18px monospace";

    const columnWidth = 18;
    const t = Date.now() / 4500;

    for (let i = 0; i < columns; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      const drift = Math.sin(t + phases[i]) * 4;
      const x = i * columnWidth + drift;
      const y = drops[i] * columnWidth;

      ctx.fillText(text, x, y);

      if (y > height && Math.random() > 0.97) {
        drops[i] = 0;
      }

      drops[i] += 0.22;
    }

    requestAnimationFrame(draw);
  }

  init();
  window.addEventListener("resize", init);
  requestAnimationFrame(draw);
});
