import type { APIRoute } from "astro"
import { LAST_FM_USERNAME } from "../../lib/config"
import type { Track } from "../../types"

export const prerender = false

const BASE = "https://ws.audioscrobbler.com/2.0"
const MAX_AGE = 20_000

const cache = new Map<number, { at: number; tracks: Track[] }>()

const getRecentTracks = async (limit: number): Promise<Track[]> => {
  const token = process.env.LAST_FM_TOKEN ?? import.meta.env.LAST_FM_TOKEN
  const url = `${BASE}/?method=user.getrecenttracks&user=${LAST_FM_USERNAME}&api_key=${token}&format=json&limit=${limit}`

  const resp = await fetch(url)
  if (!resp.ok) throw new Error(`Last.fm responded with ${resp.status}`)

  const tracks = ((await resp.json()) as any).recenttracks.track as Track[]

  const maybeCurrent = tracks[0]
  if (maybeCurrent?.["@attr"]?.nowplaying) {
    maybeCurrent.date = { uts: "0" } // i hate this api
  }

  return tracks
}

export const GET: APIRoute = async ({ url }) => {
  const limit = Number(url.searchParams.get("limit") ?? 15)
  const clamped = Math.max(1, Math.min(Number.isFinite(limit) ? limit : 15, 100))

  const cached = cache.get(clamped)
  if (cached && Date.now() - cached.at < MAX_AGE) {
    return Response.json(cached.tracks)
  }

  try {
    const tracks = (await getRecentTracks(clamped)).slice(0, clamped)
    cache.set(clamped, { at: Date.now(), tracks })

    return Response.json(tracks)
  } catch (e) {
    if (cached) return Response.json(cached.tracks)
    return Response.json({ error: (e as Error).message }, { status: 502 })
  }
}
