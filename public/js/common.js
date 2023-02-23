async function adoptAnimal(id) {
  
}

function deleteAnimal(id){
}

async function updateSpecies(id) {
  const name = prompt('Enter new name:');
  if (name) {
    await fetch(`http://localhost:3000/species/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name })
    }).then((response) => {
      if (response.ok) {
        const resData = 'Species updated';
        location.reload();
        return Promise.resolve(resData);
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      alert(response.statusText);
    });
  }
}

async function deleteSpecies(id, name) {
  const confirmed = confirm(`Are you sure you want to delete ${name}?`);
  if (!confirmed) {
    return;
  }

  await fetch(`http://localhost:3000/species/${id}`, {
    method: 'DELETE'
  })
    .then((response) => {
      if (response.ok) {
        const resData = 'Species deleted';
        location.reload();
        return Promise.resolve(resData);
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      alert(response.statusText);
    });
}

function updateTemperament(id){
    newTemperament = prompt("Update temperament")
}

function deleteTemperament(id){
}


async function addSpecies(url) {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const speciesName = formData.get('speciesName');

  if (!speciesName) {
    alert('Please enter a species name.');
    return;
  } 

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      name: speciesName
    })
  })
    .then((response) => {
      if (response.ok) {
        const resData = 'Created a new species';
        location.reload();
        return Promise.resolve(resData);
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      alert(response.statusText);
    });
}