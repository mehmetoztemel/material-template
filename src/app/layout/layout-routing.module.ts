import { RouterModule, Routes, Router } from "@angular/router";
import { NgModule, ModuleWithProviders, Type } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PersonComponent } from "./person/person.component";

export const appRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'person', component: PersonComponent },
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)],
    exports: [
        RouterModule
    ]
})
export class LayoutRoutingModule {
}
