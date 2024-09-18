import { RouterModule, Routes, Router } from "@angular/router";
import { NgModule, ModuleWithProviders, Type } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MemberComponent } from "./member/member.component";

export const appRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'member', component: MemberComponent },
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
