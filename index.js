var profileElement = document.querySelector('#profile')
var divElement = document.querySelector('#app');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

function Buscar() {
  var username = inputElement.value;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.github.com/users/${username}`);
  xhr.send(null);

  function renderApp(data) {
    profileElement.innerHTML = "";
    var userImg = data.avatar_url,
        userName = data.name,
        userBio = data.bio;
        
        var imgElement = document.createElement('img');
        imgElement.setAttribute('src', userImg);
        imgElement.setAttribute('width', "200px");
        profileElement.appendChild(imgElement);
        
        var nameElement = document.createElement('h2');
        var nameText = document.createTextNode(userName);
        nameElement.appendChild(nameText);
        profileElement.appendChild(nameElement);

        var bioElement = document.createElement('p');
        var bioText = document.createTextNode(userBio);
        bioElement.appendChild(bioText);
        profileElement.appendChild(bioElement);
  }

  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {
      if(xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        renderApp(data);
      } else {
        console.log("Não foi possível achar o usuário")
      }
    }
  }
}

buttonElement.onclick = Buscar;
