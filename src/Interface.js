"use strict";

class Interface {
  constructor(config, overwriteConfig) {
    if ( !config ) {
      config = {};
    }

    if ( !overwriteConfig ) {
      overwriteConfig = {};
    }

    this.timeout = config.timeout || overwriteConfig.timeout || 500;
    this.intervalCheckStatus = config.intervalCheckStatus || overwriteConfig.intervalCheckStatus || 1e3;
  }

  get name() {
    return undefined;
  }

  get isOpen() {
    throw new Error("Function not supported");
  }

  open() {
    throw new Error("Function not supported");
  }

  close() {
    throw new Error("Function not supported");
  }

  read() {
    throw new Error("Function not supported");
  }

  write(_data) {
    throw new Error("Function not supported");
  }

  static discover() {
    throw new Error("Function not supported");
  }

  static async _tryOpen(devicesDiscovered) {
    await Promise.all(devicesDiscovered.map(device => device.open().catch(() => {})));

    const devices = devicesDiscovered.filter(device => device.isOpen);
    // TODO opening the connection does not guarantee that the device is a printer.
    //  Request status will be fine, which driver to use?
    await Promise.all(devices.map(device => device.close()));

    return devices;
  }
}

module.exports = {Interface};
