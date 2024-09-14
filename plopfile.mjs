const folderPrompt = (_, basePath, isTopLevel) => {
  return [
    {
      type: "list",
      name: "folderAction",
      message: "Select folder or create new one:",
      choices: () => {
        return []
      },
    },
    {
      type: "input",
      name: "newFolder",
      message: "Enter the name for the new folder:",
      when: (answers) => answers.folderAction === "Create new folder",
      validate: (input) => {
        return true
      },
    },
    {
      type: "input",
      name: "fileName",
      message: "Enter the name for the markdown file:",
      when: (answers) => answers.folderAction === "Create new markdown file",
      validate: (input) => {
        return true
      },
    },
  ]
}

folderPrompt
