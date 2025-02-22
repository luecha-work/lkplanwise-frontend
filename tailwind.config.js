module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        background: "#F8F9FC",
        primary: "#2C3E50", // สีสำหรับ text-primary
        secondary: "#95A5A6",
        border: "#E0E6ED",
        card: "#FFFFFF",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};
