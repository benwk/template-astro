import { ui, defaultLang, showDefaultLang } from "./config.js";

// Function to get language from URL
export function getLangFromUrl(url) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang;
  return defaultLang;
}

// Function to use translations
export function useTranslations(lang) {
  return function t(key) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

// Function to translate path
export function useTranslatedPath(lang) {
  return function translatePath(path, l = lang) {
    return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`;
  };
}

// Function to remove language prefix from path
export function removeLangPrefix(path, lang) {
  const prefix = `/${lang}`;
  if (path.startsWith(prefix)) {
    return path.slice(prefix.length);
  }
  return path;
}

export function getTranslatedPath(path, language, url) {
  const lang = getLangFromUrl(new URL(path, url));
  const translatePath = useTranslatedPath(lang);
  const pathWithoutPrefix = removeLangPrefix(path, lang);
  return translatePath(pathWithoutPrefix, language);
}

// Function to generate alternate link
export function generateAlternateLink(path, language, url) {
  // const lang = getLangFromUrl(new URL(path, url));
  // const translatePath = useTranslatedPath(lang);
  // const pathWithoutPrefix = removeLangPrefix(path, lang);
  return url + getTranslatedPath(path, language, url);
}

/**
 * Interpolates a localized string (loaded with the i18nKey) to a given reference string.
 */
export const interpolate = (localizedString, referenceString) => {
  const tagsRegex = /<([\w\d]+)([^>]*)>/gi;

  // Replace <br /> with a placeholder
  const placeholder = "BR_TAG_PLACEHOLDER";
  const tempReferenceString = referenceString.replace(
    /<br\s*(?:[^>]*)\/?>/gi,
    placeholder
  );
  let tempLocalizedString = localizedString.replace(
    /<br\s*\/?>/gi,
    placeholder
  );

  const referenceStringMatches = tempReferenceString.match(tagsRegex);

  if (!referenceStringMatches) {
    console.warn(
      "WARNING(i18): default slot does not include any HTML tag to interpolate! You should use the `t` function directly."
    );
    return localizedString;
  }

  const referenceTags = [];
  referenceStringMatches.forEach((tagNode) => {
    const [, name, attributes] = tagsRegex.exec(tagNode);
    referenceTags.push({ name, attributes });

    // reset regex state
    tagsRegex.exec("");
  });

  let interpolatedString = tempLocalizedString;
  for (let index = 0; index < referenceTags.length; index++) {
    const referencedTag = referenceTags[index];
    // Replace opening tags
    interpolatedString = interpolatedString.replaceAll(
      `<${index}>`,
      `<${referencedTag.name}${referencedTag.attributes}>`
    );
    // Replace closing tags
    interpolatedString = interpolatedString.replaceAll(
      `</${index}>`,
      `</${referencedTag.name}>`
    );
  }

  // Replace the placeholder back to <br />
  interpolatedString = interpolatedString.replace(
    new RegExp(placeholder, "g"),
    "<br />"
  );

  return interpolatedString;
};
