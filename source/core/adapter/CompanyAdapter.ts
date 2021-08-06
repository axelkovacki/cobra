import Company from '../entity/Company';

export default class CompanyAdapter {
	static create (id: string, name: string, token: string) {
		return new Company(
			id,
			name,
			token
		);
	}
}
