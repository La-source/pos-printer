"use strict";

const {findByIds, getDeviceList} = require("usb");
const {Interface} = require("../Interface");

/**
 * [USB Class Codes ]
 * @type {Object}
 * @docs http://www.usb.org/developers/defined_class
 */
const IFACE_CLASS = {
  AUDIO:   0x01,
  HID:     0x03,
  PRINTER: 0x07,
  HUB:     0x09,
};

class UsbInterface extends Interface {
  constructor(vid, pid, config) {
    super(config);

    this.vid = vid;
    this.pid = pid;
    this.device = null;
    this.outEndpoint = null;
    this.inEndpoint = null;
    this._isOpen = false;
  }

  get name() {
    return "USB: " + this.vid + ":" + this.pid;
  }

  get isOpen() {
    return this._isOpen;
  }

  open() {
    this.device = findByIds(this.vid, this.pid);

    if ( !this.device ) {
      return Promise.reject("not device connected");
    }

    this.device.open(true);

    return new Promise((resolve, reject) => {
      const iface = this.device.interfaces[0];

      if ( !iface ) {
        return reject();
      }

      /*
      const {platform} = require("os");
      iface.setAltSetting(iface.altSetting, () => {
        if (platform() !== "win32") {
          if (iface.isKernelDriverActive()) {
            try {
              iface.detachKernelDriver();
            } catch (e) {
              console.warn("Could not detatch kernel driver: %s", e)
            }
          }
        }
      });
      */

      iface.claim();
      this._isOpen = true;

      this.inEndpoint = iface.endpoints
        .filter(endpoint => endpoint.direction === "in")[0];
      this.outEndpoint = iface.endpoints
        .filter(endpoint => endpoint.direction === "out")[0];

      if ( !this.inEndpoint || !this.outEndpoint ) {
        return reject();
      }

      this.inEndpoint.startPoll(1, 8);

      this.inEndpoint.on("error", () => this.close());
      this.outEndpoint.on("error", () => this.close());

      resolve();
    });

    // TODO usb.on('detach')
  }

  close() {
    if ( !this.isOpen ) {
      return;
    }

    this._isOpen = false;

    return new Promise(resolve => {
      this.inEndpoint.stopPoll(() => {
        this.device.close();
        this.outEndpoint = null;
        this.inEndpoint = null;
        resolve();
      });
    });
  }

  read() {
    if ( !this.isOpen ) {
      throw new Error("Printer not connected");
    }

    return new Promise(resolve => {
      this.inEndpoint.once("data", data => resolve(data));
    });
  }

  write(data) {
    if ( !this.isOpen ) {
      throw new Error("Printer not connected");
    }

    if ( !data ) {
      return;
    }

    return new Promise((resolve, reject) => {
      this.outEndpoint.transfer(data, err => {
        if ( err ) {
          return reject(err);
        }

        resolve();
      });
    });
  }

  static async discover() {
    const devices = [];

    for ( const device of getDeviceList() ) {
      if ( !device.configDescriptor || !device.configDescriptor.interfaces ) {
        continue;
      }

      for ( const ifaces of device.configDescriptor.interfaces ) {
        for ( const iface of ifaces ) {
          if ( iface.bInterfaceClass === IFACE_CLASS.PRINTER ) {
            devices.push(new UsbInterface(
              device.deviceDescriptor.idVendor,
              device.deviceDescriptor.idProduct,
            ));
          }
        }
      }
    }

    return this._tryOpen(devices);
  }
}

module.exports = { UsbInterface };
