// Type definitions for pos-printer
// Project: pos-printer
// Definitions by: Philippe Bauwens

interface ConfigPrinter {
  driver: new () => Driver;
  interface: Interface;
}

export class Printer {
  constructor(config: ConfigPrinter);

  get isOpen(): boolean;

  open(): Promise<void>;

  close(): void;

  status(): Promise<Status>;

  createPrinting(): Printing;

  execute(printing: Printing): Promise<void>;
}

export class Printing {
  constructor(printer: Printer);

  status(): this;

  print(text: string): this;

  verticalTab(): this;

  // TODO logo

  beep(): this;

  cut(): this;

  partialCut(): this;

  cashDrawer(): this;

  bold(enabled: boolean): this;

  underline(enabled: boolean): this;

  underlineThick(enabled: boolean): this;

  upsideDown(enabled: boolean): this;

  invert(enabled: boolean): this;

  alignCenter(): this;

  alignLeft(): this;

  alignRight(): this;

  fontA(): this;

  fontB(): this;

  // TODO text -> size

  // TODO small

  // TODO choice size (0-8)

  textNormal(): this;

  textDoubleHeight(): this;

  textDoubleWidth(): this;

  textQuadArea(): this;

  getText(): string;

  getRaw(): Buffer;

  append(data: string | Buffer): this;
}

interface PrinterStatus {
  offline: boolean;
}

interface OfflineStatus {
  cover: boolean;
  paperFeed: boolean;
  paperEnd: boolean;
  error: boolean;
}

interface ErrorStatus {
  cutterError: boolean;
  unrecoverableError: boolean;
  autoRecoverableError: boolean;
}

interface PaperRollStatus {
  paperLow: boolean;
  paperNotPresent: boolean;
}

export interface Status extends PrinterStatus, OfflineStatus, ErrorStatus, PaperRollStatus {}

export class Driver {
  getPrinterStatus(status: Buffer): PrinterStatus;

  getOfflineStatus(status: Buffer): OfflineStatus;

  getErrorStatus(status: Buffer): ErrorStatus;

  getPaperRollStatus(status: Buffer): PaperRollStatus;

  get printerStatus(): Buffer;

  get offLineStatus(): Buffer;

  get errorStatus(): Buffer;

  get paperRollStatus(): Buffer;

  get init(): Buffer;

  get verticalTab(): Buffer;

  get beep(): Buffer;

  get cut(): Buffer;

  get partialCut(): Buffer;

  get cashDrawer(): Buffer;

  get boldOn(): Buffer;

  get boldOff(): Buffer;

  get underlineOn(): Buffer;

  get underlineOff(): Buffer;

  get underlineThickOn(): Buffer;

  get underlineThickOff(): Buffer;

  get upsideDownOn(): Buffer;

  get upsideDownOff(): Buffer;

  get invertOn(): Buffer;

  get invertOff(): Buffer;

  get alignCenter(): Buffer;

  get alignLeft(): Buffer;

  get alignRight(): Buffer;

  get fontA(): Buffer;

  get fontB(): Buffer;

  get textNormal(): Buffer;

  get textDoubleHeight(): Buffer;

  get textDoubleWidth(): Buffer;

  get textQuadArea(): Buffer;

  /**
   * Convert buffer status to status number
   * @param status
   */
  private convertStatus(status: Buffer): number;
}

interface ConfigInterface {
  timeout?: number;
}

export class Interface {
  constructor(config?: ConfigInterface);

  get isOpen(): boolean;

  open(): Promise<void>;

  close(): void | Promise<void>;

  read(): Promise<Buffer>;

  write(data: Buffer): Promise<void>;
}

export class NetworkInterface extends Interface {
  constructor(host: string, port?: number, config?: ConfigInterface);
}

export class SerialInterface extends Interface {
  constructor(port: string, config?: ConfigInterface);
}

export class UsbInterface extends Interface {
  constructor(vid: number, pid:  number, config?: ConfigInterface);
}
