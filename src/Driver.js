"use strict";

class Driver {
  getPrinterStatus(_status) {
    console.warn(`"getPrinterStatus" not implemented`);
    return {
      offline: false,
    };
  }

  getOfflineStatus(_status) {
    console.warn(`"getOfflineStatus" not implemented`);
    return {
      cover:     false,
      paperFeed: false,
      paperEnd:  false,
      error:     false,
    };
  }

  getErrorStatus(_status) {
    console.warn(`"getErrorStatus" not implemented`);
    return {
      cutterError:          false,
      unrecoverableError:   false,
      autoRecoverableError: false,
    };
  }

  getPaperRollStatus(_status) {
    console.warn(`"getPaperRollStatus" not implemented`);
    return {
      paperLow:        false,
      paperNotPresent: false,
    };
  }

  get printerStatus() {
    console.warn(`"printerStatus" not implemented`);
    return new Buffer();
  }

  get offLineStatus() {
    console.warn(`"offLineStatus" not implemented`);
    return new Buffer();
  }

  get errorStatus() {
    console.warn(`"errorStatus" not implemented`);
    return new Buffer();
  }

  get paperRollStatus() {
    console.warn(`"paperRollStatus" not implemented`);
    return new Buffer();
  }

  get init() {
    console.warn(`"init" not implemented`);
    return new Buffer();
  }

  get verticalTab() {
    console.warn(`"verticalTab" not implemented`);
    return new Buffer();
  }

  get beep() {
    console.warn(`"beep" not implemented`);
    return new Buffer();
  }

  get cut() {
    console.warn(`"cut" not implemented`);
    return new Buffer();
  }

  get partialCut() {
    console.warn(`"partialCut" not implemented`);
    return new Buffer();
  }

  get cashDrawer() {
    console.warn(`"cashDrawer" not implemented`);
    return new Buffer();
  }

  get boldOn() {
    console.warn(`"boldOn" not implemented`);
    return new Buffer();
  }

  get boldOff() {
    console.warn(`"boldOff" not implemented`);
    return new Buffer();
  }

  get underlineOn() {
    console.warn(`"underlineOn" not implemented`);
    return new Buffer();
  }

  get underlineOff() {
    console.warn(`"underlineOff" not implemented`);
    return new Buffer();
  }

  get underlineThickOn() {
    console.warn(`"underlineThickOn" not implemented`);
    return new Buffer();
  }

  get underlineThickOff() {
    console.warn(`"underlineThickOff" not implemented`);
    return new Buffer();
  }

  get upsideDownOn() {
    console.warn(`"upsideDownOn" not implemented`);
    return new Buffer();
  }

  get upsideDownOff() {
    console.warn(`"upsideDownOff" not implemented`);
    return new Buffer();
  }

  get invertOn() {
    console.warn(`"invertOn" not implemented`);
    return new Buffer();
  }

  get invertOff() {
    console.warn(`"invertOff" not implemented`);
    return new Buffer();
  }

  get alignCenter() {
    console.warn(`"alignCenter" not implemented`);
    return new Buffer();
  }

  get alignLeft() {
    console.warn(`"alignLeft" not implemented`);
    return new Buffer();
  }

  get alignRight() {
    console.warn(`"alignRight" not implemented`);
    return new Buffer();
  }

  get fontA() {
    console.warn(`"fontA" not implemented`);
    return new Buffer();
  }

  get fontB() {
    console.warn(`"fontB" not implemented`);
    return new Buffer();
  }

  get textNormal() {
    console.warn(`"textNormal" not implemented`);
    return new Buffer();
  }

  get textDoubleHeight() {
    console.warn(`"textDoubleHeight" not implemented`);
    return new Buffer();
  }

  get textDoubleWidth() {
    console.warn(`"textDoubleWidth" not implemented`);
    return new Buffer();
  }

  get textQuadArea() {
    console.warn(`"textQuadArea" not implemented`);
    return new Buffer();
  }
}

module.exports = {Driver};
