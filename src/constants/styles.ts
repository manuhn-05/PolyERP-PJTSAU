export const SELECT_COMPONENT_STYLES = (isDarkMode: boolean) => ({
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    backgroundColor: state.isDisabled
      ? (isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.15)")
      : state.isSelected
        ? (isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(189,197,209,.3)")
        : isDarkMode
          ? "#122031" // Dark background
          : "white",
    boxShadow: state.isFocused
      ? (isDarkMode ? "inset 0 0 3px #1E2A3B" : "inset 0 0 3px #fff")
      : "none",
    color: isDarkMode ? "#fff" : "#000",
    fontWeight: "normal",
    fontSize: "14px",
    padding: "0.25em 1em",
    cursor: state.isDisabled ? "not-allowed" : "pointer",
    border: "none",
    borderRadius: "10em",
  }),

  menu: (baseStyles: any) => ({
    ...baseStyles,
    backgroundColor: isDarkMode ? "#1E2A3B" : "#fff", // Dropdown lighter than control
    fontSize: "14px",
    color: isDarkMode ? "#fff" : "#000",
  }),

  option: (baseStyles: any, state: any) => ({
    ...baseStyles,
    fontSize: "14px",
    backgroundColor: state.isSelected
      ? (isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(100,100,255,0.3)")
      : state.isFocused
        ? (isDarkMode ? "rgba(255,255,255,0.08)" : "#f0f0f0") // Hover effect
        : baseStyles.backgroundColor,
    color: state.isDisabled
      ? (isDarkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)")
      : (isDarkMode ? "#fff" : "rgba(0,0,0,0.7)"),
    cursor: state.isDisabled ? "not-allowed" : "pointer",
  }),

  singleValue: (baseStyles: any, state: any) => ({
    ...baseStyles,
    color: isDarkMode ? "#FFF" : "#000", // Yellow text for selected value in dark mode
  }),
});
