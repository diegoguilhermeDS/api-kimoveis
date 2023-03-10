import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../errors";
import { iRealEstateRepository } from "../../interfaces/realEstate.interfaces";
import { iScheduleRepository, iScheduleRequest } from "../../interfaces/schedule.interfaces";
import { iUserRepository } from "../../interfaces/users.interfaces";

const createScheduleService = async (scheduleData: iScheduleRequest, userId: number): Promise<string> => {

    const scheduleRepository: iScheduleRepository = AppDataSource.getRepository(Schedule)
    const userRepository: iUserRepository = AppDataSource.getRepository(User)
    const realEstateRepository: iRealEstateRepository = AppDataSource.getRepository(RealEstate)

    const realEstate = await realEstateRepository.findOneBy({id: scheduleData.realEstateId})
    const user = await userRepository.findOneBy({id: userId})
    
    if(!realEstate){
        throw new AppError("RealEstate not found", 404)
    }

    const schedule = scheduleRepository.create({
        date: scheduleData.date,
        hour: scheduleData.hour,
        user: user!,
        realEstate: realEstate!
    })

    await scheduleRepository.save(schedule)

    return "Schedule created"
}

export default createScheduleService