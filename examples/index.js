"use strict";

const {
  EpsonDriver,
  Printer,
  NetworkInterface,
  SerialInterface,
  UsbInterface,
  BluetoothInterface,
} = require("../index");

async function print(printer) {
  try {
    await printer.open();

    const printing = printer.createPrinting();
    printing
      .setCharacterSet("PC858_EURO")
      .alignCenter()
      .print("Hello world\n")
      .print(`33.10€ &é"'(§è!çà)-`)
      .verticalTab()
      .verticalTab()
      .beep()
      .partialCut()
    ;

    await printer.execute(printing);
    console.log("print success");

  } catch (err) {
    console.error(err);
  }

  await printer.close();
}

async function test(printer) {
  try {
    await printer.open();

    const status = await printer.status();
    console.log(status);

  } catch (err) {
    console.error(err);
  }

  await printer.close();
}

const printerNetwork = new Printer({
  driver:    new EpsonDriver(),
  interface: new NetworkInterface("192.168.1.215"),
});

const printerSerial = new Printer({
  driver:    new EpsonDriver(),
  interface: new SerialInterface("COM5"),
});

const printerUsb = new Printer({
  driver:    new EpsonDriver(),
  interface: new UsbInterface(8401, 28681),
});

const printerBluetooth = new Printer({
  driver:    new EpsonDriver(),
  interface: new BluetoothInterface("(74:F0:00:00:00:00)Metapace M-30i"),
});


(async () => {
  await test(printerNetwork);
  await test(printerSerial);
  await test(printerUsb);
  await test(printerBluetooth);
  await print(printerNetwork);
  await print(printerSerial);
  await print(printerUsb);
  await print(printerBluetooth);

  const discover = [
    ...(await UsbInterface.discover()),
    ...(await NetworkInterface.discover()),
    ...(await SerialInterface.discover()),
    ...(await BluetoothInterface.discover()),
  ];

  console.log(discover.map(iface => iface.name));
})();

