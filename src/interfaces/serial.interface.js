"use strict";

const SerialPort = require("serialport");
const {Interface} = require("../Interface");

class SerialInterface extends Interface {
  constructor(port, config) {
    super(config);

    this.port = port;
    this._isOpen = false;
    this.cnx = null;
  }

  get name() {
    return "SERIAL: " + this.port;
  }

  get isOpen() {
    return this._isOpen;
  }

  open() {
    return new Promise((resolve, reject) => {
      this.cnx = new SerialPort(this.port, {
        baudRate: 9600, // TODO param
      }, err => {
        if ( err ) {
          return reject(err);
        }

        this.cnx.on("error", (err) => console.error("err", err));
        this.cnx.on("close", () => this.close());

        this._isOpen = true;
        resolve();
      });
    });
  }

  close() {
    if ( !this.isOpen ) {
      return;
    }

    this._isOpen = false;

    return new Promise((resolve, reject) => {
      if ( !this.cnx.isOpen ) {
        return resolve();
      }

      this.cnx.close(err => {
        if ( err ) {
          return reject(err);
        }

        resolve();
      });
    });
  }

  read() {
    if ( !this.isOpen ) {
      throw new Error("Printer not connected");
    }

    return new Promise(resolve => {
      this.cnx.once("data", resolve);
    });
  }

  write(data) {
    if ( !this.isOpen ) {
      throw new Error("Printer not connected");
    }

    if ( !data ) {
      return;
    }

    return this.cnx.write(data.toString("utf8"));
  }

  static async discover() {
    const ifaces = await SerialPort.list();
    const devices = ifaces.map(iface => new SerialInterface(iface.path));
    return this._tryOpen(devices);
  }
}

module.exports = { SerialInterface };
