import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { VigilanteGuard } from 'src/app/vigilante.guard';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  logout() {
    this.loginService.logout();
  }
  stickyHeader = false;
  activo: boolean = false;
  isUserVerified!:boolean;

  //NAVBAR
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.stickyHeader = window.scrollY > 0;
  }
  @ViewChild('menuIcon') menuIcon!: ElementRef;
  @ViewChild('navmenu') navmenu!: ElementRef;
  private routerSubscription: Subscription;
  userStatus!:boolean;
  constructor(
    public loginService: LoginService,
    private router: Router,
    private http: HttpClient,
    private esAdmin:VigilanteGuard,
    private activatedRoute:ActivatedRoute
  ) {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.resetClasses();
      }
    });
  }
  ngOnInit(): void {
    this.isUserVerified = this.loginService.getUserStatus();
  }

  esAdministrador(){
    return this.loginService.esAdmin();
  }
  
  esPaciente(){
    return this.loginService.esPaciente();
  }
  logOutComponent(){
    this.logout()
    this.router.navigate(['/home'])
  }
  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  toggleMenu() {
    const iconElement = document.querySelector('i');
    const buttonElement = document.querySelector('.navMenu');
    if (iconElement && buttonElement) {
      if (this.activo == false) {
        iconElement.classList.replace('bx-menu', 'bx-x-circle');
        buttonElement.classList.add('open');
        this.activo = true;
      } else {
          iconElement.classList.replace('bx-x-circle', 'bx-menu');
          buttonElement.classList.remove('open');
          this.activo = false;
      }
    }
  }

  resetClasses() {
    const iconElement = document.querySelector('i');
    const buttonElement = document.querySelector('.navMenu');
    if (iconElement && buttonElement) {
      iconElement.classList.replace('bx-x-circle', 'bx-menu');
      buttonElement.classList.remove('open');
    }
  }
}
