import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './../material/material.module';
import { PoemListComponent } from './poem-list/poem-list.component';
import { PoemComponent } from './poem/poem.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MyPoemsComponent } from './my-poems/my-poems/my-poems.component';
import { AddPoemsDialogComponent } from './my-poems/my-poems/add-poems/add-poems-dialog.component';
import { PoemDialogComponent } from './poem/poem-dialog/poem-dialog.component';
import { PoemFilterPipe } from './poem-filter.pipe';
import { PoemFilterThemesPipe } from './poem-filter-themes.pipe';
import { PoemSortPipe } from './poem-sort.pipe';

@NgModule({
  imports: [HttpClientModule, CommonModule, MaterialModule, FontAwesomeModule],
  declarations: [
    PoemListComponent,
    PoemComponent,
    MyPoemsComponent,
    AddPoemsDialogComponent,
    PoemDialogComponent,
    PoemFilterPipe,
    PoemFilterThemesPipe,
    PoemSortPipe
  ]
})
export class PoemModule {}
