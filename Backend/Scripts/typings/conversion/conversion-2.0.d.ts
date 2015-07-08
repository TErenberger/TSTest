
interface ConversionLib {
    rounding: KnockoutObservable<number>;
    system: KnockoutObservable<string>;
    updateRounding(figures: number): void;
    switchSystem(): void;
    getSystem(): string;
    round(value: number): number;
    computedResult(val: number, conversions: Array<Conversion>): number;
    functions: ConversionFunctions;
    registry: ConversionRegistry;
    helpers: ConversionHelpers;
}

interface ConversionFunctions {
    inchesToMillimeters(incomingValue: number): number;
}

interface ConversionRegistry {
    parent: ConversionLib;
    children: Array<RegistryEntry>;
    registerChild(value: KnockoutObservable<number>, conversions: Array<Conversion>): number;
    getChild(id: number): number;
    updateChild(id: number, value: number): void;
    getChildPure(id: number): number;
    convertChildren(): void;
    convertChild(val: number, conversions: Array<Conversion>): number;
    notifyChildren(): void;
}

interface ConversionHelpers {
    getValueComputed(el: Object, id: string): KnockoutComputed<number>;
    getPureValueComputed(el: Object, id: string): KnockoutComputed<number>;
    getRoundingComputed(vm: Object): KnockoutComputed<number>;
}

declare class RegistryEntry {
    conversions: Array<Conversion>;
    value: KnockoutObservable<number>;
}

declare class Conversion {
    toMet: Function;
    toImp: Function;
}

declare var convert : ConversionLib;