<div align="center">

<!-- Animated Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,50:1f6feb,100:58a6ff&height=200&section=header&text=GitHub%20Developer%20Explorer&fontSize=42&fontColor=ffffff&fontAlignY=38&desc=Discover%20any%20GitHub%20profile%20in%20seconds&descAlignY=58&descSize=16&animation=fadeIn" width="100%"/>

<!-- Typing Animation -->
<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=58A6FF&center=true&vCenter=true&width=600&lines=Multi-Endpoint+GitHub+REST+API;Real-Time+Language+Breakdown+Charts;Sortable+Repository+Explorer;Smart+Rate+Limit+Handling;Fully+Responsive+%26+Mobile-First" alt="Typing SVG" />
</a>

<br/>

<!-- Badges -->
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub API](https://img.shields.io/badge/GitHub%20REST%20API-181717?style=for-the-badge&logo=github&logoColor=white)

<br/>

![License](https://img.shields.io/github/license/YOUR_USERNAME/github-developer-explorer?style=flat-square&color=238636)
![Stars](https://img.shields.io/github/stars/YOUR_USERNAME/github-developer-explorer?style=flat-square&color=58a6ff)
![Last Commit](https://img.shields.io/github/last-commit/YOUR_USERNAME/github-developer-explorer?style=flat-square&color=f1e05a)

</div>

---

## ✨ Overview

> A sleek, dark-themed **GitHub Profile Explorer** built entirely with vanilla HTML, CSS & JavaScript — no frameworks, no dependencies.

Search any GitHub username and instantly get a rich view of their developer identity: profile stats, a visual language breakdown from their recent repos, and a fully sortable repository list — all powered by the **public GitHub REST API**.

---

## 🚀 Live Demo

<div align="center">

[![Open Demo](https://img.shields.io/badge/▶%20Try%20It%20Live-Click%20Here-238636?style=for-the-badge&logo=github)](https://YOUR_USERNAME.github.io/github-developer-explorer)

</div>

---

## 🖼️ Preview

<div align="center">

> *Search → Explore → Discover*

| Profile View | Repository Explorer |
|:---:|:---:|
| 👤 Avatar + Bio + Stats | 📁 Sortable Repo Cards |
| 🌈 Language Breakdown Bar | ⭐ Stars · Forks · Date |

</div>

---

## 🎯 Features

<table>
<tr>
<td width="50%">

### 🔍 Profile Lookup
- Fetches live user data from `api.github.com/users/{username}`
- Displays avatar, name, bio, followers, following & repo count
- Graceful 404 handling for unknown usernames

</td>
<td width="50%">

### 📊 Language Chart
- Combines language data across 5 recent repos
- Renders a visual percentage bar + color legend
- Smart byte-count aggregation across endpoints

</td>
</tr>
<tr>
<td width="50%">

### 📁 Repository Explorer
- Fetches up to 100 repositories per user
- Sort by **Stars**, **Forks**, or **Name** on the fly
- Shows language, description, stars, forks & last updated

</td>
<td width="50%">

### ⚡ Rate Limit Awareness
- Live rate limit banner (`60/60 remaining`)
- Graceful warning when limit is hit
- Reads `X-RateLimit-Remaining` headers in real time

</td>
</tr>
</table>

---

## 🛠️ How It Works

```
User Input
    │
    ▼
┌─────────────────────────────────────────────────────┐
│              GitHub REST API (Unauthenticated)       │
│                                                      │
│  GET /users/{username}          → Profile Data       │
│  GET /users/{username}/repos    → Repositories       │
│  GET /repos/{owner}/{repo}/languages → Lang Bytes    │
└─────────────────────────────────────────────────────┘
    │
    ▼
Data Transformation
  • Aggregate language bytes across recent repos
  • Compute percentage per language
  • Sort repos by selected key
    │
    ▼
Rendered UI (Vanilla JS DOM)
```

---

## 📂 Project Structure

```
github-developer-explorer/
│
├── index.html          ← Single-file app (HTML + CSS + JS)
│   ├── <style>         ← Dark GitHub-inspired theme w/ CSS variables
│   ├── <body>          ← Search box, profile card, repo list
│   └── <script>        ← API calls, DOM rendering, event handlers
│
└── README.md           ← You are here 👋
```

---

## ⚙️ API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `GET /users/{username}` | Profile: name, bio, avatar, followers |
| `GET /users/{username}/repos?per_page=100` | All public repositories |
| `GET /repos/{owner}/{repo}/languages` | Per-repo language byte counts |

> **Rate Limit:** Unauthenticated requests are capped at **60/hour** by GitHub. The app tracks and displays this live.

---

## 🏃 Getting Started

No build tools. No npm. Just open and run.

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/github-developer-explorer.git

# 2. Open in your browser
cd github-developer-explorer
open index.html
```

Or drag `index.html` straight into any browser tab. ✅

---

## 📱 Responsive Design

| Viewport | Layout |
|----------|--------|
| `> 650px` | Side-by-side avatar + profile info |
| `≤ 650px` | Stacked layout, centered content |
| `≤ 480px` | Vertical search bar, full-width sort control |

---

## 🎨 Design System

```css
--bg-dark:      #0d1117   /* GitHub-inspired dark background */
--card-dark:    #161b22   /* Elevated card surface           */
--border-color: #30363d   /* Subtle borders                  */
--accent-blue:  #58a6ff   /* Links and interactive elements  */
--accent-green: #238636   /* Primary action button           */
--error-red:    #f85149   /* Error states                    */
```

---

## 💡 Key Technical Decisions

- **`Promise.all()`** — Fetches language data for 5 repos concurrently, not sequentially
- **CSS Grid + Flexbox** — Layout adapts fluidly across all screen sizes
- **`X-RateLimit-Remaining` header parsing** — Live rate-limit tracking without extra API calls
- **Single HTML file** — Zero dependencies; runs anywhere without a build step

---

## 🔮 Future Improvements

- [ ] GitHub OAuth token support (raise limit to 5000 req/hr)
- [ ] Contribution heatmap (activity graph)
- [ ] Pinned repositories section
- [ ] Export profile as PNG/PDF
- [ ] Compare two GitHub users side-by-side

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

<!-- Footer Wave -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:58a6ff,100:0d1117&height=120&section=footer&animation=fadeIn" width="100%"/>

**Built with ❤️ and vanilla JavaScript**

*If you found this useful, consider giving it a ⭐ — it helps a lot!*

[![GitHub](https://img.shields.io/badge/Follow%20on%20GitHub-181717?style=for-the-badge&logo=github)](https://github.com/YOUR_USERNAME)

</div>
