var Structure;
(function (Structure) {
    var Application = (function () {
        function Application(title) {
            this.title = title;
            this.sections = ko.observableArray();
        }
        Application.prototype.addSection = function (section) {
            this.sections()[section.name] = section;
        };
        return Application;
    })();
    Structure.Application = Application;
    var Section = (function () {
        function Section(name) {
            this.name = name;
            this.elements = ko.observableArray();
        }
        Section.prototype.addElement = function (element) {
            this.elements.push(element);
            return this;
        };
        return Section;
    })();
    Structure.Section = Section;
    var Element = (function () {
        function Element(label, defaultValue) {
            this.label = ko.observable(label);
            this.value = ko.observable(defaultValue);
            this.id = ++Element.nextID;
        }
        Element.nextID = 0;
        return Element;
    })();
    Structure.Element = Element;
})(Structure || (Structure = {}));
window.onload = function () {
    var app = new Structure.Application('one');
    app.addSection(new Structure.Section('section one').addElement(new Structure.Element('element one', 1)));
    app.sections()['section one'].addElement(new Structure.Element('element one', 1));
    ko.applyBindings(app);
};
//# sourceMappingURL=Structure.js.map