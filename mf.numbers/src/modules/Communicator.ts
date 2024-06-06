// draft
import { Subject } from 'rxjs';

class Communicator {
    instance

    constructor(globalContext = window) {
        if(!globalContext['communicators']) {
            globalContext['communicators'] = {}
        }

        this.instance = globalContext['communicators']
    }

    getSubject(subjectName) {
        if(!this.instance[subjectName]) {
            this.instance[subjectName] = new Subject()
        }

        return this.instance[subjectName]
    }
}

export default new Communicator()
