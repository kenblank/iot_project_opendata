import { patchData } from "./configuration.mjs";
import { data_1 } from "./mock-data/nextbikes_mockdata_1.mjs";
import { data_2 } from "./mock-data/nextbikes_mockdata_1.mjs";

const nextbikes_path = "nextbikes";
const nextbikes_interval = 20000;

function main() {
  patchData(nextbikes_path, data_1);
  setInterval(() => patchData(nextbikes_path, data_2), nextbikes_interval);
}

main();
