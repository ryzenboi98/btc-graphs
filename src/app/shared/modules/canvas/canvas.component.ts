import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { CanvasChartOptions } from './types/canvas-chart-options.type';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  @ViewChild('chartCanvas', { static: true }) canvasElement!: ElementRef;

  @Input() canvasChartOptions!: CanvasChartOptions;
  @Input() set canvasProps(props: Array<object>) {
    if (props !== undefined && props.length > 0) {
      this._cleanChart();
      this._updateChart(props);
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
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
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

  private _updateChart(series: Array<object>): void {
    var labels = [];

    for (var serie of series.values())
      labels.push((serie as any)['timestamp'])

    var close_values = []

    for (var serie of series.values())
      close_values.push((serie as any)['close'])

    if (close_values[0] == null) {
      close_values = []
      for (var serie of series.values())
        close_values.push((serie as any)['avg_close'])
    } else {
      labels = labels.reverse()
      close_values = close_values.reverse()
    }

    this._canvasChart.data.labels = labels
    this._canvasChart.data.datasets = [
      {
        label: 'Average',
        data: close_values,
      },
    ];

    this._canvasChart.update('resize');
  }
}
