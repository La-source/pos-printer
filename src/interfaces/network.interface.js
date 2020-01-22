"use strict";

const { connect } = require("net");
const {Interface} = require("../Interface");

class NetworkInterface extends Interface {
  constructor(host, port, config) {
    super(config);

    this._isOpen = false;
    this.cnx = null;
    this.host = host;
    this.port = port || 9100;
  }

  get name() {
    return "NETWORK: " + this.host + ":" + this.port;
  }

  get isOpen() {
    return this._isOpen;
  }

  open() {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.cnx.destroy();
        reject("timeout");
      }, this.timeout);

      this.cnx = connect({
        host:    this.host,
        port:    this.port,
        timeout: this.timeout,
      }, () => {
        this._isOpen = true;
        clearTimeout(timeout);
        resolve();
      });

      this.cnx
        .on("error", err => {
          this._isOpen = false;
          this.cnx.destroy();
          reject(err);
        })
        .on("close", () => {
          this.cnx.destroy();
          this._isOpen = false;
        })
      ;
    });
  }

  close() {
    if ( !this.isOpen ) {
      return;
    }

    this.cnx.end();
    this._isOpen = false;
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

    return new Promise((resolve, reject) => {
      this.cnx.write(data, err => {
        if ( err ) {
          return reject(err);
        }

        resolve();
      });
    });
  }
}

module.exports = {NetworkInterface};
