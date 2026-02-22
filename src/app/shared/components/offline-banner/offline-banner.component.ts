import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NetworkService } from '../../../core/services/network.service';

@Component({
  selector: 'app-offline-banner',
  imports: [CommonModule],
  templateUrl: './offline-banner.component.html',
  styleUrl: './offline-banner.component.css'
})
export class OfflineBannerComponent {

  constructor(public network: NetworkService) {}
}
