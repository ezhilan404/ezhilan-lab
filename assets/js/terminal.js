// assets/js/terminal.js
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("lab-terminal");
  const output = document.getElementById("lab-terminal-output");
  const form = document.getElementById("lab-terminal-form");
  const input = document.getElementById("lab-terminal-input");
  const radar = document.getElementById("lab-radar");
  const selfDestruct = document.getElementById("self-destruct-overlay");
  const selfDestructCountdown = document.getElementById("self-destruct-countdown");

  if (!overlay || !output || !form || !input) return;

  let terminalOpen = false;

  function openTerminal() {
    overlay.classList.add("open");
    terminalOpen = true;
    input.focus();
    if (!output.dataset.booted) {
      printLine("ez@lab:~  // interactive lab terminal");
      printLine("type 'help' to see available commands.");
      printLine("");
      output.dataset.booted = "1";
    }
  }

  function closeTerminal() {
    overlay.classList.remove("open");
    terminalOpen = false;
  }

  function printLine(text = "", cls = "") {
    const line = document.createElement("div");
    if (cls) line.className = cls;
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function showRadar() {
    if (!radar) return;
    radar.classList.add("active");
    printLine(">> initializing world scan...");
    setTimeout(() => {
      printLine(">> nodes detected: 3  |  latency: stable");
    }, 700);
    setTimeout(() => {
      radar.classList.remove("active");
      printLine(">> scan complete.");
    }, 4000);
  }

  function startSelfDestruct() {
    if (!selfDestruct || !selfDestructCountdown) return;
    let count = 5;
    selfDestructCountdown.textContent = count.toString();
    selfDestruct.classList.add("active");
    printLine("!! self destruct sequence initiated");
    printLine("!! abort not available in demo mode");

    const interval = setInterval(() => {
      count -= 1;
      selfDestructCountdown.textContent = count.toString();
      if (count <= 0) {
        clearInterval(interval);
        setTimeout(() => {
          selfDestruct.classList.remove("active");
          printLine("");
          printLine(">> system restored. you survived.");
        }, 700);
      }
    }, 1000);
  }

  function handleCommand(raw) {
    const command = raw.trim();

    if (!command) return;

    switch (command.toLowerCase()) {
      case "help":
        printLine("available commands:");
        printLine("  help           show this help");
        printLine("  clear          clear the terminal");
        printLine("  status         node + system status");
        printLine("  radar          world scan radar");
        printLine("  scan --world   alias for radar");
        printLine("  selfdestruct   trigger fake self destruct");
        printLine("  exit           close terminal");
        break;

      case "clear":
        output.innerHTML = "";
        break;

      case "status":
        printLine("node: ezhilan-lab   |  status: ONLINE");
        printLine("matrix: rendering   |  intrusion: none");
        printLine("projects: honeypot, firewall_sim, web_scanner");
        break;

      case "radar":
      case "scan --world":
        showRadar();
        break;

      case "selfdestruct":
      case "self-destruct":
        startSelfDestruct();
        break;

      case "exit":
        closeTerminal();
        break;

      default:
        printLine(`command not found: ${command}`);
        printLine(`type 'help' for a list of commands.`);
    }
  }

  // Submit handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value;
    printLine(`ez@lab:~$ ${value}`);
    handleCommand(value);
    input.value = "";
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // toggle with ~ or `
    if (e.key === "`" || e.key === "~") {
      e.preventDefault();
      if (terminalOpen) {
        closeTerminal();
      } else {
        openTerminal();
      }
    }

    // close with ESC
    if (e.key === "Escape" && terminalOpen) {
      closeTerminal();
    }
  });
});
