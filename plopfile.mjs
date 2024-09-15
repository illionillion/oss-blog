import { existsSync, readdirSync } from "fs"
import path from "path"
import figlet from "figlet"

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

const checkAvailableName = (basePath, name) => {
  const newPath = path.join(basePath, name)
  if (existsSync(newPath)) {
    return false
  }
  return true
}

const printWelcomeMessage = () => {
  return new Promise((resolve, reject) => {
    figlet("Welcome!", function (err, data) {
      if (err) {
        reject(err)
      }
      console.log(data)
      resolve()
    })
  })
}

const validateDashCase = (i) => !/[A-Z]/.test(i) && !/_/.test(i)
const contentsPath = path.resolve(process.cwd(), "contents")
const appPath = path.resolve(process.cwd(), "app")

const folderPrompt = (_, basePath, isTopLevel) => {
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

export default async function plop(plop) {
  await printWelcomeMessage()
  plop.setGenerator("article", {
    description: "Generate article folder and markdown file",
    prompts: async (inquirer) => {
      let basePath = contentsPath
      let continueLoop = true
      let isTopLevel = true
      let lastAnswers = {}

      while (continueLoop) {
        const answers = await inquirer.prompt(
          folderPrompt(plop, basePath, isTopLevel),
        )

        // If a folder is selected or created, update basePath
        if (answers.folderAction !== "Create new markdown file") {
          const folderName = answers.newFolder || answers.folderAction
          basePath = path.join(basePath, folderName)

          if (isTopLevel && answers.newFolder) {
            lastAnswers = {
              ...answers,
              newFolderName: folderName,
            }
          }

          isTopLevel = false
        } else {
          lastAnswers = {
            ...lastAnswers,
            ...answers,
            basePath,
          }
          continueLoop = false
        }
      }

      return lastAnswers
    },
    actions: (answers) => {
      const actions = []
      const folderName = answers.basePath

      const filePath = path.join(folderName, `${answers.fileName}.md`)
      actions.push({
        type: "add",
        path: filePath,
        templateFile: "plop/article/index.md.hbs",
      })

      if (answers.newFolderName) {
        const appFilePath = path.join(
          appPath,
          answers.newFolderName,
          "[[...slug]]",
          "page.tsx",
        )
        actions.push({
          type: "add",
          path: appFilePath,
          templateFile: "plop/page/page.tsx.hbs",
          data: {
            newCategoryGroupName: answers.newFolderName,
          },
        })
      }

      return actions
    },
  })
}
