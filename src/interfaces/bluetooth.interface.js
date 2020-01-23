"use strict";

const {Interface} = require("../Interface");
const {BluetoothSerialPort} = require("bluetooth-serial-port");

class BluetoothInterface extends Interface {
  constructor(address, config) {
    super(config, {
      intervalCheckStatus: 30e3,
    });

    this.address = address;
    this._isOpen = false;
    this._cnx = null;
  }

  get name() {
    return "BLUETOOTH: " + this.address;
  }

  get isOpen() {
    return this._isOpen;
  }

  open() {
    return new Promise((resolve, reject) => {
      this._cnx = new BluetoothSerialPort();
      this._cnx.findSerialPortChannel(this.address, channel =>
        this._cnx.connect(this.address, channel, () => {
          this._isOpen = true;
          this._cnx.on("failure", () => this.close());
          resolve();
        }, () => reject("Unable open channel")),
      () => reject("Unable find channel"));
    });
  }

  close() {
    if ( !this.isOpen ) {
      return;
    }

    this._cnx.close();
    this._isOpen = false;
  }

  read() {
    if ( !this.isOpen ) {
      throw new Error("Printer not connected");
    }

    return new Promise(resolve => {
      this._cnx.once("data", resolve);
    });
  }

  write(data) {
    if ( !this.isOpen ) {
      throw new Error("Printer not connected");
    }

    if ( !data ) {
      return;
    }

    return new Promise(((resolve, reject) => {
      this._cnx.write(data, err => {
        if ( err ) {
          return reject(err);
        }

        resolve();
      });
    }));
  }

  static discover() {
    return new Promise(resolve => {
      const devices = [];
      const bt = new BluetoothSerialPort();

      bt
        .on("found", address => {
          devices.push(new BluetoothInterface(address));
        })
        .on("finished", () => resolve(this._tryOpen(devices)));

      bt.inquire();
    });
  }
}

module.exports = {BluetoothInterface};
