class Github{
    constructor(){
        this.url = "https://api.github.com/users/"
    }
    async getDataFromGithub(username){
        const userGit = await fetch(this.url + username);
        const userGitRepos = await fetch(this.url + username + "/repos");

        const userData = await userGit.json();
        const userReposData = await userGitRepos.json();

         
        return{
            user: userData,
            repos: userReposData
        }
    }

}