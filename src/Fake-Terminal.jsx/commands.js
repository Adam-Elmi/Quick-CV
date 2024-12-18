const commands = [
  {
    command: "help",
    description: "Displays a list of available commands. Shows list",
    action: () => {
      return "Available commands\n------------------\n➔ help : Displays a list of available commands.\n➔ clear: Clears all content of the terminal.\n------------------";
    },
  },
  {
    command: ["clear", 'cls'],
    description: "Clear all contents of the terminal.",
    action: (e) => {
      const parent = e.target.parentElement;
     if(parent) {
      parent.innerHTML = "";
     }
     return null;
    },
  },
  {
    command: "Adam",
    description: "Creator of Quick-CV.",
    action: () => {
      return "Hi, I am Adam Elmi, the creator of Quick-CV.\nYou can contact me on my email: Adamcade123@gmail.com"
    },
  },
  {
    command: "show skills",
    description: "Shows all skills.",
    action: () => {
      const storedData = JSON.parse(sessionStorage.getItem("skills"));
      try {
          let formattedData = "";
          for (const key in storedData) {
            if (storedData.hasOwnProperty(key)) {
              formattedData += `<strong style='font-family:monospace;'>${key}</strong>: ${
                storedData[key] || "Not Available"
              }<br>`;
            }
          }
          return storedData ? formattedData : "<span style='color:#f87171; font-family:monospace; font-size: 1rem;'>No data available!</span>";
      } catch (error) {
        return error;
      }
    },
  },
  {
    command: 'n',
    description: "Takes you to root path.",
    action: () => {
      return "hello"
    }
  }
  
];

export { commands };
