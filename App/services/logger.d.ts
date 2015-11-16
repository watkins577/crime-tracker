/// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
export declare class loggerClass {
    log(message: string, data: Object, source: string, showToast: boolean): void;
    logError(message: string, data: Object, source: string, showToast: boolean): void;
    private logIt(message, data, source, showToast, toastType);
}
export declare var logger: loggerClass;
