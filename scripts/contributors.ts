import fs from "fs"
import { Octokit } from "@octokit/rest"
import { endOfDay, subDays } from "date-fns"
import { config } from "dotenv"
import { formatIsoDate } from "@/utils/fomat/iso-date"

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
const OUTPUT_FILE_PATH = "i18n/ranking.json"

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
})

const getTopContributors = async () => {
  const sinceDate = subDays(new Date(), DAYS_BACK).toISOString()
  const untilDate = endOfDay(new Date()).toISOString()

  try {
    const commits = await octokit.repos.listCommits({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      since: sinceDate,
      until: untilDate,
    })

    const contributors: Record<string, number> = {}
    commits.data.forEach((commit) => {
      const author = commit.author?.login
      if (author) {
        contributors[author] = (contributors[author] || 0) + 1
      }
    })

    const topContributors = Object.entries(contributors)
      .sort(([, a], [, b]) => b - a)
      .slice(0, TOP_N_CONTRIBUTORS)
      .map(([author, commitCount]) => ({ author, commitCount }))

    console.log("Top contributors in the past week:", topContributors)

    // JSONファイルに書き込む
    const rankingData = {
      date: formatIsoDate(new Date()),
      contributors: topContributors,
    }

    fs.writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(rankingData, null, 2))

    console.log(`Ranking data has been written to ${OUTPUT_FILE_PATH}`)
  } catch (error) {
    console.error("Error fetching commits: ", error)
  }
}

getTopContributors()
