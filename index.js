import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const FILE_PATH = "./data.json";
const git = simpleGit();

const makeCommits = async (n) => {
  for (let i = 0; i < n; i++) {
    const x = random.int(0, 54);
    const y = random.int(0, 6);

    const date = moment()
      .subtract(1, "year")
      .add(x, "weeks")
      .add(y, "days")
      .format();

    const data = { date };

    console.log(`Commit ${i + 1}: ${date}`);

    // Write file
    await jsonfile.writeFile(FILE_PATH, data);

    // Git add + commit with backdate
    await git.add([FILE_PATH]);
    await git.commit(date, undefined, { "--date": date });
  }

  // Push after all commits
  await git.push();

  console.log("✅ All commits pushed!");
};

// Run
makeCommits(1);