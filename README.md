# music-streaming-platform-frontend
## Project Summary
This project was designed by Bhavik Bhatt, Anusha Arora, Muskaan Nandu, and Shreyas Terdalkar for a graduate Web Development course. The web app serves as a discography search website for Spotify content. Users can use the website anonymously or logged in as either artists/listeners. Users can search content using the Spotify API and search user-related information via a local Mongo database.
### Published site
musify-client.netlify.app
### Backend Repository
Check out the backend repository here: https://github.com/Bhavik-20/music-streaming-platform-backend
## Key Frontend Features
### Spotify API
The web app interacts with Spotify's API to allow users to search Spotify content including songs, playlists, and albums. Prior to being able to search for information, the user is authenticated via a token fetched from the Spotify API.
### Navigation
- The left navigation allows users to toggle between pages including the home page, edit profile, page, my profile page, search page, and find users page.
- Anonymous users can also see a page to login or register as a listener or artists.
- Admin users can navigate to a special admin login page.
- The song,album, and playlist details pages have dynamic back buttons that will take a user back to their previously accessed page.
### Home
The home page interacts with both the SpotifyAPI and backend to access our local database to display user-specific information. The Spotify API allows users to view a current top album, new releases, and featured playlists. If a logged in user has liked albums/playlists/tracks, they will display on the home page as well. The 'Liked Albums and Playlists' and 'Liked Tracks' sections are not visible to anonymous users.  
The page also displays the current user's name and allows them to log out if desired.
### Edit Profile
Logged in users can edit their username, email address, first/last name, and role. They can also delete their account. If a user is not logged in, they will be redirected to login upon attempting to access this page.
### My Profile
A logged in user can view their name, username, and role as well as their number of followers and following users. They can view a list of these users as well.  
The user can also view any content that they have liked.
### Search
This page interacts with the spotify api to display content most similar to a user's entered keyword. Based on the search criteria, the most relevant tracks, albums, and playlists are displayed. Each content item is clickable leading the user to a details page about the specified content containing additional data such as song duration, album tracks, playlist tracks etc.  
The user's previous search results are saved.
### Find Users
Logged in users can search for other users and click on the user to view their profile details and follow/unfollow.
