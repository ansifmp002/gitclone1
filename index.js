const makeCommits = async (n) => {
  for (let i = 0; i < n; i++) {

    const day = random.int(1, 28); // February days

    const date = moment()
      .year(2026)          // 🔥 change year if needed
      .month(1)            // February = 1 (0 = Jan)
      .date(day)
      .hour(12)
      .minute(0)
      .second(0)
      .format();

    const data = {
      date,
      random: Math.random() // ensure change
    };

    console.log(`Commit ${i + 1}: ${date}`);

    await jsonfile.writeFile(FILE_PATH, data);
    await git.add(FILE_PATH);
    await git.commit(`Feb commit ${i + 1}`, {
      "--date": date
    });
  }

  await git.push("origin", "main");

  console.log("✅ February commits pushed!");
};