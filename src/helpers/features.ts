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
  timezone: string | undefined,
  format = "DD MMM YYYY HH:mm",
) {
  return dayjs.utc(date).tz(timezone).format(format);
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function isValidYear(year: string | undefined) {
  const yearRegex = /^(19\d{2}|20\d{2})$/;

  if (!year) return false;

  if (!yearRegex.test(year)) return false;

  const numericYear = Number(year);
  const currentYear = new Date().getFullYear();

  return numericYear >= 1900 && numericYear <= currentYear;
}

function validateHeroSection({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  if (!title.trim()) return { valid: false, message: "Please enter a title." };

  if (!content.trim())
    return { valid: false, message: "Please write something about yourself." };
}

export type Platform = "instagram" | "facebook" | "x" | "youtube";

function normalizeSocialLink(platform: Platform, value: string): string {
  let input = value.trim();

  if (!input || input === "#") return "#";

  // Remove protocol
  input = input.replace(/^https?:\/\//i, "");

  // Remove www.
  input = input.replace(/^www\./i, "");

  // Remove domain if user pasted one
  input = input.replace(
    /^(instagram\.com|facebook\.com|x\.com|twitter\.com|youtube\.com)\//i,
    "",
  );

  // Remove @
  input = input.replace(/^@/, "");

  // Remove trailing slash
  input = input.replace(/\/$/, "");

  switch (platform) {
    case "instagram":
      return `https://instagram.com/${input}`;

    case "facebook":
      return `https://facebook.com/${input}`;

    case "x":
      return `https://x.com/${input}`;

    case "youtube":
      return `https://youtube.com/@${input}`;
  }
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
  scrollToSection,
  isValidYear,
  validateHeroSection,
  normalizeSocialLink,
};
