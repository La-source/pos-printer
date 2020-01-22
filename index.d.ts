// Type definitions for pos-printer
// Project: pos-printer
// Definitions by: Philippe Bauwens

/**
 * Param for Printer constructor
 */
interface ConfigPrinter {
  /**
   * Driver for printer
   */
  driver: new () => Driver;

  /**
   * Interface for printer (network, serial,
   */
  interface: Interface;

  /**
   * Width printable (number normal char)
   */
  width?: number;
}

/**
 * Printer
 */
export class Printer {
  readonly driver: Driver;

  readonly interface: Interface;

  readonly width: number;

  constructor(config: ConfigPrinter);

  /**
   * Printer name
   */
  get name(): string;

  /**
   * Communication with printer is open
   */
  get isOpen(): boolean;

  /**
   * Open communication with printer
   */
  open(): Promise<void>;

  /**
   * Close communication with printer
   */
  close(): void;

  /**
   * Get status printer
   */
  status(): Promise<Status>;

  /**
   * Create new printing task for this printer
   */
  createPrinting(): Printing;

  /**
   * Execute printing task
   * @param printing
   */
  execute(printing: Printing): Promise<void>;
}

/**
 * Printing task
 */
export class Printing {
  readonly printer: Printer;

  readonly driver: Driver;

  constructor(printer: Printer);

  /**
   * Fetch status printer
   */
  status(): this;

  /**
   * Print text
   * @param text
   */
  print(text: string): this;

  /**
   * Print vertical tab
   */
  verticalTab(): this;

  /**
   * Clear printer buffer
   */
  init(): this;

  // TODO logo

  /**
   * Emit beep on internal buzzer
   */
  beep(): this;

  /**
   * Cut paper
   */
  cut(): this;

  /**
   * Cut paper partially
   */
  partialCut(): this;

  /**
   * Open cash drawer
   */
  cashDrawer(): this;

  /**
   * Enable or disable bold text printing
   * @param enabled
   */
  bold(enabled: boolean): this;

  /**
   * Enable or disable underline text printing
   * @param enabled
   */
  underline(enabled: boolean): this;

  /**
   * Enable or disable underline thick text printing
   * @param enabled
   */
  underlineThick(enabled: boolean): this;

  /**
   * Enable or disable upside down text printing
   * @param enabled
   */
  upsideDown(enabled: boolean): this;

  /**
   * Enable or disable invert text printing
   * @param enabled
   */
  invert(enabled: boolean): this;

  // TODO italic

  /**
   * Enable center align printing
   */
  alignCenter(): this;

  /**
   * Enable left align printing
   */
  alignLeft(): this;

  /**
   * Enable right align printing
   */
  alignRight(): this;

  /**
   * Select font A
   */
  fontA(): this;

  /**
   * Select font B
   */
  fontB(): this;

  // TODO small

  // TODO choice size (0-8)

  /**
   * Select normal size printing
   */
  sizeNormal(): this;

  /**
   * Select double height size printing
   */
  sizeDoubleHeight(): this;

  /**
   * Select double width size printing
   */
  sizeDoubleWidth(): this;

  /**
   * Select quad area size printing
   */
  sizeQuadArea(): this;

  /**
   * Get text data printing
   */
  getText(): string;

  /**
   * Get raw data printing
   */
  getRaw(): Buffer;

  /**
   * Append data in printing task
   * @param data
   */
  append(data: string | Buffer): this;
}

/**
 * Printer status
 */
interface PrinterStatus {
  /**
   * Printer is offline
   */
  offline: boolean;
}

/**
 * Offline printer status
 */
interface OfflineStatus {
  /**
   * Cover is open
   */
  cover: boolean;

  /**
   * Paper is feed
   */
  paperFeed: boolean;

  /**
   * End of paper
   */
  paperEnd: boolean;

  /**
   * Printer is on error
   */
  error: boolean;
}

/**
 * Error printer status
 */
interface ErrorStatus {
  /**
   * Cutter error
   */
  cutterError: boolean;

  /**
   * Printer is on error not recoverable automatically
   */
  unrecoverableError: boolean;

  /**
   * Printer is on error recoverable automatically
   */
  autoRecoverableError: boolean;
}

/**
 * Paper roll printer status
 */
interface PaperRollStatus {
  /**
   * Paper is low
   */
  paperLow: boolean;

  /**
   * Paper is not present
   */
  paperNotPresent: boolean;
}

/**
 * Status global printer
 */
export interface Status extends PrinterStatus, OfflineStatus, ErrorStatus, PaperRollStatus {}

/**
 * Driver for communication with printer
 */
export class Driver {
  /**
   * Transform printer status buffer from printer to PrinterStatus
   * @param status
   */
  getPrinterStatus(status: Buffer): PrinterStatus;

