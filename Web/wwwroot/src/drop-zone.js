class DropZone {

    _dragged;

    //to be called in componentDidMount
    makeDroppable = () => {
        this.handleDrag();
        this.handleDragStart();
        this.handleDragEnd();
        this.handleDragOver();
        this.handleDragEnter();
        this.handleDragLeave();
        this.handleDragDrop();
    }

    //to be called in componentDidMount
    makeDraggable = (node) => {
        node.id = Math.round(Math.random() * 10000000);
        node.draggable = true;
        node.ondragstart = "event.dataTransfer.setData('text/plain',null)";
        node.addEventListener("mousedown", () => {
            node.style.cursor = "-webkit-grabing";
        });
    }

    handleDrag = () => {
        document.addEventListener("drag", () => { }, false);
    }

    handleDragStart = () => {
        document.addEventListener("dragstart", (e) => {
            this._dragged = e.target;
            this._dragged.classList.add("dragging");
        }, false);
    }

    handleDragEnd = () => {
        document.addEventListener("dragend", (e) => {
            e.target.classList.remove("dragging")
        }, false);
    }

    handleDragOver = () => {
        document.addEventListener("dragover",
            (e) => { e.preventDefault(); }, false);
    }

    handleDragEnter = () => {
        document.addEventListener("dragenter",
            (e) => {
                if (e.target.classList.contains("dropzone"))
                    e.target.classList.add("enter");
            }, false);
    }

    handleDragLeave = () => {
        document.addEventListener("dragleave",
            (e) => {
                if (e.target.classList.contains("dropzone")) {
                    e.target.classList.remove("enter");
                }
            }, false);
    }

    handleDragDrop = () => {
        document.addEventListener("drop", (e) => {
            e.preventDefault();
            if (e.target.classList.contains("dropzone")) {
                e.target.classList.remove("enter");
                document.getElementById(this._dragged.id)
                    .parentNode
                    .removeChild(this._dragged);
                e.target.appendChild(this._dragged);
            }
        }, false);
    }


}

export default new DropZone();