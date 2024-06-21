import { Routes } from '@angular/router';
import { ViewerComponent } from './viewer/viewer.component';
import { CreatorComponent } from './creator/creator.component';

export const routes: Routes = [
    {
        path:'creator-component',
        component:CreatorComponent
    },
    {
        path:'viewer-component',
        component:ViewerComponent
    },
];
