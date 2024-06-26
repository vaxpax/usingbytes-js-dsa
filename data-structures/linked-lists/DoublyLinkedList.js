"use strict";

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.previous = null;
    }
}

/**
 * @summary Class representing DoublyLinkedList
 * @classdesc
 * @memberof linked-lists
 * */
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    /**
     * @summary
     * Appends data to the end of this list.
     * @param {*} data - The data to store in new Node.
     * @method
     * @instance
     */
    append(data) {
        const node = new Node(data);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.previous = this.tail
            this.tail.next = node;
            this.tail = node;
        }
    }

    /**
     * @summary
     * Appends element of an array to the end of this list.
     * @param {array} dataArray - The array of data to be appended to the list.
     * @method
     * @instance
     */
    appendAll(dataArray) {
        for (let data of dataArray) {
            this.append(data);
        }
    }

    /**
     * @summary
     * Inserts the specified element at the beginning of this list.
     * @param {*} data - The data to be added at head of the list.
     * @method
     * @instance
     */
    addFirst(data) {
        const node = new Node(data);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.head.previous = node;
            node.next = this.head;
            node.next = this.head;
            this.head = node;
        }
    }

    /**
     * @summary
     *  Remove all elements from the list.
     *  @method
     *  @instance
     */
    clear() {
        this.head = null;
        this.tail = null;
    }

    /**
     * @summary
     * To check if list contains some data
     * @param {*} data
     * @returns {boolean} true if this list contains the specified data.
     * @method
     * @instance
     */
    contains(data) {
        let index = this.indexOf(data);
        return index !== -1;
    }

    /**
     * @summary Inserting data to the list on given position. If position to be inserted is after list tail we will just
     * append this data to the list
     * @param {*} data to bi inserted
     * @param {number} position on which to insert
     * @method
     * @instance
     */
    insert(data, position) {
        let counter = position;
        if (counter <= 0) {
            this.addFirst(data);
            return;
        }
        let current = this.head;
        while(counter > 0) {
            current = current.next;
            counter--;
            if (current === this.tail && counter > 0) {
                this.append(data);
                return;
            }
        }
        let node = new Node(data);
        let temp = current.previous;
        node.previous = temp
        node.next = current;
        current.previous = node;
        temp.next = node;
    }

    /**
     * @summary
     * To find index of first occurrence of the data in the List.
     * @param {*} data - The data to be found in the list
     * @returns {number} the index of the first occurrence of the data in this list, or -1 if this list does not contain the element
     * @method
     * @instance
     */
    indexOf(data) {
        let index = -1;
        let counter = 0;
        let current = this.head;
        while (current) {
            if (current.data === data) {
                index = counter;
                break;
            }
            counter++;
            current = current.next;
        }
        return index;
    }

    /**
     * @summary
     * To check if list is empty.
     * @returns {boolean} true if list is empty
     * @method
     * @instance
     */
    isEmpty() {
        return this.head == null && this.tail == null;
    }

    /**
     * @summary
     * To find index of last occurrence of the data in the List.
     * @param {*} data - The data to be found in the list
     * @returns {number} the index of the last occurrence of the data in this list, or -1 if this list does not contain the element
     * @method
     * @instance
     */
    lastIndexOf(data) {
        let index = -1;
        let counter = 0;
        let current = this.head;
        while (current) {
            if (current.data === data) {
                index = counter;
            }
            counter++;
            current = current.next;
        }
        return index;
    }

    /**
     * @summary
     * To remove the head of this list.
     * @returns {*|null} Node data if list is not empty. Otherwise, returns null
     * @method
     * @instance
     */
    remove() {
        if (!this.head) {
            return null;
        }

        let node = this.head;
        if (this.head === this.tail) {
            this.clear();
        } else {
            this.head = this.head.next;
            this.head.previous = null;
        }
        return node.data;
    }

    /**
     * @summary
     * To remove the tail of this list
     * @returns {*|null} tail data if list is not empty. Otherwise, returns null
     * @method
     * @instance
     */
    removeLast() {
        if (!this.head) {
            return null;
        }

        const node = this.tail;
        if (this.head === this.tail) {
            this.clear();
        } else {
            this.tail = this.tail.previous;
            this.tail.next = null
        }
        return node.data;
    }

    /**
     * @summary
     * To remove first occurrence of the specified data from list
     * @param data - The data to be removed
     * @returns {boolean} true if data is present. Otherwise, it returns false
     * @method
     * @instance
     */
    removeData(data) {
        if (!this.head) {
            return false;
        }

        let fromHead = this.head;
        let fromTail = this.tail;
        let found = false;
        let current = null;
        while (fromHead && fromTail) {
            current = fromHead;
            if (current.data === data) {
                found = true;
                break;
            }

            current = fromTail;
            if (current.data === data) {
                found = true;
                break;
            }
            fromHead = fromHead.next;
            fromTail = fromTail.previous
        }
        if (!found) {
            return false;
        }

        if (current === this.head) {
            this.head = this.head.next;
            this.head.previous = null;
        } else if (current === this.tail) {
            this.tail = this.tail.previous;
            this.tail.next = null;
        } else {
            current.previous.next = current.next;
            current.next.previous = current.previous;
        }
        return true;
    }

    /**
     * @summary
     * Replace data at specified position in the list
     * @param {number}index - The position in the list where to replace data. Must be positive integer
     * @param {*}data - The data to replace
     * @returns {*|null} if found data of the node, otherwise null
     * @method
     * @instance
     */
    set(index, data) {
        if (!this.head) {
            let node = new Node(data);
            this.head = node;
            return null;
        } else {
            let current = this.head;
            let counter = 0;
            while (current.next && counter < index) {
                current = current.next;
                counter++;
            }
            if (counter !== index) {
                return null;
            } else {
                let foundData = current.data;
                current.data = data;
                return foundData;
            }
        }
    }

    [Symbol.iterator](){
        let current = this.head;
        return {
            next(){
                if (!current) {
                    return {
                        done: true,
                        value: undefined
                    }
                }
                const returnValue = {
                    done: false,
                    value: current.data
                };
                current = current.next;
                return returnValue
            }
        }
    }

    /**
     * @summary
     * Dump list to the array
     * @returns {array} array of list elements
     * @method
     * @instance
     */
    toArray() {
        let current = this.head;
        const result = [];
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }

    /**
     * @summary
     * Dump list to the array in reverse order
     * @returns {array} array of list elements in reverse order
     * @method
     * @instance
     */
    toArrayFromTail() {
        let current = this.tail;
        const result = [];
        while (current) {
            result.push(current.data);
            current = current.previous;
        }
        return result;
    }
}

export {
    DoublyLinkedList,
    Node,
};