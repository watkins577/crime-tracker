/// <reference path="../../Scripts/typings/bootstrap/bootstrap.d.ts" />

import m_logger = require('services/logger');
import m_system = require('durandal/system');
import ICountry = require('interfaces/ICountry');

class DetailsView {
    public title: KnockoutObservable<string> = ko.observable('');
    public countries: KnockoutObservableArray<ICountry> = ko.observableArray<ICountry>();
    public compTitle: KnockoutComputed<string>;

    constructor() {
        this.compTitle = ko.computed(function () {
            return this.title() + ' (computed)';
        }, this);
    }

    public clickUpdateTitle(newTitle: string) {
        this.title(newTitle);
    }

    public activateToolTips() {
        $('.toolTip').tooltip();
    }

    public activate() {
        this.title('My title');
        m_logger.logger.log('Details View Activated', null, 'details', true);
        if (this.countries().length == 0) {
            this.countries.push({ id: 'IS', name: ko.observable('Iceland'), toolTip: ko.observable('Land of ice and fire') });
            this.countries.push({ id: 'GB', name: ko.observable('Great Britain'), toolTip: ko.observable('Home of Soccer') });
            this.countries.push({ id: 'US', name: ko.observable('United states'), toolTip: ko.observable('Hmm?') });
        }
        this.activateToolTips();
        return true;
    }

    public viewAttached(view) {
        this.activateToolTips();
    }
}

export = DetailsView;