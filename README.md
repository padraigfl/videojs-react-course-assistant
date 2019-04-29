# `videojs-react-course-assistant`

Uses dotenv, please copy the .env.template and to .env and use a valid API key for youtube. Initial load will not fire a youtube request but uses preloaded data.

WIP https://react-coursebuilder.netlify.com/ (env variables not yet set)

## Initial Goals

- [x] Use clean webpack configuration (i.e. no create react app)
- [x] Play with Linaria :D
- [x] VideoJS running okay with context actions
- [x] Use react context for sharing notes and details (probably unnecessary tbh)
- [ ] Fetches a youtube playlist with sufficient data (working, needs finishing)
- [ ] Autoplays through playlist (should be no trouble)
- [ ] Takes notes and bookmarks with correct timestamping (context handling added, bookmark = empty note)
- [ ] Saves notes relative to a specific playlist to localStorage (should be working once integrated)
- [ ] Can navigate to a specific notes point in a video
- [ ] Mobile view
- [ ] Control panel to control speed and view
- [ ] Download notes in a friendly format (csv? Json? what's good?)
- [ ] custom playlists (multiple sources? JSON plugin?)

## Further afield

- Whilst initially only working with Youtube videos, the eventual goal would be to allow some other sites or direct links?
- Maybe the easy generation of electron based course programs?
- Maybe maybe look into the possibility of captions (hardcoded? server set? captions creation mode? via subtitles?)

### Notes

- core-js handled to temporarily resolve linaria issues
