import { BinaryReader } from "."

test("ReadUInt8", () => {
  const binary = BinaryReader.from(Buffer.from("ABCDEF", "hex"));

  expect(binary.readUInt8()).toBe(0xAB);
  expect(binary.readUInt8()).toBe(0xCD);
  expect(binary.readUInt8()).toBe(0xEF);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readUInt8).toThrowError();
})

test("ReadSInt8", () => {
  const binary = BinaryReader.from(Buffer.from("ABCDEF", "hex"));

  expect(binary.readSInt8()).toBe(-0x55);
  expect(binary.readSInt8()).toBe(-0x33);
  expect(binary.readSInt8()).toBe(-0x11);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readSInt8).toThrowError();
})

test("ReadUInt16BE", () => {
  const binary = BinaryReader.from(Buffer.from("ABCDEFABCDEF", "hex"));

  expect(binary.readUInt16BE()).toBe(0xABCD);
  expect(binary.readUInt16BE()).toBe(0xEFAB);
  expect(binary.readUInt16BE()).toBe(0xCDEF);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readUInt16BE).toThrowError();
})

test("ReadUInt16LE", () => {
  const binary = BinaryReader.from(Buffer.from("ABCDEFABCDEF", "hex"));

  expect(binary.readUInt16LE()).toBe(0xCDAB);
  expect(binary.readUInt16LE()).toBe(0xABEF);
  expect(binary.readUInt16LE()).toBe(0xEFCD);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readUInt16LE).toThrowError();
})

test("ReadSInt16BE", () => {
  const binary = BinaryReader.from(Buffer.from("ABCDEFABCDEF", "hex"));

  expect(binary.readSInt16BE()).toBe(-0x5433);
  expect(binary.readSInt16BE()).toBe(-0x1055);
  expect(binary.readSInt16BE()).toBe(-0x3211);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readSInt16BE).toThrowError();
})

test("ReadUInt16LE", () => {
  const binary = BinaryReader.from(Buffer.from("ABCDEFABCDEF", "hex"));

  expect(binary.readSInt16LE()).toBe(-0x3255);
  expect(binary.readSInt16LE()).toBe(-0x5411);
  expect(binary.readSInt16LE()).toBe(-0x1033);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readSInt16LE).toThrowError();
})

test("ReadUInt24LE", () => {
  const binary = BinaryReader.from(Buffer.from("ABCDEFFEDCBA", "hex"));

  expect(binary.readUInt24LE()).toBe(0xEFCDAB);
  expect(binary.readUInt24LE()).toBe(0xBADCFE);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readUInt24LE).toThrowError();
})

test("ReadUInt24BE", () => {
  const binary = BinaryReader.from(Buffer.from("ABCDEFFEDCBA", "hex"));

  expect(binary.readUInt24BE()).toBe(0xABCDEF);
  expect(binary.readUInt24BE()).toBe(0xFEDCBA);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readUInt24BE).toThrowError();
})

test("ReadSInt24LE", () => {
  const binary = BinaryReader.from(Buffer.from("ABCDEFFEDCBA", "hex"));

  expect(binary.readSInt24LE()).toBe(-0x103255);
  expect(binary.readSInt24LE()).toBe(-0x452302);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readSInt24LE).toThrowError();
})

test("ReadSInt24BE", () => {
  const binary = BinaryReader.from(Buffer.from("ABCDEFFEDCBA", "hex"));

  expect(binary.readSInt24BE()).toBe(-0x543211);
  expect(binary.readSInt24BE()).toBe(-0x012346);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readSInt24BE).toThrowError();
})

test("ReadUInt32BE", () => {
  const binary = BinaryReader.from(Buffer.from("ABCDEF0110FEDCBA", "hex"));

  expect(binary.readUInt32BE()).toBe(0xABCDEF01);
  expect(binary.readUInt32BE()).toBe(0x10FEDCBA);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readUInt32BE).toThrowError();
})

test("ReadUInt32LE", () => {
  const binary = BinaryReader.from(Buffer.from("ABCDEF0110FEDCBA", "hex"));

  expect(binary.readUInt32LE()).toBe(0x01EFCDAB);
  expect(binary.readUInt32LE()).toBe(0xBADCFE10);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readUInt32LE).toThrowError();
})

