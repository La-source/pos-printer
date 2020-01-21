"use strict";

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
      data = Buffer.from(data, "utf8");
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
