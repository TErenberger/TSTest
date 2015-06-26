var Structure;
(function (Structure) {
    var Application = (function () {
        function Application(title) {
            this.title = title;
            this.sections = ko.observableArray();
        }
        Application.prototype.addSection = function (section) {
            this.sections.push(section);
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
        function Element(label, defaultValue, width, type) {
            this.label = ko.observable(label);
            this.value = ko.observable(defaultValue);
            this.id = ++Element.nextID;
            this.layout = new Structure.Layout(width, type);
        }
        Element.nextID = 0;
        return Element;
    })();
    Structure.Element = Element;
    var Layout = (function () {
        function Layout(width, type) {
            this.column = width;
            this.type = type;
        }
        Layout.prototype.getClass = function () {
            return 'col-sm-' + this.column;
        };
        return Layout;
    })();
    Structure.Layout = Layout;
})(Structure || (Structure = {}));
window.onload = function () {
    var app = new Structure.Application('one');
    var sectionOne = new Structure.Section('section one');
    sectionOne.addElement(new Structure.Element('element one', 1, 12, 'std'));
    sectionOne.addElement(new Structure.Element('element two', 2, 6, 'std'));
    app.addSection(sectionOne);
    ko.applyBindings(app);
};
//# sourceMappingURL=Structure.js.map