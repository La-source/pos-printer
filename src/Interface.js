"use strict";

class Interface {
  constructor(config) {
    if ( !config ) {
      config = {};
    }

    this.timeout = config.timeout || 500;
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
