import * as _ from 'lodash';

function remakeJsonFormat(data) {
    let target = [];
    if (_.isArray(data)) {
        //数组

        data.forEach((item, index) => {
            if (_.isArray(item)) {
                target.push({
                    prop: index,
                    value: item,
                    isArray: true
                });
            } else {
                target.push({
                    prop: index,
                    value: item,
                    isArray: false
                });
            }


        });
    } else if (_.isPlainObject(data)) {
        //对象
        Object.keys(data).forEach(item => {
            if (_.isPlainObject(data[item])) {
                target.push({
                    prop: item,
                    value: remakeJsonFormat(data[item]),
                    isArray: false
                });

            } else if (_.isArray(data[item])) {
                target.push({
                    prop: item,
                    value: remakeJsonFormat(data[item]),
                    isArray: true
                });
            } else {
                target.push({
                    prop: item,
                    value: data[item],
                });
            }
        });
    } else {
        //原始数组中嵌套数组，并且这个数组中子元素不全是对象，也有比如string类型的话应该在这处理，主要是个prop的命名问题
        target.push({
            value: data
        });
    }

    return target;
}

function flatData(result: Array<any>, data, prop?: string) {

    for (let i = 0; i < data.length; i++) {
        if (data[i].isArray) {
            let t = [];

            data[i].value.forEach(item => {
                t.push(item.value);
            });
            result.push({
                prop: `${data[i].prop}`,
                value: JSON.stringify(t)
            });
        } else {
            if (_.isArray(data[i])) {
                //data的子元素为数组时候

                flatData(result, data[i], `${prop}`);


            } else {
                //data的子元素为对象时候,经过处理之后只有这两种情况
                if (_.isArray(data[i].value)) {
                    if (prop) {
                        flatData(result, data[i].value, `${prop}.${data[i].prop}`);
                    } else {
                        flatData(result, data[i].value, `${data[i].prop}`);
                    }
                } else {
                    if (prop) {
                        result.push({
                            prop: `${prop}.${data[i].prop}`,
                            value: data[i].value
                        });
                    } else {
                        result.push({
                            prop: `${data[i].prop}`,
                            value: data[i].value
                        });
                    }

                }
            }
        }

    }
}


export function JsonToFormdata(data) {
    let target = new FormData();

    let myarr = [];
    let t = remakeJsonFormat(data);

    flatData(myarr, t);


    myarr.forEach(item => {
        target.append(item.prop, item.value);
    });

    return target;
}
