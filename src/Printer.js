"use strict";

const {Printing} = require("./Printing");

class Printer {
  constructor(config) {
    this.driver = new config.driver();
    this.interface = config.interface;
    this.width = config.width || 48;
  }

  get isOpen() {
    return this.interface.isOpen;
  }

  open() {
    return this.interface.open();
  }

  close() {
    return this.interface.close();
  }

  status() {
    if ( !this.interface.isOpen ) {
      throw new Error("Interface not open");
    }

    return new Promise((resolve, reject) => {
      let printerStatus;
      let offLineStatus;
      let errorStatus;
      let paperRollStatus;
      const timeout = setTimeout(() =>
        reject("timeout"),
      this.interface.timeout);

      Promise.resolve()
        .then(() => this.interface.write(this.driver.printerStatus))
        .then(() => this.interface.read())
        .then(result => printerStatus = result)
        .then(() => this.interface.write(this.driver.offLineStatus))
        .then(() => this.interface.read())
        .then(result => offLineStatus = result)
        .then(() => this.interface.write(this.driver.errorStatus))
        .then(() => this.interface.read())
        .then(result => errorStatus = result)
        .then(() => this.interface.write(this.driver.paperRollStatus))
        .then(() => this.interface.read())
        .then(result => paperRollStatus = result)
        .then(() => clearTimeout(timeout))
        .then(() => resolve({
          ...this.driver.getPrinterStatus(printerStatus),
          ...this.driver.getOfflineStatus(offLineStatus),
          ...this.driver.getErrorStatus(errorStatus),
          ...this.driver.getPaperRollStatus(paperRollStatus),
        }))
        .catch(err => reject(err))
      ;
    });
  }

  createPrinting() {
    return new Printing(this);
  }

  execute(printing) {
    return this.interface.write(printing.getRaw());
  }
}

module.exports = {Printer};
