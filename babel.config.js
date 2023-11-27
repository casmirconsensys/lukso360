module.exports = {
  presets: [
    [
      "next/babel",
      {
        "preset-env": {},
        "transform-runtime": {},
        "styled-jsx": {},
        "class-properties": {},
      },
    ],
  ],
  plugins: ["@babel/plugin-syntax-top-level-await"],
};
