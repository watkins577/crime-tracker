interface ICountry {
    id: string;
    name: KnockoutObservable<string>;
    toolTip: KnockoutObservable<string>;
}

export = ICountry;