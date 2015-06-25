module Structure {
    export class Application {
        title: string;
        sections: KnockoutObservableArray<Section>;

        constructor(title: string) {
            this.title = title;
            this.sections = ko.observableArray<Section>();
        }

        addSection(section: Section): void {
            this.sections()[section.name] = section;
        }

    }

    export class Section {
        elements: KnockoutObservableArray<Element>;
        name: string;

        constructor(name: string) {
            this.name = name;
            this.elements = ko.observableArray<Element>();
        }

        addElement(element: Element): Section {
            this.elements.push(element);
            return this;
        }

    }

    export class Element {
        label: KnockoutObservable<string>;
        value: KnockoutObservable<number>;
        id: number;
        private static nextID = 0;

        constructor(label: string, defaultValue: number) {
            this.label = ko.observable<string>(label);
            this.value = ko.observable<number>(defaultValue);
            this.id = ++Element.nextID;
        }

    }

}


window.onload = () => {
    var app = new Structure.Application('one');
    app.addSection(new Structure.Section('section one').addElement(new Structure.Element('element one', 1)));
    app.sections()['section one'].addElement(new Structure.Element('element one', 1));

    
    ko.applyBindings(app);
};

