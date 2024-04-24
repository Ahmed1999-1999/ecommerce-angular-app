import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { FooterComponent } from './pages/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { DetailsComponent } from './pages/details/details.component';
import { NavBlankComponent } from './pages/nav-blank/nav-blank.component';
import { BlankLayoutComponent } from './pages/blank-layout/blank-layout.component';
import { NavAuthComponent } from './pages/nav-auth/nav-auth.component';
import { AuthLayoutComponent } from './pages/auth-layout/auth-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TremtextPipe } from './tremtext.pipe';
import { SearchPipe } from './search.pipe';
import { ToastrModule } from "ngx-toastr";
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AllordersComponent } from './pages/allorders/allorders.component';
import { CategoryComponent } from './pages/category/category.component';
import { BrandComponent } from './pages/brand/brand.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { SettingsComponent } from './settings/settings.component';
import { HttpRequestHeaderInterceptor } from './http-request-header.interceptor';
import {NgxPaginationModule} from 'ngx-pagination';
import { LoadingInterceptor } from './loading.interceptor';
import { NgxSpinnerModule } from "ngx-spinner"
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    BrandsComponent,
    CategoriesComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    DetailsComponent,
    NavBlankComponent,
    BlankLayoutComponent,
    NavAuthComponent,
    AuthLayoutComponent,
    TremtextPipe,
    SearchPipe,
    CheckoutComponent,
    AllordersComponent,
    CategoryComponent,
    BrandComponent,
    WishlistComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    CommonModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass: HttpRequestHeaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS,useClass: LoadingInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
