
const avatar = document.getElementById('avatar');
const description = document.getElementById('description');
const name_surname = document.getElementById('name');
const buttonContainer = document.getElementById('button-container');
const iconContainer = document.getElementById('social');

const getHeaderData = (dSet) => {
  avatar.src = dSet[0].avatar;
  description.textContent = dSet[0].description;

  const nameJson = dSet[0].name;
  const nameParts = nameJson.split(' ');

  if (nameParts.length === 2) {
    const firstName = nameParts[0];
    const lastName = nameParts[1];

    const formattedName = `${firstName} <strong>${lastName}</strong>`;

    name_surname.innerHTML = formattedName;
  } else {
    name_surname.textContent = nameJson;
  }
}

const getContentData = (dSet) => {
  let limitLinks = 4
  const links = dSet[0].links.slice(0, limitLinks);
  for (let i = 0; i < links.length; i++) {
    const linkName = links[i].name;
    const button = document.createElement('button');

    button.textContent = linkName;

    button.classList.add('btn');
    buttonContainer.appendChild(button);
  }
}

const getFooterData = (dSet) => {
  let limitSocial = 10
  const socialLinks = dSet[0].socialLinks.slice(0, limitSocial);
  for (let i = 0; i < socialLinks.length; i++) {
    const socialIcon = socialLinks[i].name_social;
    const linkTo = socialLinks[i].linkTo;

    const link = document.createElement('a');
    link.href = linkTo;
    link.target = "_blank"

    const icon = document.createElement('span');

    if (socialIcon === "linkedin") {
      icon.classList.add('mdi', 'mdi-linkedin');
    } else if (socialIcon === "instagram") {
      icon.classList.add('mdi', 'mdi-instagram');
    } else if (socialIcon === "facebook") {
      icon.classList.add('mdi', 'mdi-facebook');
    } else if (socialIcon === "github") {
      icon.classList.add('mdi', 'mdi-github');
    } else if (socialIcon === "reddit") {
      icon.classList.add('mdi', 'mdi-reddit');
    } else if (socialIcon === "twitter") {
      icon.classList.add('mdi', 'mdi-twitter');
    } else if (socialIcon === "youtube") {
      icon.classList.add('mdi', 'mdi-youtube');
    } else if (socialIcon === "twitch") {
      icon.classList.add('mdi', 'mdi-twitch');
    }

    link.appendChild(icon);
    iconContainer.appendChild(link);
  }
}

function getJsonLinktreeData() {
  const url = "./data/linktree.json"
  const request = new XMLHttpRequest();

  request.open('GET', url, true);

  request.onload = () => {
    if (request.status >= 200 && request.status <= 400) {
      const data = JSON.parse(request.responseText);

      getHeaderData(data)
      getContentData(data)
      getFooterData(data)

    } else {
      console.log("Error loading JSON file!")
    }
  }

  request.send()
}

getJsonLinktreeData()