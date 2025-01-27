import ParkingLot from '../entities/parkingLot/parkingLot.entity';
import { UserType } from '../interfaces/user.interface';

interface ValidationResult {
    isValid: boolean;
    message: string;
}

interface CheckInHandler {
    validate(userType: string, parkingLot: ParkingLot): ValidationResult;
}

class PublicCheckInHandler implements CheckInHandler {
    validate(userType: string, parkingLot: ParkingLot): ValidationResult {
        return {
            isValid: true,
            message: `Para este tipo de estacionamiento: ${parkingLot.parkingType} no hay validaciones. Cualquier persona puede entrar.`
        };
    }
}

class PrivateCheckInHandler implements CheckInHandler {
    validate(userType: string, parkingLot: ParkingLot): ValidationResult {
        const weekday = this.weekday();
        const isValid = userType === UserType.CORPORATE && weekday;
      
        
        return {
            isValid,
            message: `Para este tipo de estacionamiento ${parkingLot.parkingType}, solo los usuarios con tipo corporate pueden ingresar y este tipo de estacionamiento solo puede ser usado en días hábiles (lunes a viernes)`
        };
    }

    private weekday(): boolean {
        const today = new Date().getDay();
        return today >= 1 && today <= 5;
    }
    
}

class CourtesyCheckInHandler implements CheckInHandler {
    validate(userType: string, parkingLot: ParkingLot): ValidationResult {
        const weekend = this.weekend();
        const isValid = userType === UserType.VISITOR && weekend;
        
        return {
            isValid,
            message: `Para este tipo: ${parkingLot.parkingType}, solo están permitidos los tipo visitor y solo está habilitado para los fines de semana.`
        };
    }

    private weekend(): boolean {
        const today = new Date().getDay();
        return today === 0 || today === 6;
    }
}

export class CheckInFactory {
    static getHandler(parkingLotType: string): CheckInHandler {
        switch (parkingLotType) {
            case 'public': return new PublicCheckInHandler();
            case 'private': return new PrivateCheckInHandler();
            case 'courtesy': return new CourtesyCheckInHandler();
            default: throw new Error("Unknown parking lot type");
        }
    }
}