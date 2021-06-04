import Moment from "moment";

export const HTTP_PROTOCOL          = 'http';

export function format_Date1( date )
{
    return Moment( date ).format('YYYY-MM-DD HH:mm:SS');
}