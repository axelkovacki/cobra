import BlackList from '../../entity/BlackList';

export default interface IBlackListRepository {
    insert(ip: string): Promise<void>;
    hasIn(ip: string): Promise<boolean>;
}
