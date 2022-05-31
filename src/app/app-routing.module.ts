import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splashscreen/splashscreen.module').then(m => m.SplashscreenPageModule)
  },
  {
    path: 'signinpage',
    loadChildren: () => import('./signin/signin.module').then(m => m.SigninPageModule)
  },
  {
    path: 'signuppage',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'selectcategories',
    loadChildren: () => import('./selectcategories/selectcategories.module').then(m => m.SelectcategoriesPageModule)
  },

  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then(m => m.SupportPageModule)
  },


  {
    path: 'searchpage',
    loadChildren: () => import('./searchpage/searchpage.module').then(m => m.SearchpagePageModule)
  },

  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationPageModule)
  },

  {
    path: 'myalarms',
    loadChildren: () => import('./myalarms/myalarms.module').then(m => m.MyalarmsPageModule)
  },
  {
    path: 'change-category',
    loadChildren: () => import('./change-category/change-category.module').then(m => m.ChangeCategoryPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then(m => m.FaqPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'username-login',
    loadChildren: () => import('./username-login/username-login.module').then( m => m.UsernameLoginPageModule)
  },
  {
    path: 'ref',
    loadChildren: () => import('./reference/reference.module').then( m => m.ReferencePageModule)
  },
  {
    path: 'terms-and-condition',
    loadChildren: () => import('./terms-and-condition/terms-and-condition.module').then( m => m.TermsAndConditionPageModule)
  },
  {
    path: 't-and-c',
    loadChildren: () => import('./t-and-c/t-and-c.module').then( m => m.TAndCPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }