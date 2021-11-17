export const httpBuildQuery = (formdata, numericPrefix, argSeparator) => {
    let key;
    let useVal;
    let useKey;
    let i = 0;
    const tmpArr = [];

    if (!argSeparator) {
        argSeparator = '&';
    }
    for (key in formdata) {
        useKey = encodeURIComponent(key);
        useVal = Object.keys(formdata[key]).length > 0 ? formdata[key] : encodeURIComponent((formdata[key].toString()));
        if (useVal !== '') {
            if (Object.keys(useVal).length > 0) {
                if (numericPrefix && !isNaN(key)) {
                    useKey = numericPrefix + i;
                }
                for (const _key in useVal) {
                    tmpArr[i] = useKey + '[' + _key + ']=' + useVal[_key];
                    i++;
                }
            } else {
                if (numericPrefix && !isNaN(key)) {
                    useKey = numericPrefix + i;
                }
                tmpArr[i] = useKey + '=' + useVal;
                i++;
            }
        }
    }
    return tmpArr.join(argSeparator);
};
