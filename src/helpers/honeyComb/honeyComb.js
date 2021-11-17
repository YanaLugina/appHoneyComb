import { httpBuildQuery } from './../httpBuildQuery';

export default class HoneyComb {
    constructor({ apiUrl, getResource }) {
        this._apiUrl = apiUrl;
        this._getResource = getResource;
        this.vars = {};
        console.log('create new class HoneyComb', apiUrl, getResource);
    }

    getVariable = async (nameVar, defaultValue = undefined, isGetFromRemote = false) => {
        const arrKeys = Object.keys(this.vars);
        if (isGetFromRemote) {
            if (this.vars && arrKeys.length > 0 && arrKeys.includes(nameVar)) {
                const { url, method, data, params, fileUpload, pointBase, transformBefore, transformAfter } = (this.vars[nameVar].takeFromRemote || {});
                const resultGet = await this._getResult(url, method, data, params, fileUpload, pointBase, transformBefore, transformAfter);
                this.vars[nameVar].value = await resultGet;

                console.log('await resultGet', resultGet);
                return resultGet;
            } else {
                return new Error('Error: this variable not exist');
            }
        } else {
            if (this.vars && arrKeys.length > 0 && arrKeys.includes(nameVar)) {
                return this.vars[nameVar].value;
            }
            return defaultValue;
        }
    }

    setVariable(nameVar, value, defaultValue) {
        if ((typeof nameVar === 'string') && (nameVar.length > 1) && !Object.keys(this.vars).includes(nameVar)) {
            /// if new variable
            if (typeof value === 'function') {
                if (!defaultValue) {
                    console.log('Error: function not allow');
                    return new Error('Error: function second param not allow if not exist and without default value');
                }
                this.vars = {...this.vars, [nameVar]: { value: defaultValue }};
            } else {
                this.vars = {...this.vars, [nameVar]: { value: value }};
            }

            return this.vars[nameVar].value;

        } else if (Object.keys(this.vars).includes(nameVar)) {
            // if exist variable

            if (typeof value === 'function') {
                if ((this.vars[nameVar].value === null || this.vars[nameVar].value === undefined) && defaultValue) {
                    this.vars[nameVar].value = defaultValue;
                } else {
                    // may be error
                    this.vars[nameVar].value = value(this.vars[nameVar].value);
                }
            } else {
                this.vars[nameVar].value = value;
            }

            this.vars[nameVar] = { ...this.vars[nameVar] };
            this.vars = { ...this.vars };
            return this.vars[nameVar].value;

        } else {
            // if name not a string or name.length < 2
            console.log('Error: little name or not a string or it exist');
            return new Error('Error: little name or not a string or it exist');
        }
    }

    _getResult = async(url, method, data, params, fileUpload, pointBase, transformBefore, transformAfter) => {
        const res = await this._getResource(url + (params ? `?${httpBuildQuery(params)}` : ''), method, (data ? { body: JSON.stringify(transformBefore ? transformBefore(data) : data) } : {}), fileUpload, pointBase);
        return transformAfter ? transformAfter(res) : res;
    };

    setVariableDefinition = (nameVar, defaultValue, get) => {
        // const resultGet = await this._getResult(get.url, get.method, get.data, get.params, get.fileUpload, get.pointBase, get.transformBefore, get.transformAfter);
        // console.log('await resultGet', resultGet);

        if ((typeof nameVar === 'string') && (nameVar.length > 1) && !Object.keys(this.vars).includes(nameVar)) {
            /// if new variable
            this.vars = {...this.vars, [nameVar]: { value: defaultValue, takeFromRemote: get }};
        } else if (Object.keys(this.vars).includes(nameVar)) {
            // if exist variable
            this.vars[nameVar].takeFromRemote = get;
        } else {
            // if name not a string or name.length < 2
            return new Error('Error: little name or not a string or it exist');
        }
    }
}
