// import "@testing-library/jest-dom/extend-expect";

export const describeIfEmu = process.env.FB_EMU ? describe : describe.skip;
