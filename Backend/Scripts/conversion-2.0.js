"use strict";
function createConverter()
{
    var converter = function () {
        this.self = this;

        this.functions = new function (parent) {
            this.parent = parent;
            // LEVEL 1 CONVERSIONS
            // Distance
            this.inchesToMillimeters = function (incoming) {
                return incoming * 25.4;
            };
            this.millimetersToInches = function (incoming) {
                return incoming / 25.4;
            };
            this.inchesToCentimeters = function (incoming) {
                return incoming * 2.54;
            };
            this.centimetersToInches = function (incoming) {
                return incoming / 2.54;
            };
            this.inchesToMeters = function (incoming) {
                return incoming * 0.0254;
            };
            this.metersToInches = function (incoming) {
                return incoming / 0.0254;
            };
            this.feetToMeters = function (incoming) {
                // 0.0254 (in -> m) * 12 (ft -> in)
                return incoming * 0.3048;
            };
            this.metersToFeet = function (incoming) {
                return incoming / 0.3048;
            };
            this.milesToKilometers = function (incoming) {
                // 0.3048 (ft -> m) * 5280 (mi -> ft) / 1000 (km -> m)
                return incoming * 1.609344;
            };
            this.kilometersToMiles = function (incoming) {
                return incoming / 1.609344;
            };
            // Weight/Mass (on Earth)
            this.poundsToKilograms = function (incoming) {
                // by definition
                return incoming * 0.45359237;
            };
            this.kilogramsToPounds = function (incoming) {
                return incoming / 0.45359237;
            };

            // Force (on Earth)
            this.poundForceToNewtons = function (incoming) {
                // 32.174049 (Standard Gravity [ft/s^2]) * 0.3048 (ft -> m) * 0.45359237 (lb -> kg)
                return incoming * 4.448221676586188424;
            };
            this.newtonsToPoundForce = function (incoming) {
                return incoming / 4.448221676586188424;
            };

            // Volume
            this.cubicFeetToCubicMeters = function (incoming) {
                // 0.3048^3 (ft^3 -> m^3)
                return incoming * 0.028316846592;
            };
            this.cubicMetersToCubicFeet = function (incoming) {
                return incoming / 0.028316846592;
            };
            this.cubicInchesToCubicCentimeters = function (incoming) {
                // 2.54^3 (in^3 -> cc)
                return incoming * 16.387064;
            };
            this.cubicCentimetersToCubicInches = function (incoming) {
                return incoming / 16.387064;
            };

            this.gallonsToLiters = function (incoming) {
                // 231 (gal -> in^3) * 16.387064 (2.54^3[in^3 -> cc]) / 1000 (L -> cc)
                return incoming * 3.785411784;
            };

            this.litersToGallons = function (incoming) {
                return incoming / 3.785411784;
            };

            // Power
            this.horsepowerToKilowatts = function (incoming) {
                // 550 (hp -> lb*ft/s) * 4.448221676586188424 (N -> lbf) * 0.3048 (ft -> m)
                return incoming * 0.74569988186290862739936;
            };
            this.kilowattsToHorsepower = function (incoming) {
                return incoming / 0.74569988186290862739936;
            };

            // Area
            this.inchesSqToMillimetersSq = function (incoming) {
                // 25.4^2 (in^2 -> mm^2)
                return incoming * 645.16;
            };
            this.millimetersSqToInchesSq = function (incoming) {
                return incoming / 645.16;
            };

            // Pressure
            this.psiToBar = function (incoming) {
                // 100000 (bar -> Pascal) / {4.448221676586188424 (lbf -> N) / 0.00064516 (0.0254^2 [in^2 -> m^2])}
                return incoming / 14.503773573063730519700143414142;
            };
            this.barToPsi = function (incoming) {
                return incoming * 14.503773573063730519700143414142;
            };
            this.psiToAtm = function (incoming) {
                // 14.503773573063730519700143414142 (bar -> psi) * 1.01325 (atm -> bar)
                return incoming / 14.695948572906824949086170314379;
            };
            this.atmToPsi = function (incoming) {
                return incoming * 14.695948572906824949086170314379;
            };
            this.atmToBar = function (incoming) {
                // accepted value
                return incoming * 1.01325;
            };
            this.barToAtm = function (incoming) {
                return incoming / 1.01325;
            };
            this.atmToMillimetersHg = function (incoming) {
                // value given by computer calculator converter
                return incoming * 760.1275318829707;
            };
            this.millimetersHgToAtm = function (incoming) {
                return incoming / 760.1275318829707;
            };
            this.barToMillimetersHg = function (incoming) {
                // 760.1275318829707 (atm -> mm Hg) / 1.01325 (atm -> bar)
                return incoming * 750.1875468867216382926227485813;
            };
            this.millimetersHgToBar = function (incoming) {
                return incoming / 750.1875468867216382926227485813;
            };
            this.atmToInchesHg = function (incoming) {
                // 760.1275318829707 (atm -> mm Hg) / 25.4 (in -> mm)
                return incoming * 29.926280782794122047244094488189;
            };
            this.inchesHgToAtm = function (incoming) {
                return incoming / 29.926280782794122047244094488189;
            };
            this.barToInchesHg = function (incoming) {
                // 29.926280782794122047244094488189 (atm -> in Hg) / 1.01325 (atm -> bar)
                return incoming * 29.534942790815812531205620022886;
            };
            this.inchesHgToBar = function (incoming) {
                return incoming / 29.534942790815812531205620022886;
            };

            // Other
            this.toString = function () {
                return 'hello!';
            };

            // SYSTEM INDEPENDENT CONVERTERS
            // incomingSystem = new system

            // Weight/Mass (on Earth)
            this.massOnEarth = function (incomingSystem, incomingValue) {
                return incomingSystem.toLowerCase() == 'metric' ? this.poundsToKilograms(incomingValue) : this.kilogramsToPounds(incomingValue);
            };

            // Force (on Earth)
            this.forceOnEarth = function (incomingSystem, incomingValue) {
                return incomingSystem.toLowerCase() == 'metric' ? this.poundForceToNewtons(incomingValue) : this.newtonsToPoundForce(incomingValue);
            };

            // Volume
            this.volumeLandGal = function (incomingSystem, incomingValue) {
                return incomingSystem.toLowerCase() == 'metric' ? this.gallonsToLiters(incomingValue) : this.litersToGallons(incomingValue);
            };
            this.volumeCubicMAndFt = function (incomingSystem, incomingValue) {
                return incomingSystem.toLowerCase() == 'metric' ? this.cubicFeetToCubicMeters(incomingValue) : this.cubicMetersToCubicFeet(incomingValue);
            };
            this.volumeCubicCmAndIn = function (incomingSystem, incomingValue) {
                return incomingSystem.toLowerCase() == 'metric' ? this.cubicInchesToCubicCentimeters(incomingValue) : this.cubicCentimetersToCubicInches(incomingValue);
            };

            // Power
            this.powerKwAndHp = function (incomingSystem, incomingValue) {
                return incomingSystem.toLowerCase() == 'metric' ? this.horsepowerToKilowatts(incomingValue) : this.kilowattsToHorsepower(incomingValue);
            };

            // Distance
            this.distanceMmAndIn = function (incomingSystem, incomingValue) {
                return incomingSystem.toLowerCase() == 'metric' ? this.inchesToMillimeters(incomingValue) : this.millimetersToInches(incomingValue);
            };
            this.distanceCmAndIn = function (incomingSystem, incomingValue) {
                return incomingSystem.toLowerCase() == 'metric' ? this.inchesToCentimeters(incomingValue) : this.centimetersToInches(incomingValue);
            };
            this.distanceMAndIn = function (incomingSystem, incomingValue) {
                return incomingSystem.toLowerCase() == 'metric' ? this.inchesToMeters(incomingValue) : this.metersToInches(incomingValue);
            };
            this.distanceMAndFt = function (incomingSystem, incomingValue) {
                return incomingSystem.toLowerCase() == 'metric' ? this.feetToMeters(incomingValue) : this.metersToFeet(incomingValue);
            };
            this.distanceKmAndMi = function (incomingSystem, incomingValue) {
                return incomingSystem.toLowerCase() == 'metric' ? this.milesToKilometers(incomingValue) : this.kilometersToMiles(incomingValue);
            };

            // Area
            this.areaMmAndIn = function (incomingSystem, incomingValue) {
                return incomingSystem.toLowerCase() == 'metric' ? this.inchesSqToMillimetersSq(incomingValue) : this.millimetersSqToInchesSq(incomingValue);
            };

            // Pressure
            this.pressureBarAndPsi = function (incomingSystem, incomingValue) {
                return incomingSystem.toLowerCase() == 'metric' ? this.psiToBar(incomingValue) : this.barToPsi(incomingValue);
            };

            // SUPER ADVANCED CONVERTERS
            // incoming system = new system
            this.torqueNMAndInLbf = function (incomingSystem, incomingValue) {
                return this.forceOnEarth(incomingSystem, this.distanceMAndIn(incomingSystem, incomingValue));
            };
            return this;
        }(this);

        this.helpers = new function (parent) {
            this.parent = parent;
            this.getRoundingComputed = function (vm) {
                return ko.pureComputed({
                    read: function () {
                        return parent.rounding;
                    },
                    write: function (val) {
                        parent.updateRounding(val);
                    }
                }, vm);
            };

            this.getValueComputed = function (el, id) {
                if (id == undefined) id = 'id';
                return ko.pureComputed({
                    read: function () {
                        return parent.registry.getChild(this[id], convert);
                    },
                    write: function (value) {
                        parent.registry.updateChild(this[id], value);
                    }
                }, el);
            }

            this.getPureValueComputed = function (el, id) {
                if (id == undefined) id = 'id';
                return ko.pureComputed(function () {
                    return parent.registry.getChildPure(this[id], parent)
                }, el);
            }

            return this;
        }(this);

        this.registry = new function (parent) {
            this.parent = parent;
            this.children = [];
            this.registerChild = function (value, conversions) {
                return this.children.push({ 'value': value, 'conversions': conversions }) - 1;
            };
            this.getChild = function (id) {
                return parent.round(this.children[id].value());
            };

            this.updateChild = function (id, value) {
                this.children[id].value(value);
            };

            this.getChildPure = function (id) {

                if (parent.system() === 'imperial') {
                    var mVal = this.children[id].value();
                    for (var convIndex in this.children[id].conversions) {
                        var conv = this.children[id].conversions[convIndex];
                        mVal = parent.functions[conv.toMet](mVal);
                    }
                    return mVal;
                } else {
                    return this.children[id].value();
                }

                return parent.system() === 'metric' ? this.children[id].value() : parent.functions[this.children[id].conversions.toMet](this.children[id].value());
            }

            this.convertChildren = function () {
                for (var childIndex in this.children) {
                    var child = this.children[childIndex];
                    for (var numIndex in child.conversions) {
                        var conv = child.conversions[numIndex];
                        if (parent.system() === 'metric') {
                            child.value(parent.functions[conv.toMet](child.value()));
                        } else {
                            child.value(parent.functions[conv.toImp](child.value()));
                        }
                    }
                }
            };

            this.convertChild = function (val, conversions) {
                for (var numIndex in conversions) {
                    var conv = conversions[numIndex];
                    if (parent.system() === 'metric') {
                        //val = parent.functions[conv.toMet](val);
                    } else {
                        val = parent.functions[conv.toImp](val);
                    }
                }
                return val;
            }

            this.notifyChildren = function () {
                for (var childIndex in this.children) {
                    var child = this.children[childIndex];
                    child.value.notifySubscribers(child.value());
                }
            };

        }(this);

        this.rounding = ko.observable(3);
        this.system = ko.observable('metric');

        this.updateRounding = function (figures) {
            this.rounding(figures);
            this.registry.notifyChildren();
        }

        this.switchSystem = function () {
            this.system(this.system() === 'metric' ? 'imperial' : 'metric');
            this.registry.convertChildren(this);
        };

        this.getSystem = function () {
            return this.system() === 'metric' ? 'Metric' : 'Imperial';
        }

        this.round = function (value) {
            return Math.round(value * Math.pow(10, this.rounding())) / Math.pow(10, this.rounding());
        }

        this.computedResult = function (val, conversions) {
            if (this.system() === 'imperial') {
                for (var numIndex in conversions) {
                    var conv = conversions[numIndex];
                    val = this.functions[conv.toImp](val);
                }
            }
            return this.round(val);
        }

        return this;
    };
        
	return new converter();
}

function Conversion(toMet, toImp) {
    this.toMet = toMet;
    this.toImp = toImp;
    return this;
}

var convert = createConverter();