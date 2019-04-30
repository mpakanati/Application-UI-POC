import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let html: HTMLElement
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    html = fixture.nativeElement;
    component.expandIcon = true;
    component.cardHeader = {
      value: 'Ashok'
    }
    component.badge = 23;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('Should call expandCard', () => {
    spyOn(component, 'expandCard').and.callThrough();
    const event=new Event('click')
    component.expandCard(event)
    expect(component.expandCard).toBeTruthy();
  });
  it('Card header should not get rendered when header text is empty', () => {
    component.cardHeader = {
      value: '',
      class: 'testClass',
      style: {
        background: 'red'
      }
    }
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const header = html.getElementsByClassName('card-header');
      expect(header.length).toBe(0)
    })
  })
  it('Dynamic style should be applied to Card container', () => {
    component.cardStyle = {
      background: 'green'
    }
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const container = html.getElementsByClassName('card-container');
      expect(container[0]['style'].background).toBe('green')
    })
  })

  it('Dynamic Class should be applied to Card container', () => {
    component.cardClass = 'dynamic-class'
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const container = html.getElementsByClassName('dynamic-class');
      expect(container[0].classList).toContain('dynamic-class')
    })
  })
  // it('expand icon should  be displayed when isExpand is true ', () => {
  //   component.expandIcon = true;
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     const expandElem = html.getElementsByClassName('icon-Expand_Widget');
  //     expect(expandElem.length).toBe(1)
  //   })
  // })
  // it('expand icon should not be displayed when isExpand is false ', () => {
  //   component.expandIcon = false;
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     const expandElem = html.getElementsByClassName('icon-Expand_Widget');
  //     expect(expandElem.length).toBe(0)
  //   })
  // })
  it('expand icon should not be displayed when header text is empty and isExpand is true ', () => {
    component.expandIcon = true;
    component.cardHeader = {
      value: '',
      class: 'testClass',
      style: {
        background: 'red'
      }
    }
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const expandElem = html.getElementsByClassName('icon-Expand_Widget');
      expect(expandElem.length).toBe(0)
    })
  });
  it('Badge value should be same as input', () => {
    component.badge = 12;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const badgeEle = html.getElementsByClassName('badge');
      expect(badgeEle[0].textContent.trim()).toBe('12')
    })
  });

  it('Badge Should not render when badge is empty', () => {
    component.badge =null;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const badgeEle = html.getElementsByClassName('badge');
      expect(badgeEle.length).toBe(0)
    })
  });

  it('Dynamic style should be applied to card header', () => {
    component.cardHeader = {
      value: 'text',
      class: 'testClass',
      style: {
        background: 'red'
      }
    };
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const cardHeader = html.getElementsByClassName('card-header');
      expect(cardHeader[0]['style'].background).toBe('red');
    })
  });
  it('Dynamic class should be applied to card header', () => {
    component.cardHeader = {
      value: 'text',
      class: 'testClass',
      style: {
        background: 'red'
      }
    };
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const cardHeader = html.getElementsByClassName('card-header');
      expect(cardHeader[0].classList).toContain('testClass');
    })
  });
  it('Should call onCardClick',()=>{
    spyOn(component,'onCardClick').and.callThrough();
    component.onCardClick();
    expect(component.onCardClick).toBeTruthy();
  })
});

