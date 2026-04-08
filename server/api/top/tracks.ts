const BASE = "http://ws.audioscrobbler.com/2.0"
const config = useRuntimeConfig()

const getRecentTracks = async (limit: number): Promise<Track[]> => {
  const URL =
    BASE +
    `/?method=user.gettoptracks&user=${config.public.LAST_FM_USERNAME}&api_key=${process.env.LAST_FM_TOKEN}&format=json&limit=${limit}&period=1month`

  const resp = (await $fetch(URL)) as any
  const tracks = resp.toptracks.track as Track[]

  return tracks
}

export default defineCachedEventHandler(
  async e => {
    const query = getQuery(e)
    const limit = Number(query.limit ?? 15)
    const clamped = Math.max(1, Math.min(limit, 50))

    const tracks = await getRecentTracks(clamped)

    const enriched: Track[] = []
    for (const track of tracks) {
      const resp = await $fetch<{ track: string; type: string; image: string }>("/api/spotify/track-image", {
        query: {
          q: track.name,
          artist: track.artist.name
        }
      })
      enriched.push({ ...track, resolvedImage: resp.image })
    }

    return enriched.slice(0, clamped)
  },
  { maxAge: 60 * 60 }
)
