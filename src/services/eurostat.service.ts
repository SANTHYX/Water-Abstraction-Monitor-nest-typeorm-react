import { Injectable, NotFoundException } from '@nestjs/common';
import { GetCurrentEurostatData } from 'src/dto/eurostat/get.current.eurostat.data';
import { GetAnyEurostatData } from 'src/dto/eurostat/get.eurostat.subtraction';
import { EurostatResponse } from 'src/models/responses/eurostat.response.model';
import { fetchData } from 'src/plugins/axios';
import { IEurostatService } from './interfaces/eurostat.service.interface';

@Injectable()
export class EurostatService implements IEurostatService {
  async FetchCurrentEurostatData(
    getDTO: GetCurrentEurostatData,
  ): Promise<EurostatResponse> {
    try {
      const data = await fetchData(2018, getDTO.nationality);
      const model: EurostatResponse = {
        currentAvgSubtractionPerCapita: data,
        year: 2018,
      };

      return model;
    } catch (err) {
      throw new NotFoundException('Data not found');
    }
  }

  async FetchAnyEurostatData(
    getDTO: GetAnyEurostatData,
  ): Promise<EurostatResponse> {
    try {
      const data = await fetchData(getDTO.year, getDTO.nationality);
      const model: EurostatResponse = {
        currentAvgSubtractionPerCapita: data,
        year: getDTO.year,
      };

      return model;
    } catch (err) {
      throw new NotFoundException('Data not found');
    }
  }
}
