const parseTime = (rawTime) => {
  if (!isValid()) throw new Error("Invalid input");

  switch (rawTime[rawTime.length - 1]) {
    case "s":
      return parseInt(rawTime.slice(0, -1)) * 1000;
    case "m":
      return parseInt(rawTime.slice(0, -1)) * 1000 * 60;
    case "h":
      return parseInt(rawTime.slice(0, -1)) * 1000 * 60 * 60;
    case "d":
      return parseInt(rawTime.slice(0, -1)) * 1000 * 60 * 60 * 24;
  }

  function isValid() {
    return (
      rawTime.match(/\d+[smhd]/i) && rawTime.match(/\d+[smhd]/i).length === 1
    );
  }
};

module.exports = parseTime;
