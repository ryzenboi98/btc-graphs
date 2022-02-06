import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DateOrder } from './constants/date-order.enum';
import { StatsLimits } from './constants/stats-limits.enum';
import { TimeIntervalResolution } from './constants/time-interval-resolution.enum';
import { FetchCryptoStatsDTO } from './dtos/fetch-crypto-stats.dto';
import { CryptoService } from './services/crypto.service';
import { Crypto } from './types/crypto.type';
import { SVMR } from './types/svmr.type';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss'],
})
export class CryptoComponent implements OnInit {
  private _statsLimits: StatsLimits;
  private _timeIntervalResolution: TimeIntervalResolution;
  private _dateOrder: DateOrder;

  private _cryptoStats: Array<object>;
  private _svmrStats: Array<object>;

  constructor(
    private readonly _cryptoService: CryptoService,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {
    this._statsLimits = StatsLimits.MIN_LIMIT;
    this._timeIntervalResolution = TimeIntervalResolution.DAY;
    this._dateOrder = DateOrder.DESC;
    this._cryptoStats = [];
    this._svmrStats = [];
  }

  ngOnInit(): void {
    this._initializeCryptoStats();
    this._initializeSVMRStats();
  }

  public get cryptoStats(): Array<object> {
    return this._cryptoStats;
  }

  public get svmrStats(): Array<object> {
    return this._svmrStats;
  }


  private _initializeCryptoStats(): void {
    const fetchCryptoStatsDTO: FetchCryptoStatsDTO = {
      date_order: this._dateOrder,
      bucket: this._timeIntervalResolution,
      limit: this._statsLimits,
    };

    this._cryptoService
      ._fetchCryptoStats(fetchCryptoStatsDTO)
      .subscribe((data: Crypto) => {
        const { items } = data;
        const stats = [];
        
        for (const item of items) {
          stats.push(item);
        }

        this._cryptoStats = items;

        this._changeDetectorRef.detectChanges();
      });
  }

  private _initializeSVMRStats(): void {
    this._cryptoService._fetchSVMRStats()
    .subscribe((data: SVMR) => {
      const { items } = data;
      const stats = [];
      
      for (const item of items) {
        stats.push(item);
      }

      this._svmrStats = items;

      this._changeDetectorRef.detectChanges();
    });
  }

  public updateTimeIntervalResolutionByWeek(): void {
    this._timeIntervalResolution = TimeIntervalResolution.WEEK;
    this._dateOrder = DateOrder.ASC;

    this._initializeCryptoStats();

    this._changeDetectorRef.detectChanges();
    this._changeDetectorRef.markForCheck();
  }

  public updateTimeIntervalResolutionByDay(): void {
    this._timeIntervalResolution = TimeIntervalResolution.MONTH;
    this._dateOrder = DateOrder.ASC;

    this._initializeCryptoStats();

    this._changeDetectorRef.detectChanges();
    this._changeDetectorRef.markForCheck();
  }

  public updateTimeIntervalResolutionByYear(): void {
    this._timeIntervalResolution = TimeIntervalResolution.YEAR;
    this._dateOrder = DateOrder.ASC;

    this._initializeCryptoStats();

    this._changeDetectorRef.detectChanges();
    this._changeDetectorRef.markForCheck();
  }
}
