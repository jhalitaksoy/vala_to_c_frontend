export class EditorUtil {
    static getOptionsVala = (valacode) => {
        return {
            mode: 'text/x-csrc',
            lineNumbers: true,
            value: valacode,
            viewportMargin: 0,
        };
    };
    static getOptionsC = (c_code) => {
        return {
            mode: 'text/x-csrc',
            lineNumbers: true,
            value: c_code,
            readOnly: true,
        };
    };

    static getOptionsOutput = (output) => {
        return {
            lineNumbers: true,
            value: output,
            readOnly: true,
        };
    };
}
