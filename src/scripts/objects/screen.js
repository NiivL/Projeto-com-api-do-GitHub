const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
            <img src="${user.avatarUrl}" alt="foto do perfil do usuário"/>
                <div class="data">
                    <h1>${user.name ?? 'Não possui nome cadastrado😢'}</h1>
                    <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                </div>
                <div class="follower-data">
                <p> 🕴️Seguidores: ${user.followers ?? 'Não possui bio cadastrada 😢'}</p>
                <p> 🧍‍♂️Seguindo: ${user.following ?? 'Não possui bio cadastrada 😢'}</p>
                </div>
                        </div>`

                        let repositoriesItens = '';
                        user.repositories.forEach(repo => repositoriesItens += `<li>
                            <a href="${repo.html_utl}" target="_blank">${repo.name}</a>
                            <ul class="infoEvents">
                                <li>🍴${repo.forks_count}</li>
                                <li>⭐${repo.stargazers_count}</li>
                                <li>👀${repo.watchers_count}</li>
                                <li>📖${repo.language ?? 'Sem linguagem especifica'}</li>
                            </ul>
                            </li>`);

if (user.repositories.length > 0) {
    this.userProfile.innerHTML +=  `<div class="repositories section">
    <h2>Repositórios</h2>
    <ul>${repositoriesItens}</ul>
    </div>` 
}
    },
    renderNotFound(){
        this.userProfile.innerHTML = `<h3>Usuário não encontrado😢</h3>`
    },
    renderEventsData(eventResponse){
        let eventsItens = '';
        eventResponse.forEach(event => {
    
            if (event.type === 'CreateEvent') {
                eventsItens += `<li>${event.repo.name} - Sem menssagem de commit </li>`  
            }else if(event.type === 'PushEvent'){
                eventsItens += `<li>${event.repo.name} - ${event.payload.commits[0].message}</li>`
            }
            
        });
        if (eventResponse.length > 0) {
            this.userProfile.innerHTML +=  `<div class="events">
            <h2>Eventos</h2>
            <ul>${eventsItens}</ul>
            </div>` 
        }
    }

}

export { screen }