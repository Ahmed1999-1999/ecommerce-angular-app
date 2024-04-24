import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './pages/blank-layout/blank-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AuthLayoutComponent } from './pages/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './shared/guards/auth.guard';
import { DetailsComponent } from './pages/details/details.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AllordersComponent } from './pages/allorders/allorders.component';
import { CategoryComponent } from './pages/category/category.component';
import { BrandComponent } from './pages/brand/brand.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: "",
    component:BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home"         , component: HomeComponent        , title: "FreshCart | Home"            },
      { path: "details/:id"  , component: DetailsComponent     , title: "FreshCart | Product Details" },
      { path: "cart"         , component: CartComponent        , title: "FreshCart | Cart"            },
      { path: "wishlist"     , component: WishlistComponent    , title: "FreshCart | Wishlist"        },
      { path: "checkout/:id" , component: CheckoutComponent    , title: "FreshCart | Checkout"        },
      { path: "products"     , component: ProductsComponent    , title: "FreshCart | Products"        },
      { path: "categories"   , component: CategoriesComponent  , title: "FreshCart | Categories"      },
      { path: "category/:id" , component: CategoryComponent    , title: "FreshCart | Category"        },
      { path: "brands"       , component: BrandsComponent      , title: "FreshCart | Brands"          },
      { path: "brand/:id"    , component: BrandComponent       , title: "FreshCart | Brand"           },
      { path: "allorders"    , component: AllordersComponent   , title: "FreshCart | All Orders"      },
      { path: "settings"     , component: SettingsComponent    , title: "FreshCart | Settings"        },
    ]
  },

  { path: "",
    component:AuthLayoutComponent,
    children: [
      { path: "login"         , component: LoginComponent     , title: "FreshCart | Login"    },
      { path: "register"      , component: RegisterComponent  , title: "FreshCart | Register" },
      { path: "settings"      , component: SettingsComponent  , title: "FreshCart | Settings" },
    ]
  },
  
  { path: "**",
    component: NotfoundComponent,
    title: "Page Not Found"       
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration:'enabled',useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
