  const elements = {
        input: document.getElementById('username-input'),
        btn: document.getElementById('search-btn'),
        rateBanner: document.getElementById('rate-banner'),
        results: document.getElementById('results'),
        profile: document.getElementById('profile-card'),
        repos: document.getElementById('repos-list'),
        loading: document.getElementById('loading'),
        error: document.getElementById('error-container'),
        sort: document.getElementById('sort-select')
    };

    let currentRepos = [];

    // --- Core Logic: API Interaction ---

    async function fetchGitHubData(username) {
        showLoading(true);
        try {
            const userRes = await fetch(`https://api.github.com/users/${username}`);
            handleRateLimit(userRes.headers);
            
            if (!userRes.ok) throw new Error(userRes.status === 404 ? 'User not found' : 'API Error');
            const userData = await userRes.json();

            const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
            const reposData = await reposRes.json();
            currentRepos = reposData;

            const langData = await computeLanguageStats(username, reposData);

            displayUser(userData, langData);
            displayRepos(reposData);
            elements.results.classList.remove('hide');
        } catch (err) {
            showError(err.message);
        } finally {
            showLoading(false);
        }
    }

    async function computeLanguageStats(username, repos) {
        const recentRepos = repos.slice(0, 5);
        const langMap = {};

        const promises = recentRepos.map(repo => 
            fetch(repo.languages_url).then(res => res.json())
        );

        const languages = await Promise.all(promises);
        
        languages.forEach(obj => {
            for (let [lang, bytes] of Object.entries(obj)) {
                langMap[lang] = (langMap[lang] || 0) + bytes;
            }
        });

        return langMap;
    }

    // --- UI Logic: Rendering ---

    function displayUser(user, languages) {
        const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);
        
        let langHtml = '';
        let barHtml = '';
        const colors = ['#f1e05a', '#2b7489', '#563d7c', '#e34c26', '#4f5d95'];

        Object.entries(languages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .forEach(([lang, bytes], i) => {
                const percent = totalBytes > 0 ? ((bytes / totalBytes) * 100).toFixed(1) : 0;
                const color = colors[i] || '#8b949e';
                barHtml += `<div class="lang-bar" style="width: ${percent}%; background: ${color}"></div>`;
                langHtml += `<span><i style="color:${color}; font-style: normal;">●</i> ${lang} ${percent}%</span>`;
            });

        elements.profile.innerHTML = `
            <div class="avatar-wrapper">
                <img src="${user.avatar_url}" class="avatar" alt="User Profile Avatar">
            </div>
            <div class="profile-info">
                <h2>${user.name || user.login}</h2>
                <p style="color:var(--text-muted)">@${user.login}</p>
                <p style="margin-top:10px">${user.bio || 'No bio available'}</p>
                <div class="stats-grid">
                    <div class="stat-item"><strong>${user.public_repos}</strong> Repos</div>
                    <div class="stat-item"><strong>${user.followers}</strong> Followers</div>
                    <div class="stat-item"><strong>${user.following}</strong> Following</div>
                </div>
                <div class="lang-chart-container">
                    <h4 style="margin-bottom:10px">Language Breakdown (Recent Repos)</h4>
                    <div class="lang-bar-wrapper">${barHtml || '<div style="width:100%; background:var(--border-color)"></div>'}</div>
                    <div class="lang-legend">${langHtml || '<span>No data available</span>'}</div>
                </div>
            </div>
        `;
    }

    function displayRepos(repos) {
        const sortKey = elements.sort.value;
        const sorted = [...repos].sort((a, b) => {
            if (typeof a[sortKey] === 'string') return a[sortKey].localeCompare(b[sortKey]);
            return b[sortKey] - a[sortKey];
        });

        elements.repos.innerHTML = sorted.map(repo => `
            <div class="repo-card">
                <a href="${repo.html_url}" target="_blank" class="repo-link">${repo.name}</a>
                <p style="font-size:14px; margin-top:5px">${repo.description || 'No description'}</p>
                <div class="repo-meta">
                    <span>🟡 ${repo.language || 'Plain Text'}</span>
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>Fork: ${repo.forks_count}</span>
                    <span>Updated: ${new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
            </div>
        `).join('');
    }

    // --- System Logic: Helpers ---

    function handleRateLimit(headers) {
        const remaining = headers.get('X-RateLimit-Remaining');
        const limit = headers.get('X-RateLimit-Limit');
        if(remaining && limit) {
            elements.rateBanner.textContent = `Rate Limit: ${remaining}/${limit} remaining`;
            if (parseInt(remaining) === 0) {
                showError("Rate limit exceeded. Please wait an hour or use an Auth Token.");
            }
        }
    }

    function showLoading(status) {
        elements.loading.style.display = status ? 'block' : 'none';
        if (status) {
            elements.error.classList.add('hide');
            elements.results.classList.add('hide');
        }
    }

    function showError(msg) {
        elements.error.textContent = msg;
        elements.error.classList.remove('hide');
        elements.error.className = 'error-msg';
    }

    // --- Events ---

    elements.btn.addEventListener('click', () => {
        const user = elements.input.value.trim();
        if (user) fetchGitHubData(user);
    });

    elements.sort.addEventListener('change', () => displayRepos(currentRepos));

    elements.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') elements.btn.click();
    });

