const BASE = "http://ws.audioscrobbler.com/2.0"
const config = useRuntimeConfig()

const getTopArtists = async (limit: number): Promise<Artist[]> => {
  const URL =
    BASE +
    `/?method=user.gettopartists&user=${config.public.LAST_FM_USERNAME}&api_key=${process.env.LAST_FM_TOKEN}&format=json&limit=${limit}&period=1month`

  const resp = (await $fetch(URL)) as any
  const tracks = resp.topartists.artist as Artist[]

  return tracks
}

export default defineCachedEventHandler(
  async e => {
    const query = getQuery(e)
    const limit = Number(query.limit ?? 15)
    const clamped = Math.max(1, Math.min(limit, 50))

    const artists = await getTopArtists(clamped)

    const enriched: Artist[] = []
    for (const artist of artists) {
      const type = artist.mbid != "" ? "mbid" : "name"
      const resp = await $fetch<{ artist: string; type: string; image: string | null }>("/api/spotify/artist-image", {
        query: {
          q: artist.mbid || artist.name,
          type
        }
      })
      enriched.push({ ...artist, resolvedImage: resp.image as string })
    }

    return enriched.slice(0, clamped) as Artist[]
  },
  { maxAge: 60 * 60 }
)
