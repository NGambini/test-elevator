import {NotifType} from "../enum/notif-type";

export interface INotification {
    id: number;
    type: NotifType;
    message: string;
    seeMore: string;
    timeOut: number;
    enableAutoClose: boolean;

}
