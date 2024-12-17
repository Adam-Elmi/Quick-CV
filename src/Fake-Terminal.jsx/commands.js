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
      return null;
    },
  },
  {
    command: "creator",
    description: "Clear all content of the terminal.",
    action: () => {
      return "[Creator of Quick-CV]\n_____________________\nName: Adam Elmi Eid\nEmail: Adamcade123@gmail.com\nPhone: +252 63 4709061";
    },
  },
  {
    command: "skills",
    description: "Clear all content of the terminal.",
    action: () => {
     const savedData = JSON.parse(sessionStorage.getItem("skills"));
     return savedData ? savedData : {};
    },
  },
];

export { commands };
