const sortData = (arr) => {
  arr = arr.sort((a, b) => {
    return b.points - a.points;
  });
  arr = arr.map((el) => {
    return {
      name: el.name,
      points: el.points,
      image: el.image,
      numberGame: el.numberGame,

      goals: el.goals,
    };
  });
};

module.exports = sortData;
