import { getData } from "./configuration.mjs";

const covid_path = 'covid';
const covid_interval = 86400000;
const isCovidPost = true;

const nextbikes_path = 'nextbikes';
const nextbikes_interval = 86400000;
const isNextbikesPost = false;

const river_path = 'river';
const river_interval = 900000;
const isRiverPost = true;


function main() {
  getData(covid_path, isCovidPost);
  setInterval(() => getData(covid_path, isCovidPost), covid_interval);

  getData(nextbikes_path, isNextbikesPost);
  setInterval(() => getData(nextbikes_path, isNextbikesPost), nextbikes_interval);

  getData(river_path, isRiverPost);
  setInterval(() => getData(river_path, isRiverPost), river_interval);
}

main();