"use strict";

const {Printing} = require("./Printing");

class Printer {
  constructor(config) {
    this.driver = new config.driver();
    this.interface = config.interface;
    this.config = config;
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

  async status() {
    if ( !this.interface.isOpen ) {
      throw new Error("Interface not open");
    }

    const timeout = setTimeout(() => {
      throw new Error("Cannot fetch status");
    }, this.interface.timeout);

    await this.interface.write(this.driver.printerStatus);
    const printerStatus = await this.interface.read();

    await this.interface.write(this.driver.offLineStatus);
    const offLineStatus = await this.interface.read();

    await this.interface.write(this.driver.errorStatus);
    const errorStatus = await this.interface.read();

    await this.interface.write(this.driver.paperRollStatus);
    const paperRollStatus = await this.interface.read();

    clearTimeout(timeout);

    return {
      ...this.driver.getPrinterStatus(printerStatus),
      ...this.driver.getOfflineStatus(offLineStatus),
      ...this.driver.getErrorStatus(errorStatus),
      ...this.driver.getPaperRollStatus(paperRollStatus),
    };
  }

  createPrinting() {
    return new Printing(this);
  }

  execute(printing) {
    return this.interface.write(printing.getRaw());
  }
}

module.exports = {Printer};
