"use strict";
function ViewModel() {
    this.title = 'conversion testing';
    this.rounding = convert.helpers.getRoundingComputed(this);
    return this;
}



function ElementInput(label, unitM, unitI, observable, conversions) {
    this.label = label;
    this.unitM = unitM;
    this.unitI = unitI;
    this.unit = ko.computed(function () {
        return convert.system() === 'metric' ? this.unitM : this.unitI;
    }, this);
    this.conversionID = convert.registry.registerChild(observable, conversions);
    this.value = convert.helpers.getValueComputed(this, 'conversionID');
    this.pureValue = convert.helpers.getPureValueComputed(this, 'conversionID');
    this.conversions = conversions;
}

var vm = new ViewModel();


var weightConv = [new Conversion('poundsToKilograms', 'kilogramsToPounds')];
var lengthConv = [new Conversion('millimetersToInches', 'inchesToMillimeters')];
var specConv = [new Conversion('millimetersToInches', 'inchesToMillimeters'), new Conversion('poundsToKilograms', 'kilogramsToPounds')];
var force = [new Conversion('forceOnEarth', 'forceOnEarth')];

vm.el = [];
vm.el.push(new ElementInput('weight element 1', 'kg', 'lb', ko.observable(1), weightConv));
vm.el.push(new ElementInput('length element', 'mm', 'in', ko.observable(1), lengthConv));
vm.el.push(new ElementInput('weight element 2', 'kg', 'lb', ko.observable(2), force));

vm.comp = [];

vm.comp.push(new ElementInput('moment', 'mm-kg', 'in-lbs', ko.pureComputed({
    read: function () {
        var one = this.el[0].pureValue();
        var two = this.el[1].pureValue();
        var calc = one * two;
        return convert.computedResult(calc, specConv);
    },
    write: function (value) {
        
    }
}, vm), specConv));

console.log(vm.comp[0].pureValue());


//vm.comp = ko.pureComputed(function () {
//    var one = this.el[0].pureValue();
//    var two = this.el[1].pureValue();
//    return one * two;
//}, vm);


//var val = ko.observable(10);
//var id = convert.registerChild(val, conv);
//console.log(convert.getChild(id));
//convert.switchSystem();
//console.log(convert.getChild(id));


ko.applyBindings(vm);

