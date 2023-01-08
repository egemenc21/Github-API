const cardBody = document.querySelector(".card-body");
const githubForm = document.getElementById("github-form");
const formInput = document.getElementById("githubname");
const profile = document.getElementById("profile");
const lastUsers = document.getElementById("last-users");
const clearBtn = document.getElementById("clear-last-users");
const github = new Github();
const ui = new UI();

eventlisteners();
function eventlisteners() {
  githubForm.addEventListener("submit", addProfile);
  clearBtn.addEventListener("click", clearAllSearched);
  document.addEventListener("DOMContentLoaded", addAllProfiles);
}

function addProfile(e) {
  const username = formInput.value.trim();
  if (username) {
    github
      .getDataFromGithub(username)
      .then((response) => {
        if (response.repos.message === "Not Found") {
          ui.addAlertToUI();  
        }else{
          ui.addUsersToLastSearched(username);
          Storage.addUsersToStorage(username);
          ui.addProfileToUI(response.user);
          ui.addReposToUI(response.repos);
          
        }
      })
      .catch((err) => console.log(err));
    ui.clearInput();
  } else {
    alert("Lutfen bir kullanici adi girin");
  }

  e.preventDefault();
}
function clearAllSearched() {
  if(confirm("Emin misiniz?")){
    Storage.clearAllFromStorage();
    ui.clearAllFromUI();
  }
  
  
}
function addAllProfiles() {
  let users = Storage.getUsersFromStorage();
  let result ='';
  users.forEach(user => {
    // <li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
   result += `<li class="list-group-item">${user}</li>`
    
  });
  lastUsers.innerHTML = result;

  
}
