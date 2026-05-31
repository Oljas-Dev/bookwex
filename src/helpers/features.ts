import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

function getFirstName(str: string | undefined) {
  return str?.split(" ").at(0);
}
function getLastName(str: string | undefined) {
  return str?.split(" ").at(1) ?? "";
}

function capitalizeFirst(str: string | undefined) {
  if (!str) return "";

  return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
}

function capitalizeAllFirst(strArr: string | undefined) {
  const firstName = getFirstName(strArr);
  const lastName = getLastName(strArr);

  return capitalizeFirst(firstName) + " " + capitalizeFirst(lastName);
}

function toParamStr(str: string | undefined) {
  return str?.toLowerCase().replace(" ", "-");
}

function toNormalStr(str: string | undefined) {
  return str?.toLowerCase().replace("-", " ");
}

// Random id for images function
function generateImgId() {
  return crypto.randomUUID().slice(0, 6);
}

// Detecting Timezones
function formatLessonDate(
  date: string | undefined,
  format = "DD MMM YYYY HH:mm",
) {
  return dayjs.utc(date).tz(dayjs.tz.guess()).format(format);
}

export {
  getFirstName,
  getLastName,
  capitalizeFirst,
  toParamStr,
  toNormalStr,
  capitalizeAllFirst,
  generateImgId,
  formatLessonDate,
};
