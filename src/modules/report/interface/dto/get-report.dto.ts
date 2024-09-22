import {
  EntityReportInfoDTO,
  GoalsReportInfoDTO,
  TasksReportInfoDTO
} from './entity-report-dto';

interface MostProductive {
  weeks: { week: string; count: number }[];
  months: { month: string; count: number }[];
  shifts: { shift: string; count: number }[];
}

interface EntityReport extends EntityReportInfoDTO {
  all: number;
  finished: number;
}

export class GetReportDTO {
  initialDate: Date;
  finalDate: Date;
  goals: EntityReport;
  tasks: EntityReport;
  mostProductive: MostProductive;

  constructor(
    initialDate: Date,
    finalDate: Date,
    goals: GoalsReportInfoDTO,
    tasks: TasksReportInfoDTO,
    mostProductive: MostProductive
  ) {
    this.initialDate = initialDate;
    this.finalDate = finalDate;
    this.goals = {
      ...goals,
      all: goals.all.length,
      finished: goals.finished.length
    };
    this.tasks = {
      ...tasks,
      all: tasks.all.length,
      finished: tasks.finished.length
    };
    this.mostProductive = mostProductive;
  }
}
