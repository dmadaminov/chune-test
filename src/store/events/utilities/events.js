import { API } from '../../../utilities/APIConfig';

export const getEventsToServer = (id, startDate, endDate) => API.get(`artists/${id}/events/${startDate}/${endDate}/`).then(response => response.data);
export const getPositionUser = () => new Promise((resolve) => {
  navigator.geolocation.getCurrentPosition(pos => resolve(pos.coords), () => resolve({ latitude: 0, longitude: 0 }));
});
