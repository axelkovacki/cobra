import BlackListFilter from './BlackListFilter';
import BlackListRepositoryMongoDB from '../../repository/blacklist/BlackListRepositoryMongoDB';


let contactsRepository: InMemoryContactsRepository
let blackListFilter: BlackListFilter

describe('Check black list filter', () => {
    beforeEach(() => {
        contactsRepository = new InMemoryContactsRepository()
        blackListFilter = new BlackListFilter(contactsRepository)
    });

    expect(2 + 2).toBe(4);
});