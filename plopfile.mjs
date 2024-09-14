const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

const validateDashCase = (i) => !/[A-Z]/.test(i) && !/_/.test(i)

const checkAvailableName = (basePath, name, isFolder) => {
  const newPath = path.join(basePath, name)
  console.log(newPath)
  if (existsSync(newPath)) {
    console.log("Already exists")
    return false
  }
  console.log("Available")
  return true
}

const folderPrompt = (_, basePath, isTopLevel) => {
  console.log(basePath)
  console.log(isTopLevel)
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
        console.log(input)
        return true
      },
    },
    {
      type: "input",
      name: "fileName",
      message: "Enter the name for the markdown file:",
      when: (answers) => answers.folderAction === "Create new markdown file",
      validate: (input) => {
        console.log(input)
        return true
      },
    },
  ]
}

export default function plop(plop) {
  console.log("ここにアスキーアートとかでウェルカムメッセージとかを表示する")
  plop.setGenerator("article", {
    description: "Generate article folder and markdown file",
    prompts: async (inquirer) => {
      const answers = await inquirer.prompt(folderPrompt)
      console.log(answers)
      return answers
    },
    actions: (answers) => {
      console.log(answers)
      return []
    },
  })
}
