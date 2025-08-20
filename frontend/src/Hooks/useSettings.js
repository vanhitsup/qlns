import { useSelector } from "react-redux";

export default function useSettings(parameter) {
  const settings = useSelector((state) => state.setting?.data);

  if (!settings) {
    return null;
  }

  if (parameter && Array.isArray(parameter) && parameter.length > 0) {
    return parameter.reduce((acc, key) => {
      acc[key] = settings[key];
      return acc;
    }, {});
  } else if (parameter && typeof parameter === "string") {
    return settings[parameter];
  }

  return settings;
}
