"use strict";

const {findByIds} = require("usb");
const {Interface} = require("../Interface");

class UsbInterface extends Interface {
  constructor(vid, pid, config) {
    super(config);

    this.vid = vid;
    this.pid = pid;
    this.device = null;
    this.outEndpoint = null;
    this.inEndpoint = null;
  }

  get name() {
    return this.vid + " " + this.pid;
  }

  get isOpen() {
    return this.outEndpoint && this.inEndpoint;
  }

  open() {
    this.device = findByIds(this.vid, this.pid);
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

      this.inEndpoint = iface.endpoints
        .filter(endpoint => endpoint.direction === "in")[0];
      this.outEndpoint = iface.endpoints
        .filter(endpoint => endpoint.direction === "out")[0];

      if ( !this.inEndpoint || !this.outEndpoint ) {
        return reject();
      }

      this.inEndpoint.startPoll(1, 8);

      resolve();
    });

    // TODO usb.on('detach')
  }

  close() {
    if ( !this.isOpen ) {
      return;
    }

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
}

module.exports = { UsbInterface };
