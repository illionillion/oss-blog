const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

const validateDashCase = (i) => !/[A-Z]/.test(i) && !/_/.test(i)

const checkAvailableName = (basePath, name) => {
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
        if (existsSync(basePath) == false) {
          // パスが現在存在しない場合
          // 新しいフォルダを作っている場合パスが存在しないからここの処理に入る
          return ["Create new folder", "Create new markdown file"]
        } else {
          const folders = getDirectories(basePath)
          if (isTopLevel) {
            return [...folders, "Create new folder"]
          }
          return [...folders, "Create new folder", "Create new markdown file"]
        }
      },
    },
    {
      type: "input",
      name: "newFolder",
      message: "Enter the name for the new folder:",
      when: (answers) => answers.folderAction === "Create new folder",
      validate: (input) => {
        if (!input) return "Folder name cannot be empty"
        if (!validateDashCase(input))
          return "Please enter the folder name in kebab case"
        if (!checkAvailableName(basePath, input))
          return "\nThe same name folder or file already exists\nSolution: Change the folder name"
        return true
      },
    },
    {
      type: "input",
      name: "fileName",
      message: "Enter the name for the markdown file:",
      when: (answers) => answers.folderAction === "Create new markdown file",
      validate: (input) => {
        if (!input) return "File name cannot be empty"
        if (!validateDashCase(input))
          return "Please enter the file name in kebab case"
        if (!checkAvailableName(basePath, `${input}.md`))
          return "\nThe same name folder or file already exists\nSolution: Change the file name"
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
