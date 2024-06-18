export class OnThisDay {
  text: string;
  pages: Page[];
}

export class Page {
  type: string;
  title: string; // deprecated
  displaytitle: string; // deprecated
  namespace: Namespace;
  titles: Titles;
  pageid: number;
  thumbnail: Image;
  originalimage: Image;
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description: string;
  description_source: string;
  content_urls: ContentUrls;
  extract: string;
  extract_html: string;
  normalizedtitle: string; // deprecated
}

export class Namespace {
  id: number;
  text: string;
  wikibase_item: string;
}

export class Titles {
  canonical: string;
  normalized: string;
  display: string;
}

export class Image {
  source: string;
  width: number;
  height: number;
}

export class ContentUrls {
  desktop: DesktopMobile;
  mobile: DesktopMobile;
}

export class DesktopMobile {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

export class OnThisDayList {
  onthisday: OnThisDay[];
}
