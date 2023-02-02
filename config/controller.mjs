import fetch from "node-fetch";

async function getData(path, isPost) {
  await fetch(`http://localhost:3001/${path}`)
    .then(async (response) =>
      isPost
        ? postData(path, await response.json())
        : patchData(path, await response.json())
    )
    .catch((error) => console.log(error));
}

async function postData(path, data) {
  await fetch(`http://localhost:3001/${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}

async function patchData(path, data) {
  await fetch(`http://localhost:3001/${path}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}

export { getData, patchData };
