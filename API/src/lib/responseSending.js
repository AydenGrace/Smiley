export default function response(
  res,
  status = 400,
  controller = "Auth",
  code = "invalid-credentials",
  message = "Invalid email or password."
) {
  const message = {
    status,
    code: `${controller}/${code}`,
    message,
  };

  // console.log(message);

  return res.status(status).json(message);
}

const ErrorGenerator = (controller = "AUTH", code = "INVALID-CREDENTIALS") => {
  return `${getControllerError(controller)}-${getCodeError(code)}`;
};

const getControllerError = (controller) => {
  switch (controller.toUpperCase()) {
    case "ADDRESS":
      return "RABBIT";
    case "ARTICLE-TYPE":
      return "BEE";
    case "ARTICLE":
      return "BUTTERFLY";
    case "AUTH":
      return "GOOSE";
    case "DISCOUNT":
      return "FOX";
    case "HISTORY":
      return "RACOON";
    case "MEDIA-TYPE":
      return "CAT";
    case "MEDIA":
      return "BEAR";
    case "ORDER":
      return "WOLF";
    case "ROLE":
      return "DOG";
    case "STATUS":
      return "DUCK";
    case "TEMPUSER":
      return "CAT";
    case "TESTIMONY":
      return "PARROT";
    case "USER-ARCHIVE":
      return "DODO";
    case "USER":
      return "CHICKEN";
    default:
      return "GHOST";
  }
};

const getCodeError = (code) => {
  switch (code.toUpperCase()) {
    case "INVALID-CREDENTIALS":
      return "DESTROY-CHAIR";
    case "INVALID-EMAIL-FORMAT":
      return "EAT-CANDLE";
    case "INVALID-PASSWORD-FORMAT":
      return "EAT-CARPET";
    case "NEED-INFORMATIONS":
      return "BURN-BOX";
    case "NOT-FOUND":
      return "LEAVE";
    case "ALREADY-EXIST":
      return "ADOPT-PLUSH";
    case "ALREADY-USED":
      return "ADOPT-PILLOWS";
    case "TOKEN-ERROR":
      return "ACCEPT-YOU";
    default:
      return "MANIFEST";
  }
};
