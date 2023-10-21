import classnames from "classnames";
import Parser from "html-react-parser";
import {ChangeEvent, FC, useState} from "react";

enum Colors {
    red = "red",
    green = "green",
    blue = "blue",
}

enum Types {
    string = "text",
    numeric = "number",
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

/**
 * ParamEditor is a component for Viewing and Updating Model
 * @returns {JSX.Element}
 * @constructor
 */
const ParamEditor: FC = () => {
    /**
     * Method for pretty json displaying
     * @param {Object} json
     * @returns {ReturnType<typeof object>}
     */
    const getPrettyJson = (json: object) => {
        return Parser(
            JSON.stringify(json, null, 4)
                .replace(/\n/g, "<br/>")
                .replace(/ /g, "&nbsp;"),
        );
    };

    const params: Param[] = [
        {
            id: 1,
            name: "Назначение",
            type: Types.string,
        },
        {
            id: 2,
            name: "Длина",
            type: Types.string,
        },
    ];

    const [paramValues, setParamValues] = useState<ParamValue[]>([
        {
            paramId: 1,
            value: "повседневное",
        },
        {
            paramId: 2,
            value: "макси",
        },
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
    ];

    const model: Model = {
        paramValues,
        paramColors,
    };

    /**
     * Get model method
     * @returns {Model}
     */
    const getModel = (): Model => {
        return model;
    };

    /**
     * Get param method
     * @returns {Param[]}
     */
    const getParams = (): Param[] => {
        return params;
    };

    /**
     * Method to find ParamValue from Param
     * @param {Param} param
     * @returns {string}
     */
    const getParamValue = (param: Param): string | undefined => {
        return (paramValues?.find((paramValue: ParamValue): boolean => {
            return paramValue.paramId === param.id;
        }))?.value;
    };

    /**
     * Method to find ParamColor from Param
     * @param {Param} param
     * @returns {Colors}
     */
    const getParamColor = (param: Param) => {
        return (paramColors?.find((paramColor: ParamColor): boolean => {
            return paramColor.paramId === param?.id;
        }))?.color;
    };

    /**
     * Method for ParamValue updating
     * @param event
     * @param {Param} param
     */
    const updateParamValue = (event: ChangeEvent<HTMLInputElement>, param: Param): void => {
        paramValues!.find((paramValue: ParamValue): boolean => {
            return paramValue.paramId === param.id;
        })!.value = event.target.value;

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
                            className={classnames("input", getParamColor(param))}
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