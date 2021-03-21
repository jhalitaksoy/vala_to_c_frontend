const initialvalacode = `void main (string[] args) {
    stdout.printf ("Hello world!");
}`

export class Store {
    static getValaCode() {
        return initialvalacode
    }
}