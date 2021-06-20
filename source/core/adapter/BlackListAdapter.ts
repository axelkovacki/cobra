import BlackList from '../entity/BlackList';

export default class ParkingLotAdapter {
	static create (ip: string) {
		return new BlackList(ip);
	}
}
