# Single-page-JavaScript-Blog-pages

Single page JavaScript Blog page which will take the data from './data/data.json' and display the pages according to the .psd files in ./TASK.

## FOLDER STRUCTURE

```html
.
├── gulpfile.js
├── TASK                  (contains the task images and wireframe)
├── public                (The production files i.e (compiled files from gulp) files goes here)
│   ├── data
|  |   ├── data.json	  (The JSON files to provide data to the application)
|  ├── assets
│   │   ├── css
│   │   │   └── fonts
│   │   ├── images
│   │   └── js
│   └── index.html
├── README.md
├── DEBUG-TASK
└── resources             (The development files goes here)
    └── assets
        ├── scripts       (The JavaScript files goes here)
        └── styles 
            ├── css       (The css files goes here which compiles to production css folder using gulp)
            └── scss      (The scss files goes here which compiles to production css folder using gulp)
```

The Cover section has right and left section which displays the latest featured posts.Featured posts are those posts in [posts] variable whose is_featured value is 1. 
The content section displays all the posts sorted in the descending order with pagination below the content section. The search functionality above the content folder provides the search on post title.

