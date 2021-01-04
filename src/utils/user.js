import UserHttpServices from '../http-services/user.service';

class User {
    accountExists(id) {
        return UserHttpServices.getUser(id);
    }
}

export default new User();