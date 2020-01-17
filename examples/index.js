"use strict";

const {EpsonDriver, Printer, NetworkInterface, SerialInterface, UsbInterface} = require("../index");

async function print(printer) {
  try {
    await printer.open();

    const printing = printer.createPrinting();
    printing
      .alignCenter()
      .print("Hello world")
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
  driver:    EpsonDriver,
  interface: new NetworkInterface("192.168.1.215"),
});

const printerSerial = new Printer({
  driver:    EpsonDriver,
  interface: new SerialInterface("COM4"),
});

const printerUsb = new Printer({
  driver:    EpsonDriver,
  interface: new UsbInterface(8401, 28681),
});


(async () => {
  await test(printerNetwork);
  await test(printerSerial);
  await test(printerUsb);
  await print(printerNetwork);
  await print(printerSerial);
  await print(printerUsb);
})();

