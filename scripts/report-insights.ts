import fs from "fs"
import { Octokit } from "@octokit/rest"
import { endOfDay, subDays } from "date-fns"
import { config } from "dotenv"

// .envファイルの環境変数を読み込み
config()

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

if (!GITHUB_TOKEN) {
  throw new Error("GitHub token is missing")
}

const REPO_OWNER = "illionillion"
const REPO_NAME = "oss-blog"
const TOP_N_CONTRIBUTORS = 5
const DAYS_BACK = 7
const OUTPUT_FILE_PATH = "i18n/contributors.json"

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
})

const getContributorsData = async () => {
  const sinceDate = subDays(new Date(), DAYS_BACK).toISOString()
  const untilDate = endOfDay(new Date()).toISOString()

  try {
    const commits = await octokit.repos.listCommits({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      since: sinceDate,
      until: untilDate,
    })

    const contributors: Record<string, any> = {}
    commits.data.forEach((commit) => {
      const author = commit.author
      if (author) {
        const { id, login, avatar_url, html_url } = author
        if (!contributors[login]) {
          contributors[login] = {
            id,
            login,
            avatar_url,
            html_url,
            commitCount: 0,
          }
        }
        contributors[login].commitCount += 1
      }
    })

    // 全contributors
    const allContributors = Object.values(contributors)

    // 上位貢献者を取得
    const topContributors = allContributors
      .sort((a, b) => b.commitCount - a.commitCount)
      .slice(0, TOP_N_CONTRIBUTORS)

    // JSONファイルに書き込む
    const outputData = {
      date: new Date().toISOString(),
      contributors: allContributors,
      top_contributors: topContributors,
    }

    fs.writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(outputData, null, 2))

    console.log(`Contributor data has been written to ${OUTPUT_FILE_PATH}`)
  } catch (error) {
    console.error("Error fetching commits: ", error)
  }
}

getContributorsData()
