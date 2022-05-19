module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1024px",
        xl: "1380px",
      },
    },
    extend: {
      gridTemplateColumns: {
        "container-grid-cols": "1fr 5fr",
      },
    },
  },
  plugins: [],
};
