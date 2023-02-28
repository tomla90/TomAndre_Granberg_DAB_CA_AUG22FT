async function adoptAnimal(id, userId) {
  const adoptionDate = new Date();
  await fetch(`http://localhost:3000/animals/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ animalId: id, userId, adoptionDate })
  })
    .then((response) => {
      if (response.ok) {
        const resData = 'Animal adopted';
        location.reload();
        return Promise.resolve(resData);
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      alert(response.statusText);
    });
}

async function deleteAnimalAdoption(id) {
  await fetch(`http://localhost:3000/animals/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        const resData = 'Animal adoption deleted';
        location.reload();
        return Promise.resolve(resData);
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      alert(response.statusText);
    });
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
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((data) => {
      alert(data.message);
      location.reload();
    })
    .catch((response) => {
      if (response.status === 400) {
        response.text().then((errorMessage) => {
          alert(errorMessage);
        });
      } else {
        alert(response.statusText);
      }
    });
}
function updateTemperament(id) {
   newTemperament = prompt('Enter new name:');
  if (newTemperament) {
    fetch(`http://localhost:3000/temperament/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newTemperament })
    })
      .then((response) => {
        if (response.ok) {
          const resData = 'Temperament updated';
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

async function deleteTemperament(id, name) {
  console.log(id, name);
  const confirmed = confirm(`Are you sure you want to delete ${name}?`);
  if (!confirmed) {
    return;
  }

  await fetch(`http://localhost:3000/temperament/${id}`, {
    method: 'DELETE'
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((data) => {
      alert(data.message);
      location.reload();
    })
    .catch((response) => {
      alert(response.statusText);
    });
}


async function addSpecies(url) {
  const speciesName = prompt('Enter the name of the new species:');
  if (!speciesName) {
    alert('Please enter a species name.');
    return;
  }
  
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: speciesName })
  })
  .then((response) => {
    if (response.ok) {
      const resData = 'Species created';
      location.reload();
      return Promise.resolve(resData);
    }
    return Promise.reject(response);
  })
  .catch((response) => {
    alert(response.statusText);
  });
}


async function addTemperament(url) {
  const name = prompt('Enter the name of the new temperament:');
  if (name) {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    })
    .then((response) => {
      if (response.ok) {
        const resData = 'Temperament created';
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


