import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiModule, UiDirectivesModule } from '@brave/ui';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatRippleModule } from '@angular/material/core';
import { HttpModule } from '@brave/http';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UiModule.forRoot(),
    UiDirectivesModule,
    NgxMaskDirective, NgxMaskPipe,
    MatRippleModule,
    HttpModule,
    ComponentsModule
  ],
  bootstrap: [AppComponent],
  providers: [provideNgxMask()]
})
export class AppModule { }
