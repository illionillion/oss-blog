declare module "markdown-toc" {
  interface TocOptions {
    append?: string
    filter?: (...args: any[]) => any
    slugify?: (...args: any[]) => any
    bullets?: string[]
    maxdepth?: number
    firsth1?: boolean
    stripHeadingTags?: boolean
  }

  export interface TocResult {
    json: {
      content: string
      slug: string
      lvl: 1 | 2 | 3 | 4
    }[]
  }

  function toc(markdown: string, options?: TocOptions): TocResult

  export default toc
}
