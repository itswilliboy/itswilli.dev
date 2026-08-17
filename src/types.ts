export type Option<T> = T | null

export type Track = {
  mbid: string
  artist: {
    "#text"?: string
    name?: string
  }
  image: {
    size: string
    "#text": string
  }[]
  album: {
    "#text": string
  }
  name: string
  url: string
  date: {
    uts: string
  }
  "@attr"?: {
    nowplaying?: string
  }
}

export type Friend = {
  name: string
  href: string
  githubID: number
}

export type Repo = {
  name: string
  description: Option<string>
  url: string
  homepageUrl: Option<string>
  stargazerCount: number
  forkCount: number
  primaryLanguage: Option<{
    name: string
    color: Option<string>
  }>
}
