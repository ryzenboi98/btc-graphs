import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { CryptoGraphStats } from 'src/app/features/crypto/types/crypto-graph-stats.type';
import { CanvasChartOptions } from './types/canvas-chart-options.type';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  @ViewChild('chartCanvas', { static: true }) canvasElement!: ElementRef;

  @Input() canvasChartOptions!: CanvasChartOptions;
  @Input() set canvasProps(props: { updatedSeries: Array<CryptoGraphStats> }) {
    if (props !== undefined) {
      this._cleanChart();
      this._updateChart(props.updatedSeries);
    }
  }

  private _canvasChart!: Chart;
  private _canvasChartOptions!: any;

  constructor() {}

  ngOnInit(): void {
    this.canvasChartOptions = {};
    this._canvasChartOptions = this._initializeCanvasChartOptions();
    this._canvasChart = this._initializeCanvasChart();
  }

  private _cleanChart(): void {
    if (this._canvasChart) {
      this._canvasChart.data.datasets = [];
      this._canvasChart.data.labels = [];
      this._canvasChart.update('resize');
    }
  }

  private _initializeCanvasChartOptions() {
    return {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'My First dataset',
            data: [0, 10, 5, 2, 20, 30, 45],
          },
        ],
      },
      options: {},
    };
  }

  private _initializeCanvasChart(): Chart {
    return new Chart(
      this.canvasElement.nativeElement,
      this._canvasChartOptions
    );
  }

  private _updateChart(series: Array<CryptoGraphStats>): void {}
}
