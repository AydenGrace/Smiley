export const RESET = "\x1b[0m";
export const BLACK = "\x1b[30m";
export const RED = "\x1b[31m";
export const GREEN = `\x1b[32m`;
export const YELLOW = `\x1b[33m`;
export const BLUE = `\x1b[34m`;
export const MAGENTA = `\x1b[35m`;
export const CYAN = `\x1b[36m`;
export const WHITE = `\x1b[37m`;

export const toBlack = (text) => {
  return `${BLACK}${text}${RESET}`;
};

export const toRed = (text) => {
  return `${RED}${text}${RESET}`;
};

export const toGreen = (text) => {
  return `${GREEN}${text}${RESET}`;
};

export const toYellow = (text) => {
  return `${YELLOW}${text}${RESET}`;
};

export const toBlue = (text) => {
  return `${BLUE}${text}${RESET}`;
};

export const toMagenta = (text) => {
  return `${MAGENTA}${text}${RESET}`;
};

export const toCyan = (text) => {
  return `${CYAN}${text}${RESET}`;
};

export const toWhite = (text) => {
  return `${WHITE}${text}${RESET}`;
};

export const colorize = (...args) => ({
  black: `\x1b[30m${args.join(" ")}`,
  red: `\x1b[31m${args.join(" ")}`,
  green: `\x1b[32m${args.join(" ")}`,
  yellow: `\x1b[33m${args.join(" ")}`,
  blue: `\x1b[34m${args.join(" ")}`,
  magenta: `\x1b[35m${args.join(" ")}`,
  cyan: `\x1b[36m${args.join(" ")}`,
  white: `\x1b[37m${args.join(" ")}`,
  bgBlack: `\x1b[40m${args.join(" ")}\x1b[0m`,
  bgRed: `\x1b[41m${args.join(" ")}\x1b[0m`,
  bgGreen: `\x1b[42m${args.join(" ")}\x1b[0m`,
  bgYellow: `\x1b[43m${args.join(" ")}\x1b[0m`,
  bgBlue: `\x1b[44m${args.join(" ")}\x1b[0m`,
  bgMagenta: `\x1b[45m${args.join(" ")}\x1b[0m`,
  bgCyan: `\x1b[46m${args.join(" ")}\x1b[0m`,
  bgWhite: `\x1b[47m${args.join(" ")}\x1b[0m`,
});
