const makeCommits = async () => {
  const letters = {
    A: [
      "01110",
      "10001",
      "10001",
      "11111",
      "10001",
      "10001",
      "10001",
    ],
    N: [
      "10001",
      "11001",
      "10101",
      "10011",
      "10001",
      "10001",
      "10001",
    ],
    S: [
      "01111",
      "10000",
      "10000",
      "01110",
      "00001",
      "00001",
      "11110",
    ],
    I: [
      "11111",
      "00100",
      "00100",
      "00100",
      "00100",
      "00100",
      "11111",
    ],
    F: [
      "11111",
      "10000",
      "10000",
      "11110",
      "10000",
      "10000",
      "10000",
    ],
  };

  const word = ["A", "N", "S", "I", "F"];

  let startDate = moment("2024-01-01");
  let weekOffset = 0;

  for (let letter of word) {
    const pattern = letters[letter];

    for (let y = 0; y < pattern.length; y++) {
      for (let x = 0; x < pattern[y].length; x++) {
        if (pattern[y][x] === "1") {
          const date = startDate
            .clone()
            .add(weekOffset + x, "weeks")
            .add(y, "days")
            .format();

          const data = {
            date,
            random: Math.random(),
          };

          console.log(`Commit ${letter}: ${date}`);

          await jsonfile.writeFile(FILE_PATH, data);
          await git.add(FILE_PATH);
          await git.commit(`draw ${letter}`, {
            "--date": date,
          });
        }
      }
    }

    weekOffset += 6; // spacing between letters
  }

  await git.push("origin", "main");

  console.log("✅ ANSIF created in 2023!");
};