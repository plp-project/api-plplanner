import { GoalEntity } from 'src/modules/goal/infrastructure/model';
import { TaskEntity } from 'src/modules/task/infrastructure/model';
import { CategoriesReportInfoDTO } from './categories-report.dto';

export class EntityReportInfoDTO {
  percentage: number;
  categories: { mostFinished: CategoriesReportInfoDTO[] };
}

export class TasksReportInfoDTO extends EntityReportInfoDTO {
  all: TaskEntity[];
  finished: TaskEntity[];
}

export class GoalsReportInfoDTO extends EntityReportInfoDTO {
  all: GoalEntity[];
  finished: GoalEntity[];
}
