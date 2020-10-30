const { spawn } = require("child_process");

const REMIND_AT_SUMMARY = `I believe you've got something to do.`;
const REMIND_AT_TEMPLATE_MSG = (remindTime) =>
  `Hey boy, it's ${remindTime.toString()}`;

const REMIND_EVERY_SUMMARY = `Time to stand up buddy.`;
const REMIND_EVERY_TEMPLATE_MSG = (remindTimeout) =>
  `It's been ${remindTimeout}, take a break. setTimeout(stop, 5m)..`;

const remindAt = (remindTime) => {
  setTimeout(() => {
    const reminder = spawn("notify-send", [
      "-u",
      "normal",
      "-t",
      "2000",
      REMIND_AT_SUMMARY,
      REMIND_AT_TEMPLATE_MSG(remindTime),
    ]);

    reminder.stderr.on("err", (err) => console.log(err));
  }, remindTime);
};

const remindEvery = (periodTime) => {
  setInterval(() => {
    const reminder = spawn("notify-send", [
      "-u",
      "normal",
      "-t",
      "2000",
      REMIND_EVERY_SUMMARY,
      REMIND_EVERY_TEMPLATE_MSG(periodTime),
    ]);
    reminder.stderr.on("err", (err) => console.log(err));
  }, periodTime);
};

remindAt(5000);
remindEvery(2000);
