import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about').then((m) => m.AboutComponent),
  },
  {
    path: 'speaking',
    loadComponent: () => import('./speaking/speaking').then((m) => m.SpeakingComponent),
  },
  {
    path: 'speaking/:topicSlug',
    loadComponent: () => import('./speaking/topic-detail').then((m) => m.TopicDetailComponent),
  },
  {
    path: 'media',
    loadComponent: () => import('./media/media').then((m) => m.MediaComponent),
  },
  {
    path: 'invite',
    loadComponent: () => import('./invite/invite').then((m) => m.InviteComponent),
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact').then((m) => m.ContactComponent),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./privacy-policy/privacy-policy').then((m) => m.PrivacyPolicyComponent),
  },
  { path: '**', redirectTo: '' },
];
