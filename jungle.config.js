const svelte = require("rollup-plugin-svelte");
const { terser } = require("rollup-plugin-terser");
const resolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs");
const ssr = require("rollup-plugin-svelte-ssr");
const fetch = require("node-fetch");

const { junglePreprocess } = require("junglejs");

const production = !!process.env.PRODUCTION;

const fs = require("fs");
const templateHtml = fs.readFileSync("src/template.html", {
  encoding: "utf8",
  flag: "r",
});

const createOpenLibUrl = (isbnArr) => {
  const keys = isbnArr.map((isbn) => `ISBN:${isbn}`).join(",");
  return `https://openlibrary.org/api/books?bibkeys=${keys}&jscmd=data&format=json`;
};

const SAMPLE_FETCH_URL = createOpenLibUrl([
  "0671746065",
  "0735211299",
  "1449335586",
  "157322359X",
  "0060853980",
  "0984782850",
]);

module.exports = async () => {
  console.log("SAMPLE_FETCH_URL ", SAMPLE_FETCH_URL);
  const bookRes = await fetch(SAMPLE_FETCH_URL);
  const bookArr = Object.values(await bookRes.json());

  return {
    clientInputOptions: (filename, extension) => {
      return {
        input: `jungle/build${extension}/${filename}/main.js`,
        plugins: [
          svelte({
            dev: !production,
            hydratable: true,
            preprocess: [junglePreprocess],
          }),

          resolve({
            browser: true,
            dedupe: ["svelte"],
          }),
          commonjs(),

          production && terser(),
        ],
      };
    },
    clientOutputOptions: (filename, extension) => {
      return {
        sourcemap: /*!production ? 'inline' : */ false,
        format: "iife",
        name: "app",
        file: `jungle/build${extension}/${filename}/bundle.js`,
      };
    },
    ssrInputOptions: (filename, extension) => {
      const processedFilename =
        filename == "."
          ? "Index"
          : filename
              .split("-")
              .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
              .join("");

      return {
        input: `src/routes${extension}/${processedFilename}.svelte`,
        plugins: [
          svelte({
            dev: !production,
            preprocess: [junglePreprocess],
            generate: "ssr",
            hydratable: true,
            css: (css) => {
              css.write(`jungle/build${extension}/${filename}/bundle.css`);
            },
          }),

          resolve({
            browser: true,
            dedupe: ["svelte"],
          }),
          commonjs(),

          production && terser(),

          ssr({
            fileName: "index.html",
            configureExport: function (html, css) {
              return templateHtml.replace("{jungle.export.html}", html);
            },
          }),
        ],
      };
    },
    ssrOutputOptions: (filename, extension) => {
      return {
        sourcemap: !production ? "inline" : false,
        format: "cjs",
        file: `jungle/build${extension}/${filename}/ssr.js`,
      };
    },
    dataSources: [
      {
        format: "json",
        name: "book",
        items: bookArr,
      },
      {
        format: "json",
        name: "author",
        items: [
          { id: 1, firstName: "Tom", lastName: "Coleman" },
          { id: 2, firstName: "Sashko", lastName: "Stubailo" },
          { id: 3, firstName: "Mikhail", lastName: "Novikov" },
        ],
        queryArgs: { id: "Int!" },
      },
      {
        format: "dir/markdown",
        name: "post",
        items: "static/posts/",
        queryArgs: { slug: "String!" },
      },
    ],
  };
};
