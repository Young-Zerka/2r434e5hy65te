const accessToken = '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';
const username = 'Young-Zerka';

// Function to format the date
function formatCommitDate(dateString) {
    const date = new Date(dateString);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedDate = `${month} ${day}, ${year} — ${hours}:${minutes} ${ampm}`;
    return formattedDate;
}

const commitsContainer = document.getElementById('commits');

// Fetch the creation date of your GitHub profile
fetch(`https://api.github.com/users/${username}`, {
    headers: {
        'Authorization': `token ${accessToken}`,
    },
})
    .then(response => response.json())
    .then(user => {
        const creationDate = user.created_at;

        // Fetch the list of repositories from your GitHub profile
        fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'Authorization': `token ${accessToken}`,
            },
        })
            .then(response => response.json())
            .then(repositories => {
                repositories.forEach(repository => {
                    const repoName = repository.full_name;

                    // Fetch all commits from each repository since the creation date
                    fetch(`https://api.github.com/repos/${repoName}/commits?since=${creationDate}`, {
                        headers: {
                            'Authorization': `token ${accessToken}`,
                        },
                    })
                        .then(response => response.json())
                        .then(commits => {
                            if (commits.length > 0) {
                                commits.forEach(commit => {
                                    const eventDate = formatCommitDate(commit.commit.author.date);

                                    commitsContainer.innerHTML += `
                                    <article class="group relative flex flex-col items-start">
                                    <h3 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                                        <div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                                        <a href="https://github.com/${repoName}" target="_blank">
                                            <span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                                            <span class="relative z-10">${repoName}</span>
                                        </a>
                                    </h3>
                                    <p class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">
                                        <span class="absolute inset-y-0 left-0 flex items-center">
                                            <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                                        </span>${eventDate}
                                    </p>
                                    <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">${commit.commit.message}</p>
                                    <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
                                        Visit Repository<svg viewbox="0 0 16 16" fill="none"
                                        aria-hidden="true"
                                        class="ml-1 h-4 w-4 stroke-current">
                                        <path d="M6.75 5.75 9.25 8l-2.5 2.25"
                                            stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                    </svg></div>
                                    </article><br><br>
                                    `;
                                });
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                });
            })
            .catch(error => {
                commitsContainer.innerHTML = 'Error fetching repositories.';
                console.error(error);
            });
    })
    .catch(error => {
        commitsContainer.innerHTML = 'Error fetching user information.';
        console.error(error);
    });

    
    const repositoriesContainer = document.getElementById('repositories');
    
    // Fetch the list of repositories from your GitHub profile
    fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
            'Authorization': `token ${accessToken}`,
        },
    })
        .then(response => response.json())
        .then(repositories => {
            repositoriesContainer.innerHTML = '';
    
            repositories.forEach(repository => {
                const repoName = repository.name;
                const creationDate = new Date(repository.created_at).toLocaleDateString();
                const description = repository.description || 'No description provided';
    
                repositoriesContainer.innerHTML += `
                <article class="group relative flex flex-col items-start">
                <h3 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                    <div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                    <a href="https://github.com/${repoName}" target="_blank">
                        <span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                        <span class="relative z-10">${repoName}</span>
                    </a>
                </h3>
                <p class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">
                    <span class="absolute inset-y-0 left-0 flex items-center">
                        <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                    </span>${creationDate}
                </p>
                <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">${description}</p>
                <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
                    Visit Repository<svg viewbox="0 0 16 16" fill="none"
                    aria-hidden="true"
                    class="ml-1 h-4 w-4 stroke-current">
                    <path d="M6.75 5.75 9.25 8l-2.5 2.25"
                        stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                </svg></div>
                </article><br><br>
                `;
            });
        })
        .catch(error => {
            repositoriesContainer.innerHTML = 'Error fetching repositories.';
            console.error(error);
        });
    