
export default function Queue() {

    this.length = 0
    this.tailIndex = null;
    this.list = null;

    this.insertList = function (list) {

        this.list = [...list];
        this.length = list.length;
        this.tailIndex = list.length - 1;
    }

    this.isEmpty = function () {

        return this.length == 0;
    }

    this.getHead = function () {

        if (this.isEmpty()) return undefined;

        return this.list[0];

        
    }


    this.getTail = function() {

        if (this.isEmpty()) return undefined;

        return this.list[this.tailIndex];

        
    }

    this.dequeue = function() {

        if ((this.isEmpty())) return undefined;

        let dequeuedElement = this.getHead();

        this.list = this.list.slice(1);
        this.length--;
        this.tailIndex--;

        return dequeuedElement;
        
    }

        
    

    this.enqueue = function(element) {

        this.list.push(element);
        this.length++;
        this.tailIndex++;
    }


    this.getLength = function() {
        return this.length;
    }

    this.printQueue = function() {

        console.log(this.list);
    }

}




