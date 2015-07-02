"use strict";
function ViewModel() {
    this.title = 'conversion testing';
    this.rounding = convert.helpers.getRoundingComputed(this);
    return this;
}

function Element(label, unitM, unitI, defaultValue, conversions)
{
    this.label = label;
    this.unitM = unitM;
    this.unitI = unitI;
    this.unit = ko.computed(function () {
        return convert.system() === 'metric' ? this.unitM : this.unitI;
    }, this);
    this.id = convert.registry.registerChild(ko.observable(defaultValue), conversions);
    this.value = convert.helpers.getValueComputed(this);
}


var vm = new ViewModel();


var conv = [new Conversion('poundsToKilograms', 'kilogramsToPounds')];
var conv2 = [new Conversion('millimetersToInches', 'inchesToMillimeters')];



vm.el = new Element('test', 'kg', 'lb', 1, conv);
vm.el2 = new Element('test', 'mm', 'in', 1, conv2);


vm.el2.value(23);

//var val = ko.observable(10);
//var id = convert.registerChild(val, conv);
//console.log(convert.getChild(id));
//convert.switchSystem();
//console.log(convert.getChild(id));


ko.applyBindings(vm);

