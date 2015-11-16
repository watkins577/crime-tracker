import m_logger = require('services/logger');

class HomeView {
    title: string = 'Home View'; 

    public activate() {
        m_logger.logger.log('We are at home now', null, 'home', true);
        return true;
    }
}

export = HomeView;