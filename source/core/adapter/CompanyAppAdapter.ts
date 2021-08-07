import CompanyApp from '../entity/CompanyApp';

export default class CompanyAppAdapter {
	static create (name: string, domain: string, token: string) {
		return new CompanyApp(
			name,
			domain,
			token
		);
	}
}
