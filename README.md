MVP:

    - Virtual library which displays the book collection of each user with CRUD functionality.

Stretch features:

    - Can request books from other user's libraries and reccomend books from your own library to other users.
    - Login capability with personalized library, request, and recommendation displays for each user.
    - Can search books through Google Books API and auto-populate details when adding books to library.

Roadmap:

    Step One: Basic Config

        - Webpack - DONE
        - App and components folder
            - Further components:
                - Requests and Recommendations Container
                    - Requests
                    - Recommendations
                - Library container
                    - Library
        - src: index.js, styles.css - DONE
        - package.json - DONE

    Step Two: SQL Database

    Step Three: Render libraries to page (cRud)

    Step Four: Complete CRUD functionality

Stretch: Req/Rec

    - Request and Recommendation components render from database
    - Request and Reccomend buttons next to each book in library which send book to relevant req/rec list

Stretch: Personalized homepage

    - Select user from dropdown list
    - Should show user's req and rec lists and home library

Stretch: Search feature

    - Search bar which searches all libraries and shows if book is owned by any users

Stretch: Search Google Books API
