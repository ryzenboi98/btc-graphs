import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DateOrder } from './constants/date-order.enum';
import { StatsLimits } from './constants/stats-limits.enum';
import { TimeIntervalResolution } from './constants/time-interval-resolution.enum';
import { FetchCryptoStatsDTO } from './dtos/fetch-crypto-stats.dto';
import { CryptoService } from './services/crypto.service';
import { CryptoGraphStats } from './types/crypto-graph-stats.type';
import { Crypto } from './types/crypto.type';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss'],
})
export class CryptoComponent implements OnInit {
  private _statsLimits: StatsLimits;
  private _timeIntervalResolution: TimeIntervalResolution;
  private _dateOrder: DateOrder;

  private _cryptoStats: Array<CryptoGraphStats>;

  constructor(
    private readonly _cryptoService: CryptoService,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {
    this._statsLimits = StatsLimits.MEDIUM_LIMIT;
    this._timeIntervalResolution = TimeIntervalResolution.DAY;
    this._dateOrder = DateOrder.DESC;
    this._cryptoStats = [];
  }

  ngOnInit(): void {
    this._initializeCryptoStats();
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
        console.log(data);
        const { items } = data;

        for (const item of items) {
          this._cryptoStats.push({
            lower: item.lower,
            higher: item.higher,
            avgClose: item.avg_close!,
          });
        }
      });
  }

  public updateTimeIntervalResolutionByWeek(): void {
    this._timeIntervalResolution = TimeIntervalResolution.WEEK;

    this._initializeCryptoStats();

    this._changeDetectorRef.detectChanges();
    this._changeDetectorRef.markForCheck();
  }

  public updateTimeIntervalResolutionByDay(): void {
    this._timeIntervalResolution = TimeIntervalResolution.MONTH;

    this._initializeCryptoStats();

    this._changeDetectorRef.detectChanges();
    this._changeDetectorRef.markForCheck();
  }

  public updateTimeIntervalResolutionByYear(): void {
    this._timeIntervalResolution = TimeIntervalResolution.YEAR;

    this._initializeCryptoStats();

    this._changeDetectorRef.detectChanges();
    this._changeDetectorRef.markForCheck();
  }
}