test("ReadSInt32BE", () => {
  const binary = BinaryReader.from(Buffer.from("ABCDEF0110FEDCBA", "hex"));

  expect(binary.readSInt32BE()).toBe(-0x543210FF);
  expect(binary.readSInt32BE()).toBe(0x10FEDCBA);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readSInt32BE).toThrowError();
})

test("ReadSInt32LE", () => {
  const binary = BinaryReader.from(Buffer.from("ABCDEF0110FEDCBA", "hex"));

  expect(binary.readSInt32LE()).toBe(0x01EFCDAB);
  expect(binary.readSInt32LE()).toBe(-0x452301F0);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readSInt32LE).toThrowError();
})

test("ReadUInt48BE", () => {
  const binary = BinaryReader.from(Buffer.from("ABCDEF012345543210FEDCBA", "hex"));

  expect(binary.readUInt48BE()).toBe(0xABCDEF012345);
  expect(binary.readUInt48BE()).toBe(0x543210FEDCBA);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readUInt48BE).toThrowError();
})

test("ReadUInt48LE", () => {
  const binary = BinaryReader.from(Buffer.from("ABCDEF012345543210FEDCBA", "hex"));

  expect(binary.readUInt48LE()).toBe(0x452301EFCDAB);
  expect(binary.readUInt48LE()).toBe(0xBADCFE103254);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readUInt48LE).toThrowError();
})

test("ReadSInt48BE", () => {
  const binary = BinaryReader.from(Buffer.from("ABCDEF012345543210FEDCBA", "hex"));

  expect(binary.readSInt48BE()).toBe(-0x543210FEDCBB);
  expect(binary.readSInt48BE()).toBe(0x543210FEDCBA);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readSInt48BE).toThrowError();
})

test("ReadSInt48LE", () => {
  const binary = BinaryReader.from(Buffer.from("ABCDEF012345543210FEDCBA", "hex"));

  expect(binary.readSInt48LE()).toBe(0x452301EFCDAB);
  expect(binary.readSInt48LE()).toBe(-0x452301EFCDAC);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readSInt48LE).toThrowError();
})

test("ReadFloat32BE (Basic numbers)", () => {
  const binary = BinaryReader.from(Buffer.from("3F9E041940B5B98C", "hex"))

  expect(binary.readFloat32BE()).toBeCloseTo(1.2345, 4);
  expect(binary.readFloat32BE()).toBeCloseTo(5.6789, 4);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readFloat32BE).toThrowError()
})

test("ReadFloat32BE (Infinity)", () => {
  const binary = BinaryReader.from(Buffer.from("7F800000", "hex"))

  expect(binary.readFloat32BE()).toBe(Infinity);
})

test("ReadFloat32BE (NAN)", () => {
  const binary = BinaryReader.from(Buffer.from("7FC00000", "hex"))

  expect(binary.readFloat32BE()).toBeNaN();
})

test("ReadFloat32LE (Basic numbers)", () => {
  const binary = BinaryReader.from(Buffer.from("19049E3F8CB9B540", "hex"))

  expect(binary.readFloat32LE()).toBeCloseTo(1.2345, 4);
  expect(binary.readFloat32LE()).toBeCloseTo(5.6789, 4);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readFloat32LE).toThrowError()
})

test("ReadFloat32LE (Infinity)", () => {
  const binary = BinaryReader.from(Buffer.from("0000807F", "hex"))

  expect(binary.readFloat32LE()).toBe(Infinity);
})

test("ReadFloat32LE (NAN)", () => {
  const binary = BinaryReader.from(Buffer.from("0000C07F", "hex"))

  expect(binary.readFloat32LE()).toBeNaN();
})

test("ReadFloat64BE (Basic numbers)", () => {
  const binary = BinaryReader.from(Buffer.from("3FF3C083126E978D4016B7318FC50481", "hex"))

  expect(binary.readFloat64BE()).toBe(1.2345);
  expect(binary.readFloat64BE()).toBe(5.6789);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readFloat64BE).toThrowError()
})

test("ReadFloat64BE (Infinity)", () => {
  const binary = BinaryReader.from(Buffer.from("7FF0000000000000", "hex"))

  expect(binary.readFloat64BE()).toBe(Infinity);
})

test("ReadFloat64BE (NAN)", () => {
  const binary = BinaryReader.from(Buffer.from("7FF8000000000000", "hex"))

  expect(binary.readFloat64BE()).toBeNaN();
})

