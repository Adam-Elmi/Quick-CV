const commands = [
  {
    command: toLowerCase(["Help"]),
    description: "Displays a list of available commands. Shows list",
    action: () => {
      return "Available commands\n------------------\n➔ help : Displays a list of available commands.\n➔ clear: Clears all content of the terminal.\n------------------";
    },
  },
  {
    command: toLowerCase(["Clear", "Cls"]),
    description: "Clear all contents of the terminal.",
    action: () => {
     return "";
    },
  },
  {
    command: toLowerCase(["Adam"]),
    description: "Creator of Quick-CV.",
    action: () => {
      return "Hi, I am Adam Elmi, the creator of Quick-CV.\nYou can contact me on my email: Adamcade123@gmail.com";
    },
  },
  {
    command: toLowerCase(["Show skills"]),
    description: "Shows all skills.",
    action: () => {
      const storedData = JSON.parse(sessionStorage.getItem("skills"));
      try {
        let formattedData = "";
        for (const key in storedData) {
          if (storedData.hasOwnProperty(key)) {
            formattedData += `${key}: ${
              storedData[key] || "Not Available"
            }`;
          }
        }
        return storedData
          ? formattedData
          : "No data available!";
      } catch (error) {
        return error;
      }
    },
  },
  {
    command: toLowerCase(["n"]),
    description: "Takes you to root path.",
    action: () => {
      return "hello";
    },
  },
];


function toLowerCase(arr) {
  return arr.map(value => value.toLowerCase());
}


export { commands };
