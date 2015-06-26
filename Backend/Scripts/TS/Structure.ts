module Structure {
    export class Application {
        title: string;
        sections: KnockoutObservableArray<Section>;

        constructor(title: string) {
            this.title = title;
            this.sections = ko.observableArray<Section>();
        }

        addSection(section: Section): void {
            this.sections.push(section);
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
        layout: Layout;
        id: number;
        private static nextID = 0;

        constructor(label: string, defaultValue: number, width: number, type: string) {
            this.label = ko.observable<string>(label);
            this.value = ko.observable<number>(defaultValue);
            this.id = ++Element.nextID;
            this.layout = new Structure.Layout(width, type);
        }

    }

    export class Layout {
        column: number;
        type: string;

        constructor(width: number, type: string) {
            this.column = width;
            this.type = type;
        }

        getClass() : string {
            return 'col-sm-' + this.column;

        }

    }

}


window.onload = () => {
    var app = new Structure.Application('one');
    var sectionOne = new Structure.Section('section one');
    sectionOne.addElement(new Structure.Element('element one', 1, 12, 'std'));
    sectionOne.addElement(new Structure.Element('element two', 2, 6, 'std'));
    app.addSection(sectionOne);
    

    
    ko.applyBindings(app);
};

