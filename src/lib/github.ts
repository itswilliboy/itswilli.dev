import { GITHUB_USERNAME } from "./config"

const GRAPHQL_URL = "https://api.github.com/graphql"

const PINNED_REPOS_QUERY = `
  query ($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
`

export const getPinnedRepos = async () => {
  const token = process.env.GITHUB_TOKEN ?? import.meta.env.GITHUB_TOKEN

  const resp = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: PINNED_REPOS_QUERY,
      variables: { username: GITHUB_USERNAME },
    }),
  })

  if (!resp.ok) throw new Error(`GitHub responded with ${resp.status}`)

  const json = await resp.json()
  if (json.errors) throw new Error(json.errors[0].message)

  return json.data.user.pinnedItems.nodes
}
