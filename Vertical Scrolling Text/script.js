var AnimatedList = /** @class */ (function () {
    function AnimatedList(namespace, points) {
        this.namespace = namespace;
        this.points = points;
    }
    AnimatedList.prototype.getList = function () {
        var listElement = document.createElement('ul');
        listElement.id = "".concat(this.namespace, "-list");
        listElement.className = 'list';
        return listElement;
    };
    AnimatedList.prototype.build = function (parentElement) {
        parentElement.appendChild(this.getList());
    };
    return AnimatedList;
}());
window.onload = function () {
    var points = ['one', 'two', 'three'];
    var containerElement = document.getElementById('container');
    var animatedList = new AnimatedList('example', points);
    animatedList.build(containerElement);
};
