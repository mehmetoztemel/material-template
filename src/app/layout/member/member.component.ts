import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberComponent implements OnInit {
  ngOnInit(): void {
  }
}