test("ReadFloat64LE (Basic numbers)", () => {
  const binary = BinaryReader.from(Buffer.from("8D976E1283C0F33F8104C58F31B71640", "hex"))

  expect(binary.readFloat64LE()).toBe(1.2345);
  expect(binary.readFloat64LE()).toBe(5.6789);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readFloat64LE).toThrowError()
})

test("ReadFloat64LE (Infinity)", () => {
  const binary = BinaryReader.from(Buffer.from("000000000000F07F", "hex"))

  expect(binary.readFloat64LE()).toBe(Infinity);
})

test("ReadFloat64LE (NAN)", () => {
  const binary = BinaryReader.from(Buffer.from("000000000000F87F", "hex"))

  expect(binary.readFloat64LE()).toBeNaN();
})

test("ReadPackedUInt32", () => {
  const binary = BinaryReader.from(Buffer.from("dcfcffff0f45a08a20", "hex"));

  expect(binary.readPackedUInt32()).toBe(4294966876);
  expect(binary.readPackedUInt32()).toBe(69);
  expect(binary.readPackedUInt32()).toBe(525600);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readPackedUInt32).toThrowError()
})

test("ReadPackedSInt32", () => {
  const binary = BinaryReader.from(Buffer.from("dcfcffff0f45a08a20", "hex"));

  expect(binary.readPackedSInt32()).toBe(-420);
  expect(binary.readPackedSInt32()).toBe(69);
  expect(binary.readPackedSInt32()).toBe(525600);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readPackedSInt32).toThrowError()
})

test("readBytes", () => {
  const binary = BinaryReader.from(Buffer.from("010203", "hex"));
  const subbinary = binary.readBytes(2);


  expect(subbinary.readUInt8()).toBe(1);
  expect(subbinary.readUInt8()).toBe(2);
  expect(subbinary.countRemainingBytes()).toBe(0);
  expect(binary.readUInt8()).toBe(3);
  expect(binary.countRemainingBytes()).toBe(0);
  expect(binary.readBytes.bind(binary, 1)).toThrowError()
})

test("readString ASCII", () => {
  const binary = BinaryReader.from(Buffer.from("4141414142424242", "hex"));

  expect(binary.readString(4)).toBe("AAAA");
  expect(binary.readString(4)).toBe("BBBB");
})

test("readString UTF-8", () => {
  const binary = BinaryReader.from(Buffer.from("f09f9880", "hex"));

  expect(binary.readString(4)).toBe("😀");
})

test("read through a reader function", () => {
  const binary = BinaryReader.from(Buffer.from("0102", "hex"));

  expect(binary.read(r => ({ a: r.readUInt8(), b: r.readUInt8() })))
    .toEqual({ a: 1, b: 2 });
})

test("read through a argumented reader function", () => {
  const binary = BinaryReader.from(Buffer.from("0102", "hex"));

  expect(binary.read((r, c: number) => ({ a: r.readUInt8(), b: r.readUInt8(), c }), 5))
    .toEqual({ a: 1, b: 2, c: 5 });
})

test("read through a reader object", () => {
  const binary = BinaryReader.from(Buffer.from("0102", "hex"));

  const obj = binary.read(class {
    static deserialize(reader: BinaryReader) {
      return new this(reader.readUInt8(), reader.readUInt8());
    }

    constructor(protected readonly A: number, protected readonly B: number) {}

    getA() { return this.A }
    getB() { return this.B }
  });

  expect(obj.getA()).toBe(1);
  expect(obj.getB()).toBe(2);
})

test("read remaining", () => {
  const binary = BinaryReader.from(Buffer.from("01020304", "hex"));

  const gen = binary.readRemaining(r => ({ a: r.readUInt8(), b: r.readUInt8() }))
  
  expect(binary.countRemainingBytes()).toBe(4);
  expect(gen.next()).toEqual({ done: false, value: { a: 1, b: 2 }});
  expect(gen.next()).toEqual({ done: false, value: { a: 3, b: 4 }});
  expect(gen.next()).toEqual({ done: true });
  expect(binary.countRemainingBytes()).toBe(0);
})

test("read array", () => {
  const binary = BinaryReader.from(Buffer.from("010203", "hex"));

  expect(binary.readArray(3, r => r.readUInt8())).toEqual([1, 2, 3]);
  expect(binary.countRemainingBytes()).toBe(0);
})