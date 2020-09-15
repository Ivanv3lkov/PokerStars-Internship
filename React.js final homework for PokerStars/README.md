### `npm run start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Server will be on [http://localhost:3001](http://localhost:3001)

# URL

* /albums/{id} - PATCH - example http://localhost:3001/albums/5 - "Content-Type": "application/json"
* /albums/{id} - DELETE
* /albums/{id} - GET
* /albums - POST - "Content-Type": "application/json"
* /albums - GET

# Tasks

1. Navigation button should have active indication based on page that is loaded
2. When clicks on some album on Albums page it should be redirect to details Album page where the whole information about album is present and style with css
3. On Admin panel add EDIT action, when the button is clicked should populate the form and on submit of the form the selected album should be edited.
