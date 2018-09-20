import { API } from '../../../utilities/APIConfig';

export const getEventsToServer = (id, startDate, endDate) => API.get(`artists/${id}/events/${startDate}/${endDate}/`).then(response => response.data);
