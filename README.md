# notes
A Simple Note taking Application, with Snapshot support!

## Inspiration
Google Keep has been my main note taking application since I first knew about it. It has this awesome way to arrange the
notes in a grid. A simple search that filters note by the text or color of the note, and there's even a filter by tags
you can set for a note. And don't forget the "todo" notes and the "picture" notes, lately there's even "draw" notes and
"voice" notes.

So, if Google Keep is so awesome, why build my own Note taking application? Well, the main reason is that I accidentally
deleted a note when I put my phone in my pocket after writing a note. But when I get to my destination, I found only an
empty note, turns out at some point my phone got unlocked and replaced all the text by an empty string. The main feature
of this note taking application is that every time a note is changed, a **Snapshot** will be saved so you can get back
in time as it was before, similar the way Git works.

## Privacy
Another cool thing about this project is that is open source. So you can install this in a private server and you won't
have to worry about an evil company trying to sell you stuff or knowing way too much about you. I'm also planning to
encrypt each note, using your password as encryption salt, so even a SysAdmin won't be able to decrypt it.

## Installation
You need a backend to store the notes, the repository for it is [here](https://github.com/victorhqc/notes-api)

After the backend is running, run the following command in the project's root path.
```sh
npm i
```



## Running the project

For develop, just run the project as following
```sh
npm start
```

## License
MIT

## Author
Victor Quiroz

### Prerequisites

+ Node >= 4
+ NPM
+ Nginx ( Or similar for production environments )
