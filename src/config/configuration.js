import fetch from 'node-fetch';

async function getData(path, isPost) {
  const get_response = await fetch(`http://localhost:3000/${path}`);
  const data = await get_response.json();
  isPost ? postData(path, data) : patchData(path, data);
}

async function postData(path, data) {
  await fetch(`http://localhost:3000/${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => console.log(response));
}

async function patchData(path, data) {
  await fetch(`http://localhost:3000/${path}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => console.log(response));
}

function main() {
  const covid_path = 'covid';
  getData(covid_path, true);
  setInterval(() => getData(covid_path, true), 86400000);

  const nextbikes_path = 'nextbikes';
  getData(nextbikes_path, false);
  setInterval(() => getData(nextbikes_path, false), 100000000);

  const river_path = 'river';
  getData(river_path, true);
  setInterval(() => getData(river_path, true), 900000);
}

main();