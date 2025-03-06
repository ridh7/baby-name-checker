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
    maxLength: 2,
    link: "https://www.alabamapublichealth.gov/vitalrecords/assets/vitalstatsrules.pdf",
  },
};
