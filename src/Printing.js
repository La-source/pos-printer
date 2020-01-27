"use strict";

const { encode } = require("iconv-lite");

// Character code pages / iconv name of code table.
// Only code pages supported by iconv-lite:
// https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings
const CODE_PAGES = {
  PC437_USA:             "CP437",
  PC850_MULTILINGUAL:    "CP850",
  PC860_PORTUGUESE:      "CP860",
  PC863_CANADIAN_FRENCH: "CP863",
  PC865_NORDIC:          "CP865",
  PC851_GREEK:           "CP860",
  PC857_TURKISH:         "CP857",
  PC737_GREEK:           "CP737",
  ISO8859_7_GREEK:       "ISO-8859-7",
  WPC1252:               "CP1252",
  PC866_CYRILLIC2:       "CP866",
  PC852_LATIN2:          "CP852",
  SLOVENIA:              "CP852",
  PC858_EURO:            "CP858",
  WPC775_BALTIC_RIM:     "CP775",
  PC855_CYRILLIC:        "CP855",
  PC861_ICELANDIC:       "CP861",
  PC862_HEBREW:          "CP862",
  PC864_ARABIC:          "CP864",
  PC869_GREEK:           "CP869",
  ISO8859_2_LATIN2:      "ISO-8859-2",
  ISO8859_15_LATIN9:     "ISO-8859-15",
  PC1125_UKRANIAN:       "CP1125",
  WPC1250_LATIN2:        "WIN1250",
  WPC1251_CYRILLIC:      "WIN1251",
  WPC1253_GREEK:         "WIN1253",
  WPC1254_TURKISH:       "WIN1254",
  WPC1255_HEBREW:        "WIN1255",
  WPC1256_ARABIC:        "WIN1256",
  WPC1257_BALTIC_RIM:    "WIN1257",
  WPC1258_VIETNAMESE:    "WIN1258",
  KZ1048_KAZAKHSTAN:     "RK1048",
  JAPAN:                 "EUC-JP",
  CHINA:                 "EUC-CN",
  HK_TW:                 "Big5-HKSCS",
};

class Printing {
  constructor(printer) {
    this.printer = printer;
    this.driver = printer.driver;
    this.buffer = null;
  }

  print(text) {
    return this.append(text);
  }

  verticalTab() {
    return this.append(this.driver.verticalTab);
  }

  init() {
    return this.append(this.driver.init);
  }

  beep() {
    return this.append(this.driver.beep);
  }

  cut() {
    return this
      .append(this.driver.cut)
      .append(this.driver.init)
    ;
  }

  partialCut() {
    return this
      .append(this.driver.partialCut)
      .append(this.driver.init)
    ;
  }

  cashDrawer() {
    return this.append(this.driver.cashDrawer);
  }

  bold(enable) {
    return this.append( enable ? this.driver.boldOn : this.driver.boldOff);
  }

  underline(enable) {
    return this.append( enable ? this.driver.underlineOn : this.driver.underlineOff);
  }

  underlineThick(enable) {
    return this.append( enable ? this.driver.underlineThickOn : this.driver.underlineThickOff);
  }

  upsideDown(enable) {
    return this.append( enable ? this.driver.upsideDownOn : this.driver.upsideDownOff);
  }

  invert(enable) {
    return this.append( enable ? this.driver.invertOn : this.driver.invertOff);
  }

  alignCenter() {
    return this.append(this.driver.alignCenter);
  }

  alignLeft() {
    return this.append(this.driver.alignLeft);
  }

  alignRight() {
    return this.append(this.driver.alignRight);
  }

  fontA() {
    return this.append(this.driver.fontA);
  }

  fontB() {
    return this.append(this.driver.fontB);
  }

  sizeNormal() {
    return this.append(this.driver.sizeNormal);
  }

  sizeDoubleHeight() {
    return this.append(this.driver.sizeDoubleHeight);
  }

  sizeDoubleWidth() {
    return this.append(this.driver.sizeDoubleWidth);
  }

  sizeQuadArea() {
    return this.append(this.driver.sizeQuadArea);
  }

  setCharacterSet(characterSet) {
    if ( !CODE_PAGES.hasOwnProperty(characterSet) ) {
      throw new Error(`CharacterSet "${characterSet}" don't exist`);
    }

    this.characterSet = CODE_PAGES[characterSet];
    return this.append(this.driver.setCharacterSet(characterSet));
  }

  getText() {
    if ( !this.buffer ) {
      return "";
    }

    return this.buffer.toString();
  }

  getRaw() {
    return this.buffer;
  }

  append(data) {
    if ( typeof data === "string" ) {
      data = encode(data, this.characterSet);
    }

    if ( this.buffer ) {
      this.buffer = Buffer.concat([this.buffer, data]);
    } else {
      this.buffer = data;
    }

    return this;
  }
}

module.exports = { Printing };
