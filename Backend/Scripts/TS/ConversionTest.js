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


var weightConv = [new Conversion('poundsToKilograms', 'kilogramsToPounds')];
var lengthConv = [new Conversion('millimetersToInches', 'inchesToMillimeters')];


vm.el = [];
vm.el.push(new Element('weight element 1', 'kg', 'lb', 1, weightConv));
vm.el.push(new Element('length element', 'mm', 'in', 1, lengthConv));
vm.el.push(new Element('weight element 2', 'kg', 'lb', 2, weightConv));

//var val = ko.observable(10);
//var id = convert.registerChild(val, conv);
//console.log(convert.getChild(id));
//convert.switchSystem();
//console.log(convert.getChild(id));


ko.applyBindings(vm);

