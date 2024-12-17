const commands = [
  {
    command: "help",
    description: "Displays a list of available commands. Shows list",
    action: () => {
      return "Available commands\n------------------\n➔ help : displays a list of available commands.\n➔ clear: Clear all content of the terminal.\n------------------";
    },
  },
  {
    command: "clear",
    description: "Clear all content of the terminal.",
    action: (e) => {
      e.target.parentElement.innerHTML = "";
    },
  },
  {
    command: "show skills",
    description: "Clear all content of the terminal.",
    action: () => {
      const storedData = JSON.parse(sessionStorage.getItem("skills"));
      try {
        if (storedData) {
          let formattedData = "";
          for (const key in storedData) {
            if (storedData.hasOwnProperty(key)) {
              formattedData += `<strong>${key}</strong>: ${
                storedData[key] || "Not Available"
              }<br>`;
            }
          }
          return formattedData;
        }
      } catch (error) {}
    },
  },
];

export { commands };
