const API_BASE = 'https://www.googleapis.com/youtube/v3';

const apiKey = import.meta.env.VITE_YT_API_KEY;

function ensureKey() {
  if (!apiKey) {
    throw new Error('Missing VITE_YT_API_KEY. Create a .env file with your YouTube Data API key.');
  }
}

async function ytFetch(path, params) {
  ensureKey();
  const url = new URL(`${API_BASE}/${path}`);
  Object.entries({ key: apiKey, ...params }).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`YouTube API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function resolveChannelIdByHandle(handle) {
  // Try search for channel by handle (works with @handles)
  const q = handle.startsWith('@') ? handle : `@${handle}`;
  const data = await ytFetch('search', {
    part: 'snippet',
    type: 'channel',
    q,
    maxResults: 1,
  });
  const item = data.items?.[0];
  return item?.snippet?.channelId || item?.id?.channelId || null;
}

export async function getPopularVideosByChannel(channelId, max = 24) {
  if (!channelId) return [];
  const search = await ytFetch('search', {
    part: 'snippet',
    channelId,
    type: 'video',
    order: 'viewCount',
    maxResults: Math.min(max, 50),
  });
  const ids = (search.items || []).map((it) => it.id.videoId).filter(Boolean);
  if (ids.length === 0) return [];

  const videos = await ytFetch('videos', {
    part: 'snippet,statistics,contentDetails',
    id: ids.join(','),
    maxResults: ids.length,
  });

  return (videos.items || []).map((v) => ({
    id: v.id,
    title: v.snippet?.title,
    thumbnail: v.snippet?.thumbnails?.medium?.url || v.snippet?.thumbnails?.high?.url,
    channelTitle: v.snippet?.channelTitle,
    publishedAt: v.snippet?.publishedAt,
    views: Number(v.statistics?.viewCount || 0),
    url: `https://www.youtube.com/watch?v=${v.id}`,
  }));
}

function weightedSample(items, count = 8) {
  if (!items.length) return [];
  // Weight by log(viewCount + 1) to avoid extreme skew
  const weights = items.map((v) => Math.log10((v.views || 0) + 1) + 1e-6);
  const result = [];
  const used = new Set();
  while (result.length < Math.min(count, items.length)) {
    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    let idx = 0;
    for (; idx < items.length; idx++) {
      r -= weights[idx];
      if (r <= 0) break;
    }
    if (!used.has(idx) && items[idx]) {
      result.push(items[idx]);
      used.add(idx);
    }
  }
  return result;
}

export async function getRecommendedVideosByHandles(handles = ['@VedantaNY', '@SwamiT'], sampleSize = 8) {
  // Cache per day to reduce API usage
  const dayKey = new Date().toISOString().slice(0, 10);
  const cacheKey = `yt_recs_${dayKey}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    } catch {}
  }

  const channelIds = [];
  for (const handle of handles) {
    try {
      const id = await resolveChannelIdByHandle(handle);
      if (id) channelIds.push(id);
    } catch (e) {
      // ignore resolution errors per channel
      console.warn('Channel resolve failed', handle, e);
    }
  }

  const allVideos = [];
  for (const ch of channelIds) {
    try {
      const vids = await getPopularVideosByChannel(ch, 24);
      allVideos.push(...vids);
    } catch (e) {
      console.warn('Fetch popular videos failed', ch, e);
    }
  }

  const sampled = weightedSample(allVideos, sampleSize);
  if (sampled.length) localStorage.setItem(cacheKey, JSON.stringify(sampled));
  return sampled;
}

// Fetch all playlists for a channel (paginated)
export async function getPlaylistsByChannel(channelId, maxPerPage = 50) {
  if (!channelId) return [];
  const playlists = [];
  let pageToken = undefined;
  do {
    const data = await ytFetch('playlists', {
      part: 'snippet,contentDetails',
      channelId,
      maxResults: maxPerPage,
      ...(pageToken ? { pageToken } : {}),
    });
    for (const p of (data.items || [])) {
      playlists.push({
        id: p.id,
        title: p.snippet?.title,
        description: p.snippet?.description,
        thumbnail: p.snippet?.thumbnails?.medium?.url || p.snippet?.thumbnails?.high?.url,
        count: p.contentDetails?.itemCount || 0,
        url: `https://www.youtube.com/playlist?list=${p.id}`,
      });
    }
    pageToken = data.nextPageToken;
  } while (pageToken);
  return playlists;
}