  /**
   * Transform offline status buffer from printer to OfflineStatus
   * @param status
   */
  getOfflineStatus(status: Buffer): OfflineStatus;

  /**
   * Transform error status buffer from printer to ErrorStatus
   * @param status
   */
  getErrorStatus(status: Buffer): ErrorStatus;

  /**
   * Transform paper roll status buffer from printer to PaperRoll
   * @param status
   */
  getPaperRollStatus(status: Buffer): PaperRollStatus;

  /**
   * Get esc code for get printer status
   */
  get printerStatus(): Buffer;

  /**
   * Get esc code for get offline status
   */
  get offLineStatus(): Buffer;

  /**
   * Get esc code for get error status
   */
  get errorStatus(): Buffer;

  /**
   * Get esc code for get paper roll status
   */
  get paperRollStatus(): Buffer;

  /**
   * Get esc code for initialize printer
   */
  get init(): Buffer;

  /**
   * Get esc code for vertical tab
   */
  get verticalTab(): Buffer;

  /**
   * Get esc code for beep internal
   */
  get beep(): Buffer;

  /**
   * Get esc code for cut paper
   */
  get cut(): Buffer;

  /**
   * Get esc code for partial cut paper
   */
  get partialCut(): Buffer;

  /**
   * Get esc code for open drawer
   */
  get cashDrawer(): Buffer;

  /**
   * Get esc code for enable bold text
   */
  get boldOn(): Buffer;

  /**
   * Get esc code for disable bold text
   */
  get boldOff(): Buffer;

  /**
   * Get esc code for enable underline text
   */
  get underlineOn(): Buffer;

  /**
   * Get esc code for disable underline text
   */
  get underlineOff(): Buffer;

  /**
   * Get esc code for enable underline thick text
   */
  get underlineThickOn(): Buffer;

  /**
   * Get esc code for disable underline thick text
   */
  get underlineThickOff(): Buffer;

  /**
   * Get esc code for enable upside thick text
   */
  get upsideDownOn(): Buffer;

  /**
   * Get esc code for disable upside thick text
   */
  get upsideDownOff(): Buffer;

  /**
   * Get esc code for enable invert text
   */
  get invertOn(): Buffer;

  /**
   * Get esc code for disable invert text
   */
  get invertOff(): Buffer;

  /**
   * Get esc code for align center text
   */
  get alignCenter(): Buffer;

  /**
   * Get esc code for align left text
   */
  get alignLeft(): Buffer;

  /**
   * Get esc code for align right text
   */
  get alignRight(): Buffer;

  /**
   * Get esc code for choice font A
   */
  get fontA(): Buffer;

  /**
   * Get esc code for choice font B
   */
  get fontB(): Buffer;

  /**
   * Get esc code for select normal size
   */
  get sizeNormal(): Buffer;

  /**
   * Get esc code for select double height size
   */
  get sizeDoubleHeight(): Buffer;

  /**
   * Get esc code for select double width size
   */
  get sizeDoubleWidth(): Buffer;

  /**
   * Get esc code for select quad area size
   */
  get sizeQuadArea(): Buffer;

  /**
   * Convert buffer status to status number
   * @param status
   */
  private convertStatus(status: Buffer): number;
}

/**
 * Configuration for printer interface
 */
interface ConfigInterface {
  /**
   * Timeout printer
   */
  timeout?: number;
}

/**
 * Interface printer
 */
export class Interface {
  readonly timeout: number;

  constructor(config?: ConfigInterface);

  /**
   * Interface name (COM5, 192.168.1.100, ...)
   */
  get name(): string;

  /**
   * Is interface open for communication with printer
   */
  get isOpen(): boolean;

  /**
   * Open interface printer
   */
  open(): Promise<void>;

  /**
   * Close interface printer
   */
  close(): void | Promise<void>;

  /**
   * Read data from printer
   */
  read(): Promise<Buffer>;

  /**
   * Write data to printer
   * @param data
   */
  write(data: Buffer): Promise<void> | void;

  static discover(): Promise<Interface[]>;
}

/**
 * Network Interface
 */
export class NetworkInterface extends Interface {
  /**
   *
   * @param host Host printer (exemple 192.168.1.100)
   * @param port Port printer (default 9100)
   * @param config
   */
  constructor(host: string, port?: number, config?: ConfigInterface);
}

/**
 * Serial interface
 */
export class SerialInterface extends Interface {
  /**
   *
   * @param port Port printer (exemple COM3 or /dev/usb/lp0)
   * @param config
   */
  constructor(port: string, config?: ConfigInterface);
}

/**
 * Usb Interface
 */
export class UsbInterface extends Interface {
  /**
   *
   * @param vid Vendor Id
   * @param pid Product Id
   * @param config
   */
  constructor(vid: number, pid:  number, config?: ConfigInterface);

  // TODO discover printer
}
