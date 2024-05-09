"use strict";

import { Node } from "./SinglyLinkedList.js";

class CircularSinglyLinkedList {
    constructor() {
        this.head = null;
        this.last = null;
    }

    isEmpty() {
        return this.head == null && this.last == null;
    }

    isCircular() {
        return this.head === null || this.last.next === this.head;
    }

    clear() {
        this.head = null;
        this.last = null;
    }

    append(data) {
        let node = new Node(data);
        if (this.head == null) {
            this.head = node;
            this.last = node;
            this.head.next = this.last;
        } else {
            this.last.next = node;
            this.last = node;
            this.last.next = this.head;
        }
    }

    appendAll(dataArray) {
        for (let data of dataArray) {
            this.append(data);
        }
    }

    removeAt(index) {
        if (this.head == null) {
            return null;
        }
        if (this.head === this.head.next && index === 0) {
            const data = this.head.data;
            this.clear();
            return data;
        }
        let counter = 0;
        let previous = null
        let current = this.head;
        while (counter < index) {
            previous = current;
            current = current.next;
            counter++;
        }

        if (current === this.head) {
            this.head = this.head.next;
            this.last.next = this.head;
        } else if (current === this.last) {
            this.last = previous;
            this.last.next = this.head;
        } else {
            previous.next = current.next;
        }
        return current.data;
    }

    removeData(data) {
        if (this.head == null) {
            return false;
        }

        if (this.head === this.head.next) {
            if (data === this.head.data) {
                this.clear();
                return true;
            }
            return false;
        }

        let previous = null;
        let current = this.head;
        while (current && current.next !== this.head) {
            if (current.data === data) {
                break;
            }
            previous = current;
            current = current.next;

        }

        if (current === this.head) {
            this.head = this.head.next;
            this.last.next = this.head;
        } else if (current === this.last) {
            this.last = previous;
            this.last.next = this.head;
        } else {
            previous.next = current.next;
        }

        return true;
    }

    // Removes nodes from the list starting with fromIndex (inclusive) and then for length
    // length and can't be negative or zero
    // fromIndex must pe positive
    removeRange(fromIndex, length) {
        if (fromIndex < 0 || length <= 0) {
            return false;
        }
        let previous = null;
        let fromNode = this.head, toNode;
        let counter = 0;
        let correctHead = false, correctLast = false;
        while (counter < fromIndex) {
            previous = fromNode;
            fromNode = fromNode.next;
            counter++;
        }
        toNode = fromNode;
        counter = 0;
        while (counter < length) {
            if (toNode.next === fromNode) {
                // full cycle
                this.clear();
                return true;
            }
            if (toNode === this.head) {
                correctHead = true;
            }
            if (toNode === this.last) {
                correctLast = true;
            }
            toNode = toNode.next;
            counter++;
        }

        if (previous) {
            previous.next = toNode;
        }
        if (correctHead) {
            this.head = toNode;
            this.last.next = this.head;
        }
        if (correctLast) {
            this.last = previous;
        }
        return true;
    }

    contains(data) {
        return this.indexOf(data) !== -1;
    }

    // returns index of data starting from list head
    indexOf(data) {
        if (this.head == null) {
            return -1;
        }
        let current = this.head;
        let index = -1;
        let counter = 0;
        while (current) {
            if (current.data === data) {
                index = counter;
                break;
            }
            if (current.next === this.head) {
                break;
            } else {
                current = current.next;
                counter++;
            }
        }
        return index;
    }

    lastIndexOf(data) {
        if (this.head == null) {
            return -1;
        }

        let current = this.head;
        let index = -1;
        let counter = 0;
        while (current) {
            if (current.data === data) {
                index = counter;
            }
            if (current.next === this.head) {
                break;
            } else {
                current = current.next;
                counter++;
            }
        }
        return index;
    }

    set(index, data) {
        if (this.head == null) {
            return null;
        }
        let counter = 0;
        let current = this.head;
        while (counter < index) {
            current = current.next;
            counter++;
        }
        const value = current.data;
        current.data = data;
        return value;
    }

    toArray() {
        let current = this.head;
        const result = [];
        while (current && current.next !== this.head) {
            result.push(current.data);
            current = current.next;
        }
        if (current) {
            result.push(current.data);
        }
        return result;
    }
}

export {
    CircularSinglyLinkedList,
};