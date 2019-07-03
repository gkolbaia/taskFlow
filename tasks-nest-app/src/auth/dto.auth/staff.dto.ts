export class StaffDto {
    readonly userName: string;
    readonly email: string;
    readonly password: string;
    readonly role: string;
    readonly regiterDate: Date;
    readonly imagePath?: string;
}