import {NoticeTypeDto} from "./noticeTypeDto.ts";

export interface NoticeDto {
    id: string;
    start: string; // ISODateString
    end: string;   // ISODateString
    type: NoticeTypeDto;
    message: string;
}