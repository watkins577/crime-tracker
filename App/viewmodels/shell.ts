import m_router = require('plugins/router');
import m_logger = require('services/logger');
import m_system = require('durandal/system');

class Shell {
    public router = m_router;

    public activate() {
        return this.boot();
    }

    public boot() {
        this.log('Hot Towel SPA Loaded!', null, true);

        this.router.on('router:route:not-found', function (fragment) {
            this.logError('No Route Found', fragment, true);
        });

        var routes = [
            { route: '', moduleId: 'home', title: 'Home', nav: 1 },
            { route: 'details', moduleId: 'details', title: 'Details', nav: 2 }];

        return this.router.makeRelative({ moduleId: 'viewmodels' }) // router will look here for viewmodels by convention
            .map(routes)            // Map the routes
            .buildNavigationModel() // Finds all nav routes and readies them
            .activate();   
    }

    public log(msg, data, showToast) {
        m_logger.logger.log(msg, data, m_system.getModuleId(Shell), showToast);
    }

    public logError(msg, data, showToast) {
        m_logger.logger.logError(msg, data, m_system.getModuleId(Shell), showToast);
    }
}

export = Shell;