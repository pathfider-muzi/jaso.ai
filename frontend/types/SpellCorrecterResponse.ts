export interface SpellCorrecterResponseType {
  message: {
    result: {
      errata_count: number;
      origin_html: string;
      html: string;
      notag_html: string;
    };
  };
}
