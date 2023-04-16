class AnimatedList {
    private namespace: string;
    private points: Array<string>;


    constructor(namespace: string, points: Array<string>) {
        this.namespace = namespace;
        this.points = points;
    }

    private 

    private getList() {
        const listElement = document.createElement('ul');
        listElement.id = `${this.namespace}-list`;
        listElement.className = 'list';

        return listElement;
    }

    public build(parentElement: HTMLElement) {
        parentElement.appendChild(this.getList());
    }
}


window.onload = () => {
    const points = ['one', 'two', 'three'];
    const containerElement = document.getElementById('container')!;

    const animatedList = new AnimatedList('example', points);
    animatedList.build(containerElement);
}