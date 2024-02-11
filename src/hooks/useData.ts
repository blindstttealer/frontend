import {format, formatDistanceToNowStrict} from "date-fns";
import {ru} from "date-fns/locale";

export const useData = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = format(date, 'dd.MM.yyyy');
    const timeAgo = formatDistanceToNowStrict(date, {locale: ru, addSuffix: true});

    return {formattedDate, timeAgo};
}