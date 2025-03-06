interface StateNamingLaw {
  rule: string;
  allowed: RegExp;
  maxLength?: number;
}

interface NamingLaws {
  [state: string]: StateNamingLaw;
}

export const namingLaws: NamingLaws = {
  Alabama: {
    rule: "The name entered on the birth certificate shall contain only English alphabetic characters, hyphens, and apostrophes. Other characters including numbers, periods, symbols, or non-English alphabetic characters may not be used.",
    allowed: /^[A-Za-z'-]+$/,
    maxLength: 2,
  },
};
