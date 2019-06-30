import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule'
    },
    {
        path: 'prediction',
        loadChildren: './predictions_tab/predictions_tab.module#PredictionsTabModule',
        canActivate: [AuthGuard]
    },
  { path: 'matches', loadChildren: './predictions_tab/matches/matches.module#MatchesPageModule' },
  { path: 'team', loadChildren: './predictions_tab/team/team.module#TeamPageModule' },
  { path: 'questions', loadChildren: './predictions_tab/questions/questions.module#QuestionsPageModule' },
  { path: 'addplayer', loadChildren: './predictions_tab/team/addplayer/addplayer.module#AddplayerPageModule' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
