import {Competition} from './competition.model';

export interface IHeadline {
  id?: string;
  title: string;
  text: string;
  schrijver: string;
  createdDate?: Date;
  updatedDate?: Date;
  isActive: boolean;
  competition: Competition;
}

