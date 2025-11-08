import { Routes } from '@angular/router';
import { ListApprovisionnementsComponent } from './components/list-approvisionnements/list-approvisionnements.component';
import { CreateApprovisionnementsComponent } from './components/create-approvisionnements/create-approvisionnements.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/approvisionnements',
    pathMatch: 'full'
  },
  {
    path: 'approvisionnements',
    component: ListApprovisionnementsComponent
  },
  {
    path: 'approvisionnements/nouveau',
    component: CreateApprovisionnementsComponent
  }
];