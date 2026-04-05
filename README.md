<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Contributors](https://img.shields.io/github/contributors/404pandas/notetaker.svg?style=plastic&logo=appveyor)](https://github.com/404pandas/notetaker/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/404pandas/notetaker.svg?style=plastic&logo=appveyor)](https://github.com/404pandas/notetaker/network/members)
[![Stargazers](https://img.shields.io/github/stars/404pandas/notetaker.svg?style=plastic&logo=appveyor)](https://github.com/404pandas/notetaker/stargazers)
[![Issues](https://img.shields.io/github/issues/404pandas/notetaker.svg?style=plastic&logo=appveyor)](https://github.com/404pandas/notetaker/issues)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-black.svg?style=plastic&logo=appveyor&logo=linkedin&colorB=555)](https://linkedin.com/in/404pandas)

</div>

<h3 align="center">Jaskier's Journal</h3>

<p align="center">
  A full-stack note-taking app built with Express and Node.js — redesigned with a Witcher-themed dark UI, GSAP animations, and a complete REST API including create, read, update, and delete.
  <br />
</p>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

---

## About The Project

![Screenshot of live image](./public/assets/images/jaskiersjournal.gif)

What started as a standard bootcamp note-taker has been rebuilt into **Jaskier's Journal** — a Witcher-themed full-stack app with a custom dark UI, smooth GSAP animations throughout, and a fully implemented REST API.

### Features

- **Full CRUD** — create, read, update, and delete notes via a RESTful Express API
- **Edit mode** — click any saved entry to view it, then toggle into edit mode to revise it in place (PUT route)
- **Live search** — real-time filtering of the sidebar by title or note content
- **GSAP animations** — page entrance, staggered note list, floating landing page mockup, toast slide-ins, spring-animated delete confirmation dialog, and hover micro-interactions throughout
- **Toast notifications** — contextual success, error, and info feedback on every action
- **Delete confirmation dialog** — animated modal prevents accidental deletions
- **Relative timestamps** — each entry shows how long ago it was created ("2h ago", "yesterday", etc.)
- **Character & word count** — live stats in the editor footer
- **Animated SVG favicon** — floating golden music note with pulsing glow and staggered sparkles
- **Witcher-themed design** — warm dark parchment palette, Cinzel display font, medallion gold accents, and bardic copy throughout

### Built With

<div align="center">

[![Javascript](https://img.shields.io/badge/Language-JavaScript-ff0000?style=plastic&logo=JavaScript&logoWidth=10)](https://javascript.info/)
[![HTML](https://img.shields.io/badge/Language-HTML/CSS-ff8000?style=plastic&logo=HTML5&logoWidth=10)](https://html.com/)
[![Node.js](https://img.shields.io/badge/Runtime-Node.js-00ff80?style=plastic&logo=nodedotjs&logoWidth=10)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Framework-Express-80ff00?style=plastic&logo=Express&logoWidth=10)](https://expressjs.com/)
[![GSAP](https://img.shields.io/badge/Animation-GSAP-88CE02?style=plastic&logo=greensock&logoWidth=10)](https://greensock.com/gsap/)
[![npm](https://img.shields.io/badge/Tools-npm-ff0000?style=plastic&logo=npm&logoWidth=10)](https://www.npmjs.com/)
[![VS Code](https://img.shields.io/badge/IDE-VSCode-ff0000?style=plastic&logo=VisualStudioCode&logoWidth=10)](https://code.visualstudio.com/docs)

</div>

---

## Installation

1. Clone the repo

   git clone https://github.com/404pandas/notetaker.git

2. Install dependencies

   npm install

3. Start the server

   node server.js

4. Open your browser at `http://localhost:3001`

---

## API Routes

| Method | Route            | Description                    |
| ------ | ---------------- | ------------------------------ |
| GET    | `/api/notes`     | Returns all saved notes        |
| POST   | `/api/notes`     | Creates a new note             |
| PUT    | `/api/notes/:id` | Updates an existing note by id |
| DELETE | `/api/notes/:id` | Deletes a note by id           |

---

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT license. See LICENSE.txt for more information.

---

## Contact

Mary Elenius - mary.panda.jackson@gmail.com

Project Link: [https://github.com/404pandas/notetaker](https://github.com/404pandas/notetaker)
Deployment Link: [https://notetaker-irrb.onrender.com/](https://notetaker-irrb.onrender.com/)

---

## Acknowledgments

- Collaborators on this project included instructional staff, TAs, and students from University of Central Florida.
- A special thanks to my daughter, Yennefer. Every day she proves she is small but mighty!
