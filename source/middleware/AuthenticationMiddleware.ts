import Authenticate from '../core/use-case/authenticate/Authenticate';
import CompanyAppRepositoryMongoDB from '../core/repository/company-app/CompanyAppRepositoryMongoDB';

export default class AuthenticationMiddleware {
    static async handle(req, res) {
        const { headers: { authorization } } = req;

        const companyAppRepository = new CompanyAppRepositoryMongoDB();

        const authenticate = new Authenticate(
            companyAppRepository
        );

        return await authenticate.execute(
            authorization
        );
    }
}
