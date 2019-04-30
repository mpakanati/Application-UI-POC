import { XmlToJsonPipe } from './xml-to-json.pipe';

describe('XmlToJsonPipe', () => {
  it('create an instance', () => {
    const pipe = new XmlToJsonPipe();
    expect(pipe).toBeTruthy();
  });
  it('check pipe to transform xml', () => {
    const pipe = new XmlToJsonPipe();
    expect(pipe.transform('<root>Hello xml2js-parser!</root>')).toBeTruthy();
  });
});
