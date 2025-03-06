interface StateNamingLaw {
  rule: string;
  allowed: RegExp;
  maxLength?: number;
  link?: string;
}

interface NamingLaws {
  [state: string]: StateNamingLaw;
}

export const namingLaws: NamingLaws = {
  Alabama: {
    rule: "The name entered on the birth certificate shall contain only English alphabetic characters, hyphens, and apostrophes. Other characters including numbers, periods, symbols, or non-English alphabetic characters may not be used.",
    allowed: /^[A-Za-z'-]+$/,
    maxLength: 50,
    link: "https://www.alabamapublichealth.gov/vitalrecords/assets/vitalstatsrules.pdf",
  },
  Alaska: {
    rule: "Allows English alphabetic characters, hyphens, apostrophes, and some diacritical marks (e.g., umlauts, tildes). No numbers or other symbols.",
    allowed: /^[A-Za-zÀ-ÿ'-]+$/,
  },
  Arizona: {
    rule: "English alphabetic characters, hyphens, apostrophes, periods, and spaces allowed. 141 character limit total.",
    allowed: /^[A-Za-z'-. ]+$/,
    maxLength: 141,
  },
  California: {
    rule: "English alphabetic characters, hyphens, and apostrophes allowed. No numbers or special symbols.",
    allowed: /^[A-Za-z'-]+$/,
  },
  Colorado: {
    rule: "English alphabetic characters and hyphens allowed. 75 character limit.",
    allowed: /^[A-Za-z-]+$/,
    maxLength: 75,
  },
};
