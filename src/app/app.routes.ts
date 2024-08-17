import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ImprintComponent } from './imprint/imprint.component';
import { DraqdropComponent } from './draqdrop/draqdrop.component';
import { ScheduleComponent } from './schedule/schedule.component';

export const routes: Routes = [
    {path: "" , component: DashboardComponent},
    {path: "dashboard" , component: DashboardComponent},
    {path: "user", component: UserComponent},
    {path: "schedule", component: ScheduleComponent},
    {path: "imprint", component: ImprintComponent},
    {path: "trainer", component: DraqdropComponent},
    {path: "user/:id", component: UserDetailComponent},
];
