window.onload = function () {
    var app = new Structure.Application('Consumer');
    var sect1 = new Structure.Section('System');
    var sect2 = new Structure.Section('SystemSwap');
    SystemSection(sect2);
    sect2.elements()[0].value(500);
    SystemSection(sect1);
    app.addSection(sect1);
    app.addSection(sect2);
    ko.applyBindings(app, document.getElementsByTagName('body')[0]);
};
function swap() {
    var app2 = new Structure.Application('Swap');
    var sect2 = new Structure.Section('SystemSwap');
    SystemSection(sect2);
    sect2.elements()[0].value(500);
    app2.addSection(sect2);
}
function SystemSection(section) {
    var res = new Structure.Element('Rated Engine Speed', 1000, 12, 'input');
    var ip = new Structure.Element('Input Power', 120, 12, 'input');
    var cp = new Structure.Element('Charge Pressure', 20, 12, 'input');
    section.addElement(res);
    section.addElement(ip);
    section.addElement(cp);
}
//# sourceMappingURL=Index_App.js.map