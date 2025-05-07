import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLogoutComponent } from './post-logout.component';

describe('PostLogoutComponent', () => {
  let component: PostLogoutComponent;
  let fixture: ComponentFixture<PostLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostLogoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
