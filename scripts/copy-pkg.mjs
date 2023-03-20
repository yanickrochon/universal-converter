import path from "path";
import fs from "fs";

import sortPackage from "sort-package-json";

const packagePath = path.join(process.cwd(), "package.json");
const distPackagePath = path.join(process.cwd(), "dist", "package.json");

const devKeys = new Set(["private", "scripts", "devDependencies", "engines"]);

const pkg = JSON.parse(fs.readFileSync(packagePath));

const isEmpty = (value) =>
  value === null ||
  value === undefined ||
  (typeof value === "object" && !Object.keys(value).length);

const distPkg = sortPackage(
  Object.keys(
    // add "main" key
    Object.assign(pkg, {
      main: "./index.js",
    })
  )
    .sort()
    .reduce((distPkg, key) => {
      // remove empty or dev keys
      if (!devKeys.has(key) && !isEmpty(pkg[key])) {
        distPkg[key] = pkg[key];
      }
      return distPkg;
    }, {})
);

fs.writeFileSync(distPackagePath, JSON.stringify(distPkg, null, 2));
