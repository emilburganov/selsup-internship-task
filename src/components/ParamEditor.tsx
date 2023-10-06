import classnames from 'classnames';
import Parser from 'html-react-parser';
import {FC, useState} from 'react';

enum Colors {
    red = 'red',
    green = 'green',
    blue = 'blue',
}

enum Types {
    string = 'text',
    numeric = 'number',
}

interface ParamColor {
    paramId: number;
    color: string;
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[],
    paramColors: ParamColor[],
}

interface Param {
    id: number;
    name: string;
    type: string;
}

const ParamEditor: FC = () => {
    const getPrettyJson = (json) => {
        return Parser(
            JSON.stringify(json, null, 4)
                .replace(/\n/g, '<br/>')
                .replace(/ /g, '&nbsp;'),
        );
    };

    const params: Param[] = [
        {
            id: 1,
            name: 'Назначение',
            type: Types.string,
        },
        {
            id: 2,
            name: 'Длина',
            type: Types.string,
        },
        // {
        //     id: 3,
        //     name: 'Количество',
        //     type: Types.numeric,
        // },
    ];

    const [paramValues, setParamValues] = useState([
        {
            paramId: 1,
            value: 'повседневное',
        },
        {
            paramId: 2,
            value: 'макси',
        },
        // {
        //     paramId: 3,
        //     value: '10',
        // },
    ]);
    const paramColors = [
        {
            paramId: 1,
            color: Colors.blue,
        },
        {
            paramId: 2,
            color: Colors.red,
        },
        // {
        //     paramId: 3,
        //     color: Colors.green,
        // },
    ];


    const model: Model = {
        paramValues,
        paramColors,
    };

    const getModel = (): Model => {
        return model;
    };

    const getParams = (): Param[] => {
        return params;
    };

    const getParamValue = (param) => {
        return (paramValues.find((paramValue) => {
            return paramValue.paramId === param.id;
        })).value;
    };

    const getParamColor = (param) => {
        return (paramColors.find((paramColor) => {
            return paramColor.paramId === param.id;
        })).color;
    };

    const updateParamValue = (event, param) => {
        paramValues.find((paramValue) => {
            return paramValue.paramId === param.id;
        }).value = event.target.value;

        setParamValues([...paramValues]);
    };

    return (
        <div className="flex col g-20">
            <form className="card form">
                <h3>
                    Редактирование указанных моделей
                </h3>
                {params.map((param) =>
                    <div key={param.id} className="input-group">
                        <label>
                            {param.name}
                        </label>
                        <input
                            value={getParamValue(param)}
                            onChange={(event) => updateParamValue(event, param)}
                            className={classnames('input', getParamColor(param))}
                            type={param.type}
                        />
                    </div>,
                )}
            </form>
            <div className="card form">
                <h3>
                    Информация о параметрах и моделях
                </h3>
                <div>
                    <div className="list w-max">
                        <p className="list__title">Модели</p>
                        {getPrettyJson(getModel())}
                    </div>
                    <div className="list w-max">
                        <p className="list__title">Параметры</p>
                        {getPrettyJson(getParams())}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ParamEditor;