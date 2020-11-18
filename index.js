#!/usr/bin/env node

const { spawn } = require("child_process");
const program = require("commander");

const parseTime = require("./time-parser");

const REMIND_AT_SUMMARY = `I believe you've got something to do.`;
const REMIND_AT_TEMPLATE_MSG = (remindTime) =>
  `Hey boy, it's ${remindTime.toString()}`;

const REMIND_EVERY_SUMMARY = `Time to stand up buddy.`;
const REMIND_EVERY_TEMPLATE_MSG = (remindTimeout) =>
  `It's been ${remindTimeout}, take a break. setTimeout(stop, 5m)..`;

const remindAt = (remindTime) => {
  setTimeout(
    () =>
      spawn("notify-send", [
        "-u",
        "normal",
        REMIND_AT_SUMMARY,
        REMIND_AT_TEMPLATE_MSG(remindTime),
      ]),
    parseTime(remindTime) || 5000
  );
};

const remindEvery = (periodTime) => {
  const parsed = parseTime(periodTime);
  try {
    setInterval(
      () =>
        spawn("notify-send", [
          "-u",
          "normal",
          REMIND_EVERY_SUMMARY,
          REMIND_EVERY_TEMPLATE_MSG(periodTime),
        ]),
      parsed || 5000
    );
    clearInterval();
  } catch (err) {
    console.log(err);
  }
};

program
  .command("after <time>")
  .description("Remind after <time>")
  .action((...args) => remindAt(args[0]));

program
  .command("every <time>")
  .description("Remind every <time>")
  .action((...args) => remindEvery(args[0]));

program.parse(process.argv);
console.log(program.args);
