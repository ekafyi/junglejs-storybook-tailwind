const cssnano = require("cssnano");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    require("tailwindcss"),
    isProd ? require("autoprefixer") : null,
    isProd ? cssnano({ preset: "default" }) : null,
  ],
};
