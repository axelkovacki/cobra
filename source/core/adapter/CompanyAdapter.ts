import Company from '../entity/Company';

export default class CompanyAdapter {
	static create (name: string, apps: Array<any>) {
		return new Company(
			name,
			apps
		);
	}
}
