# `videojs-react-course-assistant`

Uses dotenv, please copy the .env.template and to .env and use a valid API key for youtube. Initial load will not fire a youtube request but uses preloaded data.

## Initial Goals

- Play with Linariag
- VideoJS running okay with context actions
- Fetches a youtube playlist with sufficient data
- Autoplays through playlist
- Takes notes and bookmarks
- Saves notes relative to a specific playlist to localStorage
- Can navigate to a specific notes point in a video
- Control panel to control speed and view
- Download notes in a friendly format (csv? Json? what's good?)

## Further afield

- Whilst initially only working with Youtube videos, the eventual goal would be to allow some other sites or direct links?
- Maybe the easy generation of electron based course programs?
- Maybe maybe look into the possibility of captions (either hardcoded or server set)

### Notes

- core-js handled to temporarily resolve linaria issues
