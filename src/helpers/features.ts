function getFirstName(str: string | undefined) {
  return str?.split(" ").at(0);
}
function getLastName(str: string | undefined) {
  return str?.split(" ").at(1);
}

function capitalizeFirst(str: string | undefined) {
  return str!.charAt(0).toUpperCase() + str!.slice(1).toLowerCase();
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

export {
  getFirstName,
  getLastName,
  capitalizeFirst,
  toParamStr,
  toNormalStr,
  capitalizeAllFirst,
};
