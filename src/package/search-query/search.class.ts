type optionsType = {
    label:string,
    value:string
}
export class queryItem {
    label: string;  //筛选项label
    value: string|[];  //筛选项绑定参数
    type: string;  //筛选项类型（input、select、datePicker）
    options?:Array<optionsType>;  //筛选项为select，选项数组
    multiple?:Boolean;  //筛选项为select，配置是否可多选
    filterable?:Boolean;  //筛选项为select，配置是否可过滤
    datePickerType?:string|[];  //筛选项为datePicker，类型（year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange）
    emitPath?:Boolean;  //筛选项为cascader，级联只返回该节点的值
    props?:{} // props
    field: string // json字段名
    constructor(
        label: string = "",
        value: string|[],
        type: string = "",
        options?: Array<optionsType>,
        multiple?:Boolean,
        filterable?:Boolean,
        datePickerType?:string|[],
        emitPath?:Boolean,
        props?:{},
        field: string = "",
    ) {
        this.label = label;
        this.value = value;
        this.type = type;
        this.options = options;
        this.multiple = multiple;
        this.filterable = filterable;
        this.datePickerType = datePickerType;
        this.emitPath = emitPath;
        this.props = props;
        this.field = field;
    }
}

export interface heightContentType {
    queryHeight: number|string,
    queryRow: any,
    rowHeight: number,
    showHiddenBtn: boolean,
    tableHeight: any,
    sum: number
}
  