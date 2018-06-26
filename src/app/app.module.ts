import { isPlatformBrowser } from '@angular/common';
import { NgModule, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarItemComponent } from './navbar-item/navbar-item.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserStoriesComponent } from './user-stories/user-stories.component';
import { ResourcesComponent } from './resources/resources.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    NavbarItemComponent,
    HomeComponent,
    AboutComponent,
    UserStoriesComponent,
    ResourcesComponent,
  ],

  imports: [
    BrowserModule.withServerTransition({ appId: 'furkleindustries-homepage' }),
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],

  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
