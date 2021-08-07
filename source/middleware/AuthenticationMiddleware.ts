import Authenticate from '../core/use-case/authenticate/Authenticate';
import CompanyRepositoryMongoDB from '../core/repository/company/CompanyRepositoryMongoDB';

export default class AuthenticationMiddleware {
    static async handle(req, res) {
        const { headers: { Authorization } } = req;
        const companyRepository = new CompanyRepositoryMongoDB();

        const authenticate = new Authenticate(
            companyRepository
        );

        await authenticate.execute(
            Authorization
        );
    }
}
