class MyPromise {
    constructor(fn) {
        this.successList = [];
        this.failList = [];
        this.state = 'pending';
        fn(this.resolveFn.bind(this), this.rejectFn.bind(this));
    }
    then(successFn, failFn) {
        if (typeof successFn == 'function') {
            this.successList.push(successFn);
        }
        if (typeof rejectFn == 'function') {
            this.failList.push(failFn);
        }
    }
    catch (failFn) {
        if (typeof rejectFn == 'function') {
            this.failList.push(failFn);
        }
    }
    recolveFn(res) {
        this.state = 'fullfilled';
        this.successList.forEach(function(item, index) {
            item(res)
        })
    }
    rejectFn(res) {
        this.state = 'rejected';
        this.failList.forEach(function(item, index) {
            item(res);
        })
        throw Error(res);
    }
}