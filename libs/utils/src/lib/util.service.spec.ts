import { UtilService } from './util.service';

describe('ValueService', () => {
  let service: UtilService;
  beforeEach(() => {
    service = new UtilService();
  });

  it('#should show accordian', () => {
        const val ={show:false}
        service.showAccordion(val);
        expect(val.show).toBe(true);
  });
  it('#should sort Tree Nodes with numbers in ascending order', () => {
        const params = { sortBy:'id',sortAsc: true};
        const data = [{id:3},{id:1},{id:2}];
        const result = service.sortTreeNodes(params,data);
        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(2);
        expect(result[2].id).toBe(3);
  });
  it('#should sort Tree Nodes with string in descending order', () => {
        const params = { sortBy:'id',sortAsc: false};
        const data = [{id:'ccc'},{id:'a'},{id:'bb'}];
        const result = service.sortTreeNodes(params,data);
        expect(result[0].id).toBe('ccc');
        expect(result[1].id).toBe('bb');
        expect(result[2].id).toBe('a');
  });
  it('#should test tonstoUserPreferedFormat', () => {
        let result = service.tonstoUserPreferedFormat(0.001,'KG');
        expect(result).toBe(1);
        result = service.tonstoUserPreferedFormat(0.90718474,'MT');
        expect(result).toBeGreaterThan(0);
        result = service.tonstoUserPreferedFormat(0.000453592,'LB');
        expect(result).toBe(1);
        result = service.tonstoUserPreferedFormat(0.907,'UST');
        expect(result).toBe(1);
        result = service.tonstoUserPreferedFormat(10,'Tons');
        expect(result).toBe(10);
  });
  it('#should test userPreferedFormatToTons', () => {
        let result = service.userPreferedFormatToTons(1,'KG');
        expect(result).toBe(0.001);
        result = service.userPreferedFormatToTons(1,'MT');
        expect(result).toBeGreaterThan(0);
        result = service.userPreferedFormatToTons(1,'LB');
        expect(result).toBe(0.000453592);
        result = service.userPreferedFormatToTons(1,'UST');
        expect(result).toBe(0.907);
        result = service.userPreferedFormatToTons(10,'Tons');
        expect(result).toBe(10);
    });
    it('#should validating string', () => {
          let result = service.validateString('hello',2,4);
          expect(result).toBe('Please enter values between2 and 4');
          result = service.validateString('hello',2,8);
          expect(result).toBe('');
          result = service.validateString('',2,8);
          expect(result).toBe('Please enter minimum 2 characters');
          result = service.validateString('SDPEDsF',2,8,new RegExp('^[a-z]+$'));
          expect(result).toBe('');
      });
      /* it('#should Prepare tree', () => {
        const data=[{
            name:'aa',
            groups:[{
                name:'bb'
            }]
        }];
        const result:any = service.prepareTree(data);
        expect(result[0].label).toBe('aa');
        expect(result[0].children[0].label).toBe('bb');
    }); */
});
