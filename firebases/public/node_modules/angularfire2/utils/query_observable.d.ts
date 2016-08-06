import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/combineLatest';
export interface Query {
    [key: string]: any;
    orderByKey?: boolean | Observable<boolean>;
    orderByPriority?: boolean | Observable<boolean>;
    orderByChild?: string | Observable<string>;
    orderByValue?: boolean | Observable<boolean>;
    equalTo?: any | Observable<any>;
    startAt?: any | Observable<any>;
    endAt?: any | Observable<any>;
    limitToFirst?: number | Observable<number>;
    limitToLast?: number | Observable<number>;
}
export interface ScalarQuery {
    [key: string]: any;
    orderByKey?: boolean;
    orderByPriority?: boolean;
    orderByChild?: string;
    orderByValue?: boolean;
    equalTo?: any;
    startAt?: any;
    endAt?: any;
    limitToFirst?: number;
    limitToLast?: number;
}
export declare enum OrderByOptions {
    Child = 0,
    Key = 1,
    Value = 2,
    Priority = 3,
}
export declare enum LimitToOptions {
    First = 0,
    Last = 1,
}
export declare enum QueryOptions {
    EqualTo = 0,
    StartAt = 1,
    EndAt = 2,
}
export interface OrderBySelection {
    key: OrderByOptions;
    value: boolean | string;
}
export interface LimitToSelection {
    key: LimitToOptions;
    value: number;
}
export declare type Primitive = number | string | boolean;
export declare function observeQuery(query: Query): Observable<ScalarQuery>;
export declare function getOrderObservables(query: Query): Observable<OrderBySelection> | Observable<OrderBySelection | Observable<OrderBySelection>>;
export declare function getLimitToObservables(query: Query): Observable<LimitToSelection> | Observable<LimitToSelection | Observable<LimitToSelection>>;
export declare function getStartAtObservable(query: Query): Observable<Primitive>;
export declare function getEndAtObservable(query: Query): Observable<Primitive>;
export declare function getEqualToObservable(query: Query): Observable<Primitive>;
