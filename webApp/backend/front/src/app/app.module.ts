import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PanelComponent } from './panel/panel.component';
import { WidgetComponent } from './widget/widget.component';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CallComponent } from '../call/call.component';
import { RingingComponent } from './ringing/ringing.component';
import { FinishedComponent } from './finished/finished.component';

import {Routes,RouterModule} from '@angular/router';
import { FailedComponent } from './failed/failed.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    WidgetComponent,
    CallComponent,
    RingingComponent,
    FinishedComponent,
    FailedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '',component:WidgetComponent},
      {path: 'ringing/:number',component:RingingComponent},
      {path: 'call',component:CallComponent},
      {path: 'finished',component:FinishedComponent},
      {path: 'failed',component:FailedComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
