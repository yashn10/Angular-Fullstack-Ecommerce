import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductlistComponent } from './seller-productlist.component';

describe('SellerProductlistComponent', () => {
  let component: SellerProductlistComponent;
  let fixture: ComponentFixture<SellerProductlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerProductlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerProductlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
