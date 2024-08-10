import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { GoalRepository } from "./infrastructure/goal.repository";
import { CreateGoalDTO } from "./interface/dto/create-goal-dto";

@Injectable()
export class GoalService {
    constructor(
        private readonly goalRepository: GoalRepository,
        private readonly userService: UserService
    ){}

    async create(userId: number, categoryId: number, goal: CreateGoalDTO) {
        await this.userService.findOneById(userId);
        return await this.goalRepository.create({...goal, userId, categoryId});
    }

    async findAll(userId: number) {
        return await this.goalRepository.find({userId}, {category: true});
    }
}